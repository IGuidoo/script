
export interface IProcessGoogleKeywordsRepository {
    insertUserResult: (result: any) => Promise<any>;
    insertCompetitorResult: (result: any) => Promise<any>;
    insertTopTenResults: (result: any) => Promise<any>;
}