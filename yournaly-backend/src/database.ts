import { databaseConfig } from '@/configs/database.config';
import { PrismaClient } from '@/generated/prisma';

class Database {
  private static instance: PrismaClient;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!Database.instance) {
      Database.instance = new PrismaClient({
        datasources: {
          db: {
            url: databaseConfig.url,
          },
        },
        log: databaseConfig.logLevel,
      });
    }

    return Database.instance;
  }

  public static async disconnect(): Promise<void> {
    if (Database.instance) {
      await Database.instance.$disconnect();
    }
  }
}

export const prisma = Database.getInstance();

export const disconnectDatabase = Database.disconnect;

export { Database };
