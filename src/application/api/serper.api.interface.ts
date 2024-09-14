import { SuccessfulSerpApiFetches } from "../../infrastructure/api/serper.api";
import { GoogleKeywordTrackerKeyword } from "../../entities/models/google-keyword-tracker/keyword";


export interface ISerperApi {

    fetchSerpData:(keywords: GoogleKeywordTrackerKeyword[], country: string, language: string, location?: string, numberOfResults?: number) => Promise<SuccessfulSerpApiFetches[] | undefined>;
}