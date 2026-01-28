import 'dotenv/config';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5435'),
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'example',
  database: process.env.DATABASE_NAME || 'order-data',
  entities: ['src/features/**/entities/*.entity.{ts,js}'],
  migrations: ['src/database/migrations/**/*.{ts,js}'],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
});
