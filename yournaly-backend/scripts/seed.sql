-- =============================================================================
-- Yournaly seed script (PostgreSQL 18+)
-- =============================================================================
-- Prerequisites:
--   1. Apply the Prisma schema first (`prisma db push` or migrate).
--   2. Run this script against the target database.
--
-- Idempotent: safe to re-run. Organization API key is only generated on first insert.
--
-- Assumptions (adjust if needed):
--   - organization_code = 'YOURNALY' (required by backend default)
--   - business_plan      = 'B2C'
--   - llm_model         = 'openai/gpt-4.1-mini' (OpenRouter slug)
--   - max_characters    = 2500
--   - Mid ink package (700) is marked recommended
--   - v_journal_summary is a VIEW (Prisma may have created a TABLE via db push;
--     this script replaces that with the correct view)
-- =============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- Journal summary view
-- Replaces any table Prisma may have created for model ViewJournalSummary.
-- One row per (journal, organization membership) for completed reviews only.
-- ---------------------------------------------------------------------------
DROP VIEW IF EXISTS v_journal_summary CASCADE;
DROP TABLE IF EXISTS v_journal_summary CASCADE;

CREATE VIEW v_journal_summary AS
SELECT
  j.id AS journal_id,
  ou.organization_id AS organization_id,
  j.user_id AS user_id,
  j.title AS title,
  j.original_text AS text,
  jr.score AS score,
  jp.tone AS tone,
  j.estimated_inks AS used_inks,
  j.created_at AS created_at
FROM journals j
INNER JOIN organization_users ou
  ON ou.user_id = j.user_id
 AND ou.is_active = TRUE
 AND ou.deleted_at IS NULL
INNER JOIN LATERAL (
  SELECT jp_inner.tone
  FROM journal_params jp_inner
  WHERE jp_inner.journal_id = j.id
    AND jp_inner.deleted_at IS NULL
  ORDER BY jp_inner.created_at DESC
  LIMIT 1
) jp ON TRUE
INNER JOIN LATERAL (
  SELECT jr_inner.score
  FROM journal_reviews jr_inner
  WHERE jr_inner.journal_id = j.id
    AND jr_inner.deleted_at IS NULL
  ORDER BY jr_inner.created_at DESC
  LIMIT 1
) jr ON TRUE
WHERE j.deleted_at IS NULL;

COMMENT ON VIEW v_journal_summary IS
  'Read model for journal history cards (title, preview text, score, tone, inks).';

-- ---------------------------------------------------------------------------
-- Default organization: Yournaly
-- Fixed UUID so related rows stay stable across re-seeds.
-- ---------------------------------------------------------------------------
INSERT INTO organization (
  id,
  name,
  contact_email,
  organization_code,
  api_key,
  logo_url,
  is_active,
  created_at,
  updated_at,
  deleted_at
) VALUES (
  'a0000000-0000-4000-8000-000000000001',
  'Yournaly',
  'pablo@goastrobit.com',
  'YOURNALY',
  replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', ''),
  NULL,
  TRUE,
  NOW(),
  NOW(),
  NULL
)
ON CONFLICT (organization_code) DO UPDATE SET
  name = EXCLUDED.name,
  contact_email = EXCLUDED.contact_email,
  is_active = TRUE,
  updated_at = NOW(),
  deleted_at = NULL;
-- Note: api_key is intentionally NOT rotated on conflict.

-- ---------------------------------------------------------------------------
-- Organization settings
-- ---------------------------------------------------------------------------
INSERT INTO organization_settings (
  id,
  organization_id,
  business_plan,
  subscription_plan,
  max_characters,
  llm_model,
  created_at,
  updated_at,
  deleted_at
) VALUES (
  'a0000000-0000-4000-8000-000000000002',
  'a0000000-0000-4000-8000-000000000001',
  'B2C',
  NULL,
  2500,
  'openai/gpt-4.1-mini',
  NOW(),
  NOW(),
  NULL
)
ON CONFLICT (organization_id) DO UPDATE SET
  business_plan = EXCLUDED.business_plan,
  subscription_plan = EXCLUDED.subscription_plan,
  max_characters = EXCLUDED.max_characters,
  llm_model = EXCLUDED.llm_model,
  updated_at = NOW(),
  deleted_at = NULL;

-- ---------------------------------------------------------------------------
-- Organization languages (UI / review languages)
-- Codes match JournalLanguage in the backend: en, es, fr, it, pt
-- ---------------------------------------------------------------------------
INSERT INTO organization_languages (
  id,
  organization_id,
  language_code,
  created_at,
  updated_at,
  deleted_at
) VALUES
  (gen_random_uuid(), 'a0000000-0000-4000-8000-000000000001', 'en', NOW(), NOW(), NULL),
  (gen_random_uuid(), 'a0000000-0000-4000-8000-000000000001', 'es', NOW(), NOW(), NULL),
  (gen_random_uuid(), 'a0000000-0000-4000-8000-000000000001', 'fr', NOW(), NOW(), NULL),
  (gen_random_uuid(), 'a0000000-0000-4000-8000-000000000001', 'it', NOW(), NOW(), NULL),
  (gen_random_uuid(), 'a0000000-0000-4000-8000-000000000001', 'pt', NOW(), NOW(), NULL)
ON CONFLICT (organization_id, language_code) DO UPDATE SET
  updated_at = NOW(),
  deleted_at = NULL;

-- ---------------------------------------------------------------------------
-- Organization tones
-- ---------------------------------------------------------------------------
INSERT INTO organization_tones (
  id,
  organization_id,
  tone_code,
  created_at,
  updated_at,
  deleted_at
) VALUES
  (gen_random_uuid(), 'a0000000-0000-4000-8000-000000000001', 'formal', NOW(), NOW(), NULL),
  (gen_random_uuid(), 'a0000000-0000-4000-8000-000000000001', 'playful', NOW(), NOW(), NULL),
  (gen_random_uuid(), 'a0000000-0000-4000-8000-000000000001', 'original', NOW(), NOW(), NULL),
  (gen_random_uuid(), 'a0000000-0000-4000-8000-000000000001', 'academic', NOW(), NOW(), NULL),
  (gen_random_uuid(), 'a0000000-0000-4000-8000-000000000001', 'professional', NOW(), NOW(), NULL)
ON CONFLICT (organization_id, tone_code) DO UPDATE SET
  updated_at = NOW(),
  deleted_at = NULL;

-- ---------------------------------------------------------------------------
-- Ink packages (Stripe product IDs)
-- Ordered by size; 700 Inks marked as recommended.
-- ---------------------------------------------------------------------------
INSERT INTO inks_packages (
  id,
  stripe_product_id,
  title,
  description,
  inks_to_add,
  price,
  currency,
  is_recommended,
  is_active,
  created_at,
  updated_at,
  deleted_at
) VALUES
  (
    'b0000000-0000-4000-8000-000000000001',
    'prod_SiSdyjj38K6x3x',
    'Starter',
    '300 Inks for occasional journal reviews. A light boost to get started.',
    300,
    4.99,
    'USD',
    FALSE,
    TRUE,
    NOW(),
    NOW(),
    NULL
  ),
  (
    'b0000000-0000-4000-8000-000000000002',
    'prod_SiSe4ZHm0idDha',
    'Regular',
    '700 Inks for consistent journaling. Best balance of value and volume.',
    700,
    9.99,
    'USD',
    TRUE,
    TRUE,
    NOW(),
    NOW(),
    NULL
  ),
  (
    'b0000000-0000-4000-8000-000000000003',
    'prod_SiSfisVvcEwwZD',
    'Power',
    '1500 Inks for power users who review frequently and want maximum value.',
    1500,
    14.99,
    'USD',
    FALSE,
    TRUE,
    NOW(),
    NOW(),
    NULL
  )
ON CONFLICT (stripe_product_id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  inks_to_add = EXCLUDED.inks_to_add,
  price = EXCLUDED.price,
  currency = EXCLUDED.currency,
  is_recommended = EXCLUDED.is_recommended,
  is_active = TRUE,
  updated_at = NOW(),
  deleted_at = NULL;

COMMIT;

-- =============================================================================
-- Optional verification
-- =============================================================================
-- SELECT organization_code, name, contact_email, left(api_key, 8) || '…' AS api_key_prefix
-- FROM organization WHERE organization_code = 'YOURNALY';
--
-- SELECT language_code FROM organization_languages
-- WHERE organization_id = 'a0000000-0000-4000-8000-000000000001' ORDER BY 1;
--
-- SELECT tone_code FROM organization_tones
-- WHERE organization_id = 'a0000000-0000-4000-8000-000000000001' ORDER BY 1;
--
-- SELECT title, inks_to_add, price, is_recommended, stripe_product_id
-- FROM inks_packages WHERE deleted_at IS NULL ORDER BY price;
--
-- SELECT viewname FROM pg_views WHERE viewname = 'v_journal_summary';
-- =============================================================================
