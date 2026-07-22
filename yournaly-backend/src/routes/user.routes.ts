import { updateUserPreferencesController } from '@/controllers/user.controller';
import { updateUserPreferencesSchema } from '@/lib/schemas/user.schemas';
import { authenticateJWT } from '@/middlewares/auth.middleware';
import { validateRequest } from '@/middlewares/validation.middleware';
import { Router, RequestHandler } from 'express';

const router = Router();

// @desc: Update user preferences
// @route: PUT /user/preferences
// @access: Private
router.put(
  '/preferences',
  authenticateJWT as RequestHandler,
  validateRequest(updateUserPreferencesSchema),
  updateUserPreferencesController
);

export default router;
