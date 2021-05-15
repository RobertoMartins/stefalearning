import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import UnauthorizedException from '../exceptions/unauthorized.exception';

export default function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Token não informado.');
    }

    const decoded = jwt.verify(authorization, config.auth.secret);
    // @ts-ignore
    req.uid = decoded;

    next();
  } catch (err) {
    if (err instanceof UnauthorizedException) {
      next(err);
    } else {
      next(new UnauthorizedException('Token inválido.'));
    }
  }
}
