import type { Request, Response, NextFunction } from 'express';

import { raw } from 'express';

const rawMiddleware = raw({ type: 'application/json' });

export const rawBodyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('🔧 Raw body middleware called for:', req.originalUrl);

  rawMiddleware(req, res, err => {
    if (err) {
      console.error('❌ Raw body middleware error:', err);

      return next(err);
    }
    console.log('✅ Raw body middleware processed:', {
      bodyType: typeof req.body,
      isBuffer: Buffer.isBuffer(req.body),
      bodyLength: req.body?.length,
    });

    next();
  });
};
