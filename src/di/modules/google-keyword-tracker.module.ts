import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "../types";

import { IGoogleKeywordTrackerRepository } from "../../application/repositories/google-keyword-tracker.repository.interface";
import { GoogleKeywordTrackerRepository } from "../../infrastructure/repositories/google-keyword-tracker.repository";



// import { MockUsersRepository } from "../../infrastructure/repositories/users.repository.mock";

const initializeModule = (bind: interfaces.Bind) => {
  bind<IGoogleKeywordTrackerRepository>(DI_SYMBOLS.IGoogleKeywordTrackerRepository).to(GoogleKeywordTrackerRepository);

};

export const GoogleKeywordTrackerRepositoryModule = new ContainerModule(initializeModule);
