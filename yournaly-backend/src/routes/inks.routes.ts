import { getInkPackagesController } from '@/controllers/inks.controller';
import { authenticateJWT } from '@/middlewares/auth.middleware';
import { Router, RequestHandler } from 'express';

const router = Router();

// @desc: Get all available ink packages
// @route: GET /inks/packages
// @access: Private
router.get('/packages', authenticateJWT as RequestHandler, getInkPackagesController);

export default router;
