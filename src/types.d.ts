import { User } from '@domains';

declare global {
  namespace Express {
    interface Request<U extends boolean | undefined = undefined> {
      user: U extends true ? User & { _id: string; workspace: string } : undefined;
    }
  }
}
