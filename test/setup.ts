import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import helmet from 'helmet';
import { CacheService } from '../src/core/cache/cache.service';
import { DatabaseService } from '../src/database/database.service';

// 设置全局测试超时时间为 120 秒
jest.setTimeout(120000);

let app: INestApplication<App>;
let server: any;
let cacheService: CacheService;
let databaseService: DatabaseService;

beforeAll(async () => {
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
}, 60000);

afterAll(async () => {
  await cacheService.clear();
  await databaseService.clear();
  await app.close();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  server.close();
}, 60000);

export { app, server, cacheService, databaseService };
