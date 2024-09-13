import { z } from "zod";

export type DayOfWeek = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";

export const DAYS_OF_WEEK: {value: DayOfWeek; label: string}[] = [
    { value: "MONDAY", label: "Monday" },
    { value: "TUESDAY", label: "Tuesday" },
    { value: "WEDNESDAY", label: "Wednesday" },
    { value: "THURSDAY", label: "Thursday" },
    { value: "FRIDAY", label: "Friday" },
    { value: "SATURDAY", label: "Saturday" },
    { value: "SUNDAY", label: "Sunday" },
  ];

export const selectGoogleKeywordTrackerCoreSchema = z.object({
    id: z.string(),
    locationId: z.string(),
    status: z.enum(['ACTIVE', 'PAUSED', 'PENDING' ]),
    refresh: z.array(z.enum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'])),
    createdAt: z.date(),
    updatedAt: z.date(),

    // keywords: z.array(selectGoogleKeywordTrackerKeywordSchema).nullable(),
    // stats: z.array(selectGoogleKeywordTrackerStatsSchema).nullable(),
    // competitors: z.array(selectGoogleKeywordTrackerCompetitorSchema).nullable(),
})

export const googleKeywordTrackerSchema = selectGoogleKeywordTrackerCoreSchema.pick({
    id: true,
    locationId: true,
    status: true,
    refresh: true,
    createdAt: true,
    updatedAt: true,
});

export type GoogleKeywordTracker = z.infer<typeof selectGoogleKeywordTrackerCoreSchema>;


// Fort-end form input schema
export const formInputCreateGoogleKeywordTrackerSchema = selectGoogleKeywordTrackerCoreSchema.extend({
    competitors: z.array(z.string()).optional(),
    keywords: z.string().optional(),
}).pick({
    locationId: true,
    refresh: true,
    competitors: true,
    keywords: true,
});
