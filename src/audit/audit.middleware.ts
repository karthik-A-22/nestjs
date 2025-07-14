import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `[Audit] ${req.method} ${req.originalUrl} at ${new Date().toISOString()}`,
    );
    next();
  }
}
