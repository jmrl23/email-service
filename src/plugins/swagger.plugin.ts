import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyPlugin from 'fastify-plugin';
import { SERVER_URL } from '../lib/constant/environment';

export default fastifyPlugin(async function swaggerPlugin(app) {
  const servers = [
    {
      url: 'http://localhost:3002',
      description: 'Default local development server',
    },
  ];

  if (SERVER_URL) {
    servers.unshift({
      url: SERVER_URL,
      description: 'Server URL',
    });
  }

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Email API',
        version: '1.0.0',
        description: 'Microservice docs',
      },
      servers,
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    hideUntagged: true,
  });

  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  });
});
