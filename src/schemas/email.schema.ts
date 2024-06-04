import { SMTP_TRANSPORT_USER } from '../lib/constant/environment';
import { asJsonSchema } from '../lib/util/fastify/typings';

export const emailSendSchema = asJsonSchema({
  type: 'object',
  description: 'Send email',
  additionalProperties: false,
  required: ['from', 'subject'],
  properties: {
    from: {
      type: 'string',
      examples: [`Example <${SMTP_TRANSPORT_USER}>`],
    },
    subject: {
      type: 'string',
      examples: ['example'],
    },
    to: {
      type: 'array',
      items: {
        type: 'string',
        format: 'email',
      },
    },
    text: {
      type: 'string',
      minLength: 1,
      default: 'Hello, World!',
    },
    html: {
      type: 'string',
      minLength: 1,
      default: '<h1>Hello, World!</h1>',
    },
  },
} as const);