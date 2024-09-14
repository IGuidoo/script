import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "../types";

import { IWebsiteRepository } from "../../application/repositories/website.repository.interface";
import { WebsiteRepository } from "../../infrastructure/repositories/website.repository";
// import { MockWebsiteRepository } from "../../infrastructure/repositories/website.repository.mock";


const initializeModule = (bind: interfaces.Bind) => {
  bind<IWebsiteRepository>(DI_SYMBOLS.IWebsiteRepository).to(WebsiteRepository);

  
  // if (process.env.NODE_ENV === "test") {
  //   bind<IWebsiteRepository>(DI_SYMBOLS.IWebsiteRepository).to(MockWebsiteRepository);
  // } else {
  //   bind<IWebsiteRepository>(DI_SYMBOLS.IWebsiteRepository).to(WebsiteRepository);
  // }
};

export const WebsiteRepositoryModule = new ContainerModule(initializeModule);
