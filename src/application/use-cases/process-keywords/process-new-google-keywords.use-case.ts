import { getInjection } from "../../../di/container";
import { User } from "../../../entities/models/user";
import { NotFoundError } from "../../../entities/errors/common";
import { ProcessGoogleKeywordsUseCase } from "../process-google-keywords.use-case";


export async function processNewGoogleKeywordUseCase( 
    googleKeywordTrackerToolId: string,
    keywords: string[],
    user: User
) {
    const googleKeywordTrackerRepository = getInjection('IGoogleKeywordTrackerRepository');
    const websiteRepository = getInjection('IWebsiteRepository');

    //Check if user has enough credits
    if (user.credits < keywords.length) {
        throw new Error('Not enough credits');
    }

    // Create keywords
    const gooogleKeywordTrackerKeywords = await googleKeywordTrackerRepository.addKeywords(googleKeywordTrackerToolId, keywords);

    const googleKeywordTrackerTool = await googleKeywordTrackerRepository.findByIdWithCompetitors(googleKeywordTrackerToolId);
    if (!googleKeywordTrackerTool) {
        throw new NotFoundError('Google keyword tracker tool not found');
    }

    const website = await websiteRepository.getById(googleKeywordTrackerTool.websiteId);
    if (!website) {
        throw new NotFoundError('Website not found');
    }

    const serperApi = getInjection('ISerperApi');
    const processGoogleKeywordsUseCase = new ProcessGoogleKeywordsUseCase(serperApi);

    const userResults = await processGoogleKeywordsUseCase.execute({
        website,
        googleKeywordTrackerTool,
        keywords: gooogleKeywordTrackerKeywords
    });

    // Deduct credits from user

    console.log(userResults);
}