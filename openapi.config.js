import { generateService } from '@umijs/openapi';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

generateService({
  schemaPath: 'http://47.115.57.164:81/api/v3/api-docs',
  serversPath: path.resolve(__dirname, './src/services'),
  requestLibPath: "import request from '@/../config/axios.config'",
  namespace: 'API'
});