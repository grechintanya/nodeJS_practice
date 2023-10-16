import path from 'path';
import swaggerDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NodeJS Practice',
      version: '1.0.0',
    },
  },
  tags: [
    { name: 'health', description: 'Server health check' },
    { name: 'genres', description: 'This api is used for operations with genres' },
  ],
  apis: [`${path.join(__dirname, 'routes')}/*.ts`, 'server.ts'],
};

const swaggerSpec = swaggerDoc(options);

export default swaggerSpec;
