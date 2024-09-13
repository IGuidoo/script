import { User } from "@/src/entities/models/user";


interface ProcessKeywordsRequest {
    googleKeywordTrackerToolId: string;
    keywords: string[];
    user: User;
}

class ProcessGoogleKeywordsUseCase {
    

    async execute({ googleKeywordTrackerToolId, keywords, user }: ProcessKeywordsRequest){
        const keywordTrackerTool = 
    }
}