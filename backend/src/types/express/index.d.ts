// types/express/index.d.ts
import { UserJwtPayload } from '../user';

declare global {
  namespace Express {
    interface Request {
      user?: UserJwtPayload;
      accessLevel?: string;
    }
  }
}