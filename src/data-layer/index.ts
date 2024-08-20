import { MongoSource, PlanRepository, UserRepository, WorkspaceRepository } from './repositories';
import { PlanDataSource, UserDataSource, WorkspaceDataSource } from './sources';

const userRepository = new UserRepository();
const planRepository = new PlanRepository();
const workspaceRepository = new WorkspaceRepository();
const userSource = new UserDataSource(userRepository);
const planSource = new PlanDataSource(planRepository);
const workspaceSource = new WorkspaceDataSource(workspaceRepository);

export { MongoSource, planSource, userSource, workspaceSource };
