import { Injectable } from '@nestjs/common';
import { LoggerService } from './core/logger/logger.service';
import { DatabaseService } from './database/database.service';
@Injectable()
export class AppService {
  constructor(
    private readonly logger: LoggerService,
    private readonly database: DatabaseService,
  ) {}
  async getHello() {
    this.logger.log('Connecting to database...');
    const users = await this.database.user.findMany();
    return users;
  }
}
