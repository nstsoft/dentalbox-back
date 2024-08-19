import { User } from '@domains';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
