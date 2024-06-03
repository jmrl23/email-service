import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyPlugin from 'fastify-plugin';

export default fastifyPlugin(async function swaggerPlugin(app) {
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Email API',
        version: '1.0.0',
        description: 'Microservice docs',
      },
      servers: [
        {
          url: 'http://localhost:3002',
          description: 'Default local development server',
        },
      ],
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