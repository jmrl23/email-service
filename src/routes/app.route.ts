import type { FromSchema } from 'json-schema-to-ts';
import { asRoute } from '../lib/util/fastify/typings';
import { emailSendSchema } from '../schemas/email.schema';
import EmailService from '../services/email.service';
import oauth2Client from '../lib/oauth2Client';
import {
  GOOGLE_REFRESH_TOKEN,
  SMTP_TRANSPORT_HOST,
  SMTP_TRANSPORT_PORT,
  SMTP_TRANSPORT_SECURED,
  SMTP_TRANSPORT_USER,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from '../lib/constant/environment';

export default asRoute(async function appRoute(app) {
  oauth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN,
  });

  const accessToken = await oauth2Client.getAccessToken();
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
      accessToken: accessToken.token ?? '',
    },
  });

  app.post(
    '/send',
    {
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
