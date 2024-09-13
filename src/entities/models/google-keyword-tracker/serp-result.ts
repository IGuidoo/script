import { z } from "zod";

export const selectGoogleKeywordTrackerSerpResultCoreSchema = z.object({
    id: z.string(),
    keywordId: z.string(),
    position: z.number(),
    url: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    createdAt: z.date(),
})

export type GoogleKeywordTrackerSerpResult = z.infer<typeof selectGoogleKeywordTrackerSerpResultCoreSchema>;