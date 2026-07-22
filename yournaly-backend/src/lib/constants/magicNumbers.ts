export const TimeUnits = {
  week: 1000 * 60 * 60 * 24 * 7,
  day: 1000 * 60 * 60 * 24,
  hour: 1000 * 60 * 60,
  minute: 1000 * 60,
  second: 1000,
} as const;

/** Ink pricing model (aligned with product README) */
export const InkPricing = {
  charactersPerBaseUnit: 500,
  baseInksPerUnit: 2.5,
  toneAdjustment: 1,
  readabilityAdjustment: 1.5,
  textLengthAdjustment: 2.5,
  minMaxCharactersAdjustment: 1.5,
} as const;
