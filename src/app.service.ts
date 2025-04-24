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
    await this.cache.set('key', 'HELLO WORLD', 10000);
    const test = await this.cache.get<string>('key');
    console.log('test: ', test);
    // this.logger.log(`Cache from redis: ${test}`, 'AppService getHello');
    const users = await this.database.user.findMany();
    this.logger.log(
      `Users from database: ${JSON.stringify(users)}`,
      'AppService getHello',
    );
    return 'Hello World!';
  }
}
