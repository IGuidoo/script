import { InitialSerpApiResponse, SuccessfulSerpApiFetches } from "../../application/api/serper.api.types";
import { GoogleKeywordTrackerKeyword } from "../../entities/models/google-keyword-tracker/keyword";

/**
 * Maps the Serper API response to a format that includes the corresponding keyword.
 * 
 * @param response - The initial Serper API response.
 * @param keywords - The array of GoogleKeywordTrackerKeyword objects.
 * @returns An array of SuccessfulSerpApiFetches objects with the mapped data.
 */
export const mapSerperApiResponse = (response: InitialSerpApiResponse[], keywords: GoogleKeywordTrackerKeyword[]): SuccessfulSerpApiFetches[] => {
    return response.map((data: any, index: number) => ({
      ...data,
      keyword: keywords[index],
    }));
  };