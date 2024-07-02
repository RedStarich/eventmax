import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config({ path: path.resolve(__dirname, '../../../my-project/.env') });
