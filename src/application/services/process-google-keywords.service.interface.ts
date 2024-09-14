import { GoogleKeywordTrackerKeyword } from "../../entities/models/google-keyword-tracker/keyword";
import { GoogleKeywordTrackerWithCompetitors } from "../../entities/models/google-keyword-tracker";
import { GoogleKeywordTrackerResultTransferDTO } from "../../entities/models/google-keyword-tracker/result";
import { Website } from "../../entities/models/website";
import { SerperApiSerpResult, SuccessfulSerpApiFetches } from "../../infrastructure/api/serper.api";

export interface IProcessGoogleKeywordsService {
    insertUserResult: (result: any) => Promise<any>;
    insertCompetitorResult: (result: any) => Promise<any>;
    insertTopTenResults: (result: any) => Promise<any>;

    // execute: (website: Website, googleKeywordTrackerTool: GoogleKeywordTrackerWithCompetitors, keywords: GoogleKeywordTrackerKeyword) => Promise<GoogleKeywordTrackerResultTransferDTO[]>;
    // findPositionInSerpData: (serp: SuccessfulSerpApiFetches, userDomain: string) => SerperApiSerpResult | undefined;
    // topTenPosition: (serp: SuccessfulSerpApiFetches) => SerperApiSerpResult[];
    
}