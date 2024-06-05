import type { FastifyRequest } from 'fastify';
import { Unauthorized } from 'http-errors';
import apiRequest from '../lib/util/apiRequest';
import { AUTHENTICATION_SERVICE_URL } from '../lib/constant/environment';

export default async function authorizationPreHandler(request: FastifyRequest) {
  const [scheme, token] = request.headers.authorization?.split(' ') ?? [];
  if (scheme !== 'Bearer') throw new Unauthorized('Invalid scheme');
  const response = await apiRequest<AuthenticationInfo>(
    fetch(
      `${AUTHENTICATION_SERVICE_URL}/authenticate?token=${encodeURIComponent(token)}`,
    ),
  );
  if (response instanceof Error) throw new Unauthorized();
  if (!response.authorized) throw Unauthorized(response.reason);
}

interface AuthenticationInfo {
  authorized: boolean;
  reason?: string;
}
