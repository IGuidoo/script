import { GoogleKeywordTrackerKeyword } from "../../entities/models/google-keyword-tracker/keyword";
import { GoogleKeywordTracker, GoogleKeywordTrackerWithCompetitors, GoogleKeywordTrackerWithWebsite } from "../../entities/models/google-keyword-tracker";

export interface IGoogleKeywordTrackerRepository {
    insert(inputSchema: any): Promise<any>;
    update(updateSchema: any): Promise<any>;
    delete(id: string): Promise<any>;

    findById(id: string): Promise<GoogleKeywordTracker | null>;
    findByIdWithWebsite(id: string): Promise<GoogleKeywordTrackerWithWebsite | null>;
    findByIdWithCompetitors(id: string): Promise<GoogleKeywordTrackerWithCompetitors| null>;

    addKeywords(googleKeywordTrackerToolId: string, keywords: string[]): Promise<GoogleKeywordTrackerKeyword[]>;
}