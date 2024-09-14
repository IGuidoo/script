// import { IAuthenticationService } from "../application/services/authentication.service.interface";
// import { IEmailService } from "../application/services/email.service.interface";
// import { ITokenService } from "../application/services/token.service.interface";

import { IUsersRepository } from "../application/repositories/users.repository.interface";
// import { ITokenRepository } from "../application/repositories/token.repository.interface";
import { IWebsiteRepository } from "../application/repositories/website.repository.interface";
import { ILocationRepository } from "../application/repositories/location.repository.interface";

import { IProcessGoogleKeywordsService } from "../application/services/process-google-keywords.service.interface";
import { IGoogleKeywordTrackerRepository } from "../application/repositories/google-keyword-tracker.repository.interface";
import { SerperApi } from "../infrastructure/api/serper.api";

export const DI_SYMBOLS = {
  // Services
  // IAuthenticationService: Symbol.for("IAuthenticationService"),
  // ITokenService: Symbol.for("ITokenService"),
  // IEmailService: Symbol.for("IEmailService"),

  IProcessGoogleKeywordsService: Symbol.for("IProcessGoogleKeywordsService"),

  // Repositories
  IUsersRepository: Symbol.for("IUsersRepository"),
  // ITokenRepository: Symbol.for("ITokenRepository"),
  IWebsiteRepository: Symbol.for("IWebsiteRepository"),
  ILocationRepository: Symbol.for("ILocationRepository"),

  IGoogleKeywordTrackerRepository: Symbol.for("IGoogleKeywordTrackerRepository"),

  // Api
  ISerperApi: Symbol.for("ISerperApi"),
};

export interface DI_RETURN_TYPES {
  // Services
  // IAuthenticationService: IAuthenticationService;
  // ITokenService: ITokenService;
  // IEmailService: IEmailService;

  IProcessGoogleKeywordsService: IProcessGoogleKeywordsService;

  // Repositories
  IUsersRepository: IUsersRepository;
  // ITokenRepository: ITokenRepository;
  IWebsiteRepository: IWebsiteRepository;
  ILocationRepository: ILocationRepository;

  IGoogleKeywordTrackerRepository: IGoogleKeywordTrackerRepository;

  // Api
  ISerperApi: SerperApi;
}
