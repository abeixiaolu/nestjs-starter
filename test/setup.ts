import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import helmet from 'helmet';
import { CacheService } from '../src/core/cache/cache.service';
import { DatabaseService } from '../src/database/database.service';

let app: INestApplication<App>;
let server: any;
let cacheService: CacheService;
let databaseService: DatabaseService;

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.init();
  server = app.getHttpServer();
  cacheService = app.get(CacheService);
  databaseService = app.get(DatabaseService);
}, 30000);

afterEach(async () => {
  await cacheService.clear();
  await databaseService.clear();
  await app.close();
}, 30000);

export { app, server, cacheService, databaseService };
