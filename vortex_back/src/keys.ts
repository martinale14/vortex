import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

export default {
  user: 'yzsyamkkxquatj',
  host: 'ec2-44-196-223-128.compute-1.amazonaws.com',
  database: 'd6eucvkgkdn9mu',
  password: '23f2346009644577c8c1d5f82106ccba33e9997433bf32cca951cdad5e00fe69',
  port: '5432'
};
