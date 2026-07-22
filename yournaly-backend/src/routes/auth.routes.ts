import { googleTokenController } from '@/controllers/auth.controller';
import { googleTokenSchema } from '@/lib/schemas/auth.schemas';
import { validateRequest } from '@/middlewares/validation.middleware';
import { Router } from 'express';

const router = Router();

// @desc: Google token (Chrome extension OAuth)
// @route: POST /auth/google/token
// @access: Public
router.post('/google/token', validateRequest(googleTokenSchema), googleTokenController);

export default router;
