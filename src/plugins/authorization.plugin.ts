import fastifyPlugin from 'fastify-plugin';
import { AUTHORIZATION_KEY } from '../lib/constant/environment';
import { Unauthorized } from 'http-errors';

export default fastifyPlugin(async function authorizationPlugin(app) {
  app.addHook('preHandler', async function (request) {
    const [scheme, authorizationKey] =
      request.headers.authorization?.split(' ') ?? [];
    if (scheme !== 'Bearer' || authorizationKey !== AUTHORIZATION_KEY)
      throw Unauthorized();
  });
});
