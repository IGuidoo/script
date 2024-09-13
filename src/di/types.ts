// import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
// import { IEmailService } from "@/src/application/services/email.service.interface";
// import { ITokenService } from "@/src/application/services/token.service.interface";

import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
// import { ITokenRepository } from "@/src/application/repositories/token.repository.interface";
// import { IWebsiteRepository } from "@/src/application/repositories/website.repository.interface";
// import { ILocationRepository } from "@/src/application/repositories/location.repository.interface";

import { IProcessGoogleKeywordsRepository } from "../application/repositories/process-google-keywords.repository.interface";
import { IGoogleKeywordTrackerRepository } from "../application/repositories/google-keyword-tracker.repository.interface";

export const DI_SYMBOLS = {
  // Services
  // IAuthenticationService: Symbol.for("IAuthenticationService"),
  // ITokenService: Symbol.for("ITokenService"),
  // IEmailService: Symbol.for("IEmailService"),

  // Repositories
  IUsersRepository: Symbol.for("IUsersRepository"),
  // ITokenRepository: Symbol.for("ITokenRepository"),
  // IWebsiteRepository: Symbol.for("IWebsiteRepository"),
  // ILocationRepository: Symbol.for("ILocationRepository"),

  IProcessGoogleKeywordsRepository: Symbol.for("IProcessGoogleKeywordsRepository"),
  IGoogleKeywordTrackerRepository: Symbol.for("IGoogleKeywordTrackerRepository"),
};

export interface DI_RETURN_TYPES {
  // Services
  // IAuthenticationService: IAuthenticationService;
  // ITokenService: ITokenService;
  // IEmailService: IEmailService;

  // Repositories
  IUsersRepository: IUsersRepository;
  // ITokenRepository: ITokenRepository;
  // IWebsiteRepository: IWebsiteRepository;
  // ILocationRepository: ILocationRepository;

  IProcessGoogleKeywordsRepository: IProcessGoogleKeywordsRepository;
  IGoogleKeywordTrackerRepository: IGoogleKeywordTrackerRepository;
}
