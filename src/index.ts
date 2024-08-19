import 'reflect-metadata';

import { config } from '@config';
import { MongoSource } from '@data';

import { app } from './server';

MongoSource.initialize().then(() => {
  app.listen(config.PORT, () => {
    console.log(`Server is running on http://localhost:${config.PORT}`);
  });
});

// const PORT = process.env.PORT || 3000;
