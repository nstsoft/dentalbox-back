import '@config';

import { AuthenticationController, PlanController, UserController } from '@controllers';
import { mongoErrorInterceptor } from '@src/presenters/middlewares';
import cors from 'cors';
import express, { Request, Response } from 'express';

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  const pagination = {
    skip: 0,
    limit: 20,
  };
  if (!isNaN(+(req.query?.skip ?? 0))) {
    pagination.skip = Number(req.query.skip);
  }
  if (!isNaN(+(req.query.limit ?? 0))) {
    pagination.limit = Number(req.query.limit);
  }

  Object.assign(req, { pagination });

  return next();
});

const apiRouter = express.Router();

apiRouter.use(new UserController().route);
apiRouter.use(new AuthenticationController().route);
apiRouter.use(new PlanController().route);

app.use('/api/v1', apiRouter);

app.get('/', (req: Request, res: Response) => {
  res.json('Pong');
});

app.use(mongoErrorInterceptor);

app.use(function clientErrorHandler(error: any, req: Request, res: Response, _: unknown) {
  console.log(error.message);
  return res.status(error.status || 500).json({ message: error.message, error });
});

export { app };
