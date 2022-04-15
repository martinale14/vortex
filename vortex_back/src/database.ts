import { Pool } from 'pg';
import keys from './keys';

const pool = new Pool({
  user: keys.user,
  host: keys.host,
  database: keys.database,
  password: keys.password,
  port: parseInt(keys.port)
});

export default pool;
