import 'reflect-metadata';

import { config } from '@config';
import { MongoSource } from '@src/data-layer';

import { app } from './server';
app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
});
MongoSource.initialize();
