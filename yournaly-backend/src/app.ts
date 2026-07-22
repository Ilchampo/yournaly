import { errorHandler, notFoundHandler } from '@/middlewares/error.middleware';
import { ResponseCodes } from '@/lib/constants/responseCodes';
import { appConfig } from '@/configs/app.config';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import authRoutes from '@/routes/auth.routes';
import journalRoutes from '@/routes/journal.routes';
import userRoutes from '@/routes/user.routes';
import inksRoutes from '@/routes/inks.routes';
import paymentRoutes from '@/routes/payment.routes';

export const createApp = (): express.Application => {
  const app = express();

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'https:'],
        },
      },
    })
  );

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) {
          return callback(null, true);
        }

        const allowedOrigins = appConfig.corsOrigins;

        for (const allowedOrigin of allowedOrigins) {
          if (allowedOrigin.includes('*')) {
            const pattern = allowedOrigin.replace('*', '');

            if (origin.startsWith(pattern)) {
              return callback(null, true);
            }
          } else if (origin === allowedOrigin) {
            return callback(null, true);
          }
        }

        return callback(new Error('Not allowed by CORS'));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    })
  );

  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  app.use((req, res, next) => {
    if (req.originalUrl === '/api/payment/webhook') {
      next();
    } else {
      express.json({ limit: '10mb' })(req, res, next);
    }
  });

  if (appConfig.env === 'development') {
    app.use((req, _res, next) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
      next();
    });
  }

  app.get('/health', (_req, res) => {
    res.status(ResponseCodes.SUCCESS).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      environment: appConfig.env,
      version: appConfig.version,
    });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/journals', journalRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/inks', inksRoutes);
  app.use('/api/payment', paymentRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

export const startServer = (): void => {
  const app = createApp();
  const port = appConfig.port;

  app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${port}`);
    console.log(`📊 Environment: ${appConfig.env}`);
    console.log(`🔗 Health check: http://localhost:${port}/health`);
    console.log(`🔐 Auth endpoints: http://localhost:${port}/api/auth`);
  });
};

export default createApp;
