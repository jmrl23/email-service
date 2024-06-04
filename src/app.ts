import fastify from 'fastify';
import { NotFound } from 'http-errors';
import setupPlugin from './plugins/setup.plugin';
import authorizationPlugin from './plugins/authorization.plugin';

const app = fastify();

app.register(setupPlugin);
app.register(authorizationPlugin);

app.setNotFoundHandler((request) => {
  throw new NotFound(`Cannot ${request.method} ${request.url}`);
});

export default app;
