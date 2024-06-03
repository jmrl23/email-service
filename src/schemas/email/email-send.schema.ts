import { asJsonSchema } from '../../lib/util/fastify/typings';

export default asJsonSchema({
  type: 'object',
  additionalProperties: false,
  required: ['from', 'subject'],
  properties: {
    from: {
      type: 'string',
      examples: ['john@example.com', 'john <john@example.com>'],
    },
    subject: {
      type: 'string',
      examples: ['hello world'],
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
