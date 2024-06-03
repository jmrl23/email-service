import type { FromSchema } from 'json-schema-to-ts';
import { asRoute } from '../lib/util/fastify/typings';
import emailSendSchema from '../schemas/email/email-send.schema';
import authorizationPlugin from '../plugins/authorization.plugin';

export default asRoute(async function (app) {
  await app.register(authorizationPlugin);

  app.post(
    '/send',
    {
      schema: {
        tags: ['email'],
        description: 'Send email',
        body: emailSendSchema,
      },
    },
    async function (request) {
      const payload = request.body as FromSchema<typeof emailSendSchema>;
      const data = await app.emailService.send(payload);
      return { data };
    },
  );
});
