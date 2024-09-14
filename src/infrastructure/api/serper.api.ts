import { injectable } from "inversify";

import { GoogleKeywordTrackerKeyword } from "../../entities/models/google-keyword-tracker/keyword";

import { ISerperApi } from "../../application/api/serper.api.interface";
import axios from "axios";

@injectable()
export class SerperApi implements ISerperApi {
  async fetchSerpData(
    keywords: GoogleKeywordTrackerKeyword[],
    country: string,
    language: string,
    location?: string,
    numberOfResults: number = 100
  ): Promise<SuccessfulSerpApiFetches[] | undefined> {
    console.log("Fetching SERP data");

    console.log("Keywords: ", keywords, "Country: ", country, "Language: ", language, "Location: ", location);

    const data = JSON.stringify(
      keywords.map((keyword) => ({
        q: keyword.keyword,
        location: location ?? undefined,
        gl: country,
        hl: language,
        autrocorrect: false,
        num: numberOfResults,
      }))
    );

    const config = {
      method: "post",
      url: "https://google.serper.dev/search",
      headers: {
        "X-API-KEY": process.env.SERPER_API_KEY,
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios(config);
      console.log("Response: ", response.data);


      return response.data;
    } catch (error) {
      console.error("Error fetching SERP data: ", error);
    }
  }
}

export type InitialSerpApiResponse = {
  searchParameters: searchParameters;
  knowledgeGraph?: any;
  organic: SerperApiSerpResult[] | [];
  places?: SerperApiPlaces[];
  peopleAlsoAsk?: SerpApiPeopleAsloAsk[];
  relatedSearches?: SerpApiRelatedSearches[];
  images?: SerpApiImages[];
  credits: number;
}

/**
 * Represents the successful fetch response from the SerpApi.
 * - If no results are found, organic will be an empty array.
 */
export type SuccessfulSerpApiFetches = {
  searchParameters: searchParameters;
  knowledgeGraph?: any;
  /**
   * An array of organic search results.
   * If no results are found, it will be an empty array.
   */
  organic: SerperApiSerpResult[] | [];

  keyword: GoogleKeywordTrackerKeyword;
  /**
   * An array of places related to the search.
   */
  places?: SerperApiPlaces[];
  /**
   * An array of "People Also Ask" related to the search.
   */
  peopleAlsoAsk?: SerpApiPeopleAsloAsk[];
  /**
   * An array of related searches.
   */
  relatedSearches?: SerpApiRelatedSearches[];

  images?: SerpApiImages[];

  credits: number;
};

type searchParameters = {
  q: string;
  location?: string;
  gl: string;
  hl: string;
  type: string;
  num: number;
  engine: string;
};

// FetchItem and SuccessfulFetches types
export type SerperApiSerpResult = {
  title: string;
  link: string;
  snippet: string;
  position: number;
  date?: string;
  sitelinks?: SiteLinks[];
  rating?: number;
  ratingCount?: number;
  attributes?: any;
  imageUrl?: string;
  priceRange?: string;
};

type SerperApiPlaces = {
  title: string;
  address: string;
  cid: string;
};

export type SerpApiPeopleAsloAsk = {
  question: string;
  snippet: string;
  title: string;
  link: string;
};

export type SerpApiRelatedSearches = {
  query: string;
};


type SerpApiImages = {
  title: string;
  imageUrl: string;
  link: string;
};

export type SiteLinks = {
  title: string;
  link: string;
};


export type GoogleSearchLocation = {
  name: string;
  canonicalName: string;
  googleId: number;
  countryCode: string;
  targetType: string;
};



export type CampaignStats = {
  campaignId: string;
  improved: number;
  worsened: number;
  total: number;
  topThree: number;
  topTen: number;
  topHundred: number;
  noChange: number;
  notFound: number;
  averagePosition: number;
}