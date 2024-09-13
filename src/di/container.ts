import { Container } from "inversify";

import { DI_RETURN_TYPES, DI_SYMBOLS } from "./types";

import { UsersRepositoryModule } from "./modules/users.module";
// import { TokenRepositoryModule, TokenServiceModule } from "./modules/token.module";
// import { EmailServiceModule } from "./modules/email.module";
// import { AuthenticationServiceModule } from "./modules/authentication.module";
// import { WebsiteRepositoryModule } from "./modules/website.module";
// import { LocationRepositoryModule } from "./modules/location.module";

import { ProcessGoogleKeywordModule } from "./modules/process-google-keywords.module";

const ApplicationContainer = new Container({
  defaultScope: "Singleton",
});

export const initializeContainer = () => {
  // ApplicationContainer.load(AuthenticationServiceModule);
  ApplicationContainer.load(UsersRepositoryModule);
  // ApplicationContainer.load(TokenServiceModule);
  // ApplicationContainer.load(TokenRepositoryModule);
  // ApplicationContainer.load(EmailServiceModule);  
  // ApplicationContainer.load(WebsiteRepositoryModule);
  // ApplicationContainer.load(LocationRepositoryModule);
  ApplicationContainer.load(ProcessGoogleKeywordModule);
};

export const destroyContainer = () => {
  // ApplicationContainer.unload(AuthenticationServiceModule);
  ApplicationContainer.unload(UsersRepositoryModule);
  // ApplicationContainer.unload(TokenServiceModule);
  // ApplicationContainer.unload(TokenRepositoryModule);
  // ApplicationContainer.unload(EmailServiceModule);
  // ApplicationContainer.unload(WebsiteRepositoryModule);
  // ApplicationContainer.unload(LocationRepositoryModule);
  ApplicationContainer.unload(ProcessGoogleKeywordModule);
};

if (process.env.NODE_ENV !== "test") {
  initializeContainer();
}

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K,
): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}

export { ApplicationContainer };
