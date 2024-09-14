import { DI_SYMBOLS } from "../../di/types";
import { inject } from "inversify";

import { ISerperApi } from "../api/serper.api.interface";
import {
  SerpApiPeopleAsloAsk,
  SerpApiRelatedSearches,
  SerperApiSerpResult,
  SuccessfulSerpApiFetches,
} from "../../infrastructure/api/serper.api";

import { Website } from "../../entities/models/website";
import { GoogleKeywordTrackerWithCompetitors } from "../../entities/models/google-keyword-tracker";
import { GoogleKeywordTrackerKeyword } from "../../entities/models/google-keyword-tracker/keyword";

import { GoogleKeywordTrackerResultTransferDTO } from "../../entities/models/google-keyword-tracker/result";
import { GoogleKeywordTrackerCompetitorResultInsert } from "../../entities/models/google-keyword-tracker/competitor-result";
import { GoogleKeywordTrackerSerpResultInsert } from "../../entities/models/google-keyword-tracker/serp-result";
import { SerpResultMapper } from "../../interface-adapters/mappers/serp-result-mapper";

interface ProcessKeywordsRequest {
  website: Website;
  googleKeywordTrackerTool: GoogleKeywordTrackerWithCompetitors;
  keywords: GoogleKeywordTrackerKeyword[];
}

export class ProcessGoogleKeywordsUseCase {
  constructor(
    @inject(DI_SYMBOLS.ISerperApi)
    private _serperApi: ISerperApi
  ) {
    this._serperApi = _serperApi;
  }

  async execute({
    website,
    googleKeywordTrackerTool,
    keywords,
  }: ProcessKeywordsRequest): Promise<GoogleKeywordTrackerResultTransferDTO[]> {
    const serperApiResponse = await this._serperApi.fetchSerpData(
      keywords,
      "NL",
      "nl"
    );
    if (!serperApiResponse) {
      throw new Error("Failed to fetch serp data");
    }
    const userSerpResultsDTO: GoogleKeywordTrackerResultTransferDTO[] = [];
    const topTenSerpResultsDTO: GoogleKeywordTrackerSerpResultInsert[] = [];
    const competitorsSerpResultsDTO: GoogleKeywordTrackerCompetitorResultInsert[] =
      [];

    // Map over each keyword and find the position in the serp data
    serperApiResponse.map((serp) => {
      const keyword = serp.keyword;

      const usersSerpPosition = this.findPositionInSerpData(
        serp,
        website.domainUrl
      );

      userSerpResultsDTO.push(
        SerpResultMapper.toUserSerpResultDTO(
          keyword,
          usersSerpPosition,
          serp.relatedSearches,
          serp.peopleAlsoAsk
        )
      );

      const topTenPositions = this.topTenPositions(serp);
      topTenSerpResultsDTO.push(
        ...SerpResultMapper.toSerpResultDTO(topTenPositions, keyword)
      );

      const competitorsSerpResults = googleKeywordTrackerTool.competitors.map(
        (competitor) => {
          const competitorSerpPosition = this.findPositionInSerpData(
            serp,
            competitor.domainUrl
          );
          return SerpResultMapper.toCompetitorSerpResultDTO(
            competitorSerpPosition,
            competitor.id,
            keyword.id
          );
        }
      );
      competitorsSerpResultsDTO.push(...competitorsSerpResults);
    });

    console.log('topTenSerpResultsDTO',topTenSerpResultsDTO);
    console.log('competitorsResults',competitorsSerpResultsDTO);

    // await this._serperApi.insertTopTenResults(topTenSerpResultsDTO);
    // await this._serperApi.insertCompetitorResult(competitorsSerpResultsDTO);

    return userSerpResultsDTO;
  }

  findPositionInSerpData(
    serp: SuccessfulSerpApiFetches,
    userDomain: string
  ): SerperApiSerpResult | undefined {
    return serp.organic.find((result) => result.link.includes(userDomain));
  }

  topTenPositions(serp: SuccessfulSerpApiFetches): SerperApiSerpResult[] {
    return serp.organic.slice(0, 10);
  }
}
