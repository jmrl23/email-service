import fastifyPlugin from 'fastify-plugin';
import EmailService from '../services/email.service';
import oauth2Client from '../lib/oauth2Client';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  SMTP_TRANSPORT_HOST,
  SMTP_TRANSPORT_PORT,
  SMTP_TRANSPORT_SECURED,
  SMTP_TRANSPORT_USER,
} from '../lib/constant/environment';

export default fastifyPlugin(async function servicesPlugin(app) {
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

  app.decorate('emailService', emailService);
});
