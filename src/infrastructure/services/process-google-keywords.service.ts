import { injectable } from "inversify";

import { IProcessGoogleKeywordsService } from "../../application/services/process-google-keywords.service.interface";

@injectable()
export class ProcessGoogleKeywordsRepository implements IProcessGoogleKeywordsService {
    async insertUserResult(result: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async insertCompetitorResult(result: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async insertTopTenResults(result: any): Promise<any> {
        throw new Error("Method not implemented.");
    }   
}