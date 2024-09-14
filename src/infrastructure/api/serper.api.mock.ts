import { injectable } from "inversify";

import { GoogleKeywordTrackerKeyword } from "../../entities/models/google-keyword-tracker/keyword";

import { ISerperApi } from "../../application/api/serper.api.interface";
import axios from "axios";
import { SERPER_API_RESPONSE } from "./serperRes";
import { InitialSerpApiResponse, SuccessfulSerpApiFetches } from "./serper.api";
import { GoogleKeywordTrackerCompetitor } from "@prisma/client";

@injectable()
export class MockSerperApi implements ISerperApi {
  async fetchSerpData(
    keywords: GoogleKeywordTrackerKeyword[],
    country: string,
    language: string,
    location?: string,
    numberOfResults: number = 100
  ): Promise<SuccessfulSerpApiFetches[] | undefined> {

    console.log('mocking fetchSerpData');
    console.log('data w/o keywords', country, language, location, numberOfResults);

    return SERPER_API_RESPONSE.map((data: InitialSerpApiResponse, index : number) => ({
      ...data,
      keyword: keywords[index]
    }));
  }
}


