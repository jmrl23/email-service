import type EmailService from '../services/email.service';

export declare module 'fastify' {
  declare interface FastifyInstance {
    emailService: EmailService;
  }
}
