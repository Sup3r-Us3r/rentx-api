import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [_, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(
      token,
      auth.secretToken,
    ) as IPayload;

    req.user = {
      id: userId,
    };

    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}
