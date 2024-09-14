import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "../types";

import { SerperApi } from "../../infrastructure/api/serper.api";
import { ISerperApi } from "../../application/api/serper.api.interface";
import { MockSerperApi } from "../../infrastructure/api/serper.api.mock";



// import { MockUsersRepository } from "../../infrastructure/repositories/users.repository.mock";

const initializeModule = (bind: interfaces.Bind) => {
  bind<ISerperApi>(DI_SYMBOLS.ISerperApi).to(MockSerperApi);

  // if (process.env.NODE_ENV === "test") {
  //   bind<ISerperApi>(DI_SYMBOLS.ISerperApi).to(MockSerperApi);
  // } else {
  //   bind<ISerperApi>(DI_SYMBOLS.ISerperApi).to(SerperApi);
  // }
};

export const SerperApiModule = new ContainerModule(initializeModule);
