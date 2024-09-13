import { z } from "zod";

export const selectGoogleKeywordTrackerCompetitorCoreSchema = z.object({
    id: z.string(),
    googleSearchCampaignId: z.string(),
    domainUrl: z.string(),
    createdAt: z.date(),
    // results: z.array(selectGoogleKeywordTrackerCompetitorResultSchema)
})

export const googleKeywordTrackerCompetitorSchema = selectGoogleKeywordTrackerCompetitorCoreSchema.pick({
    id: true,
    googleSearchCampaignId: true,
    domainUrl: true,
    createdAt: true,
});


export type GoogleKeywordTrackerCompetitor = z.infer<typeof googleKeywordTrackerCompetitorSchema>;