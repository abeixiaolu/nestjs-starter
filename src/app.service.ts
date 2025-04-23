import { Injectable } from '@nestjs/common';
import { LoggerService } from './core/logger/logger.service';
import { DatabaseService } from './database/database.service';
import { CacheService } from './core/cache/cache.service';
@Injectable()
export class AppService {
  constructor(
    private readonly logger: LoggerService,
    private readonly database: DatabaseService,
    private readonly cache: CacheService,
  ) {}
  async getHello() {
    await this.cache.set('redis-test', 'HELLO WORLD', 10000);
    const test = await this.cache.get<string>('redis-test');
    this.logger.log(`Cache from redis: ${test}`, 'AppService getHello');
    const users = await this.database.user.findMany();
    return users;
  }
}
