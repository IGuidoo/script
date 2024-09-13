import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "../types";

import { IProcessGoogleKeywordsRepository } from "../../application/repositories/process-google-keywords.repository.interface";
import { ProcessGoogleKeywordsRepository } from "../../infrastructure/repositories/process-google-keywords.repository";



// import { MockUsersRepository } from "@/src/infrastructure/repositories/users.repository.mock";

const initializeModule = (bind: interfaces.Bind) => {
  bind<IProcessGoogleKeywordsRepository>(DI_SYMBOLS.IProcessGoogleKeywordsRepository).to(ProcessGoogleKeywordsRepository);

};

export const ProcessGoogleKeywordModule = new ContainerModule(initializeModule);
