import { CabinetRepository, MongoSource, PlanRepository, UserRepository, WorkspaceRepository } from './repositories';
import { CabinetDataSource, PlanDataSource, UserDataSource, WorkspaceDataSource } from './sources';

const userRepository = new UserRepository();
const planRepository = new PlanRepository();
const cabinetRepository = new CabinetRepository();
const workspaceRepository = new WorkspaceRepository();
const userSource = new UserDataSource(userRepository);
const planSource = new PlanDataSource(planRepository);
const workspaceSource = new WorkspaceDataSource(workspaceRepository);
const cabinetSource = new CabinetDataSource(cabinetRepository);

export { cabinetSource, MongoSource, planSource, userSource, workspaceSource };
