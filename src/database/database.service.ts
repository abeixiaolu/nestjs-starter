import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from './generated/client';

interface TableInfo {
  tablename: string;
}

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async clear() {
    await this.user.deleteMany();
  }

  async reset() {
    // 获取所有表名
    const tables = await this.$queryRaw<TableInfo[]>`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public'
    `;
    // 禁用外键约束
    await this.$executeRaw`SET session_replication_role = 'replica';`;
    // 删除所有表
    for (const table of tables) {
      await this
        .$executeRaw`DROP TABLE IF EXISTS "${table.tablename}" CASCADE;`;
    }
    // 重新启用外键约束
    await this.$executeRaw`SET session_replication_role = 'origin';`;
    // 重新运行迁移
    await this.$executeRaw`npx prisma migrate reset --force`;
  }
}
