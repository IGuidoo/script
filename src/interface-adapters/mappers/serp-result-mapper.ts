import {
    SerperApiSerpResult,
    SerpApiPeopleAsloAsk,
    SerpApiRelatedSearches,
} from "../../infrastructure/api/serper.api";

import { GoogleKeywordTrackerKeyword } from "../../entities/models/google-keyword-tracker/keyword";
import { GoogleKeywordTrackerResultTransferDTO } from "../../entities/models/google-keyword-tracker/result";
import { GoogleKeywordTrackerCompetitorResultInsert } from "../../entities/models/google-keyword-tracker/competitor-result";
import { GoogleKeywordTrackerSerpResultInsert } from "../../entities/models/google-keyword-tracker/serp-result";

export class SerpResultMapper {
  // Mapping SERP result to User Serp Result DTO
  static toUserSerpResultDTO(
    keyword: GoogleKeywordTrackerKeyword,
    serp: SerperApiSerpResult | undefined,
    relatedSearches: SerpApiRelatedSearches[] | undefined,
    peopleAlsoAsk: SerpApiPeopleAsloAsk[] | undefined
  ): GoogleKeywordTrackerResultTransferDTO {
    if (!serp) {
      return {
        keywordId: keyword.id,
        keywordName: keyword.keyword,
        position: null,
        url: null,
        metaTitle: null,
        metaDescription: null,
        relatedSearches: null,
        peopleAlsoAsk: null,
        siteLinks: null,
      };
    }

    return {
      keywordId: keyword.id,
      keywordName: keyword.keyword,
      position: serp.position,
      url: serp.link,
      metaTitle: serp.title,
      metaDescription: serp.snippet,
      relatedSearches: relatedSearches || null,
      peopleAlsoAsk: peopleAlsoAsk || null,
      siteLinks: serp.sitelinks || null,
    };
  }

  // Mapping SERP result to Competitor Serp Result Insert DTO
  static toCompetitorSerpResultDTO(
    serp: SerperApiSerpResult | undefined,
    competitorId: string,
    keywordId: string
  ): GoogleKeywordTrackerCompetitorResultInsert {
    if (!serp) {
      return {
        competitorId,
        keywordId,
        position: null,
        url: null,
        metaTitle: null,
        metaDescription: null,
      };
    }

    return {
      competitorId,
      keywordId,
      position: serp.position,
      url: serp.link,
      metaTitle: serp.title,
      metaDescription: serp.snippet,
    };
  }

  // Mapping SERP result to a general Top Ten Serp Result Insert DTO
  static toSerpResultDTO(
    serp: SerperApiSerpResult[],
    keyword: GoogleKeywordTrackerKeyword
  ): GoogleKeywordTrackerSerpResultInsert[] {
    return serp.map((result) => ({
      keywordId: keyword.id,
      position: result.position,
      url: result.link,
      metaTitle: result.title,
      metaDescription: result.snippet,
    }));
  }
}
