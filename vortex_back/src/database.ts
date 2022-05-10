import { Pool } from 'pg';

const pool = new Pool({
  connectionString:
    'postgres://yzsyamkkxquatj:23f2346009644577c8c1d5f82106ccba33e9997433bf32cca951cdad5e00fe69@ec2-44-196-223-128.compute-1.amazonaws.com:5432/d6eucvkgkdn9mu',
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;
