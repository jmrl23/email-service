import type { FromSchema } from 'json-schema-to-ts';
import { asRoute } from '../lib/util/fastify/typings';
import { emailSendSchema } from '../schemas/email.schema';
import EmailService from '../services/email.service';
import {
  GOOGLE_REFRESH_TOKEN,
  SMTP_TRANSPORT_HOST,
  SMTP_TRANSPORT_PORT,
  SMTP_TRANSPORT_SECURED,
  SMTP_TRANSPORT_USER,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from '../lib/constant/environment';
import authorizationPreHandler from '../handlers/authorization.prehandler';

export default asRoute(async function appRoute(app) {
  const emailService = await EmailService.createInstance({
    host: SMTP_TRANSPORT_HOST,
    port: SMTP_TRANSPORT_PORT,
    secure: SMTP_TRANSPORT_SECURED,
    auth: {
      type: 'oauth2',
      user: SMTP_TRANSPORT_USER,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: GOOGLE_REFRESH_TOKEN,
    },
  });

  app.post(
    '/send',
    {
      preHandler: [authorizationPreHandler],
      schema: {
        tags: ['email'],
        description: emailSendSchema.description,
        body: emailSendSchema,
      },
    },
    async function (request) {
      const payload = request.body as FromSchema<typeof emailSendSchema>;
      const data = await emailService.send(payload);
      return { data };
    },
  );
});
