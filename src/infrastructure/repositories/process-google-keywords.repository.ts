import { injectable } from "inversify";

import { IProcessGoogleKeywordsRepository } from "@/src/application/repositories/process-google-keywords.repository.interface";

@injectable()
export class ProcessGoogleKeywordsRepository implements IProcessGoogleKeywordsRepository {
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