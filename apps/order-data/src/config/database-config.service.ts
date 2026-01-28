import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from '../features/users/entities/User.entity';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const isProduction = this.configService.get('NODE_ENV') === 'production';

    return {
      type: 'postgres',
      host: this.configService.get('DATABASE_HOST', 'localhost'),
      port: this.configService.get<number>('DATABASE_PORT', 5435),
      username: this.configService.get('DATABASE_USER', 'postgres'),
      password: this.configService.get('DATABASE_PASSWORD', 'example'),
      database: this.configService.get('DATABASE_NAME', 'order-data'),
      entities: [User],
      migrations: ['src/database/migrations/*.ts'],
      synchronize: false,
      logging: !isProduction,
      autoLoadEntities: true,
      retryAttempts: 3,
      retryDelay: 3000,
    };
  }
}
