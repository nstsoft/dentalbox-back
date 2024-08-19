import { MongoSource, UsetRepository } from './repositories';
import { UserDataSource } from './sources';

const userRepository = new UsetRepository();
const userSource = new UserDataSource(userRepository);

export { MongoSource, userSource };
