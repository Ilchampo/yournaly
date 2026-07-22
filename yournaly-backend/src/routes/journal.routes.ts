import {
  generateJournalReviewAiController,
  getJournalsSummaryController,
  getJournalByIdController,
  softDeleteJournalController,
  updateJournalTitleController,
} from '@/controllers/journal.controller';
import {
  generateJournalReviewAiSchema,
  getJournalsSummarySchema,
  getJournalByIdSchema,
  softDeleteJournalSchema,
  updateJournalTitleSchema,
} from '@/lib/schemas/journal.schemas';
import { authenticateJWT } from '@/middlewares/auth.middleware';
import { validateRequest } from '@/middlewares/validation.middleware';
import { Router, RequestHandler } from 'express';

const router = Router();

// @desc: Generate journal review AI
// @route: POST /journal/review
// @access: Private
router.post(
  '/review',
  authenticateJWT as RequestHandler,
  validateRequest(generateJournalReviewAiSchema),
  generateJournalReviewAiController
);

// @desc: Get journals summary
// @route: GET /journal/summary
// @access: Private
router.get(
  '/summary',
  authenticateJWT as RequestHandler,
  validateRequest(getJournalsSummarySchema),
  getJournalsSummaryController
);

// @desc: Get journal by ID
// @route: GET /journal/:id
// @access: Private
router.get('/:id', authenticateJWT as RequestHandler, validateRequest(getJournalByIdSchema), getJournalByIdController);

// @desc: Soft delete journal by ID
// @route: DELETE /journal/:id
// @access: Private
router.delete(
  '/:id',
  authenticateJWT as RequestHandler,
  validateRequest(softDeleteJournalSchema),
  softDeleteJournalController
);

// @desc: Update journal title
// @route: PATCH /journal/:id/title
// @access: Private
router.patch(
  '/:id/title',
  authenticateJWT as RequestHandler,
  validateRequest(updateJournalTitleSchema),
  updateJournalTitleController
);

export default router;
