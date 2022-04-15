import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

export default {
  user: process.env.DB_USERNAME ?? '',
  host: process.env.DB_HOST ?? '',
  database: process.env.DB_DATABASE ?? '',
  password: process.env.DB_PASSWORD ?? '',
  port: process.env.DB_PORT ?? ''
};
