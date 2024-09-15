import { getInjection } from "../../di/container";
import { db } from "../db";

import { GoogleKeywordTrackerResult } from "../../entities/models/google-keyword-tracker/result";
import { GoogleKeywordTrackerStatsInsert } from "../../entities/models/google-keyword-tracker/stats";

import { getDayOfTheWeek } from "../../utils/data.utils";
import { SerpResultMapper } from "../../interface-adapters/mappers/serp-result.mapper";

const BATCH_SIZE = 99;

async function processGoogleKeywordsCron() {
  console.log("Processing google keywords cron");
  const googleKeywordTrackerRepository = getInjection('IGoogleKeywordTrackerRepository');
  const usersRespository = getInjection('IUsersRepository');
  const websiteRepository = getInjection('IWebsiteRepository');
  const processGoogleKeywordsService = getInjection('IProcessGoogleKeywordsService');

  // get all google keyword trackers with competitors
  const googleKeywordTrackerTool = await googleKeywordTrackerRepository.findAllWithCompetitorsWebsiteAndLocation();
  
  const currentDay = getDayOfTheWeek(new Date());
  try {
    for (const tool of googleKeywordTrackerTool) {
      console.log('🟡 Processing tool', tool.id);
      // Check if google keyword tracker is active
      if (tool.status !== 'ACTIVE') {
        console.log('🟠 Google keyword tracker is not active');
        continue;
      }
  
      // Check if google keyword tracker needs processing today
      if (!tool.refresh.includes(currentDay)) {
        console.log('🟠 Google keyword tracker does not need processing today');
        continue;
      }
  
      const website = await websiteRepository.getById(tool.websiteId);
      if (!website?.userId) {
        console.log('🔴 Website not found');
        continue;
      }
  
      // get all keywords for tool
      const keywords = await googleKeywordTrackerRepository.findKeywordsByToolId(tool.id);
  
      // check if user has enough credits
      const user = await usersRespository.getById(website?.userId);
      if (!user) {
        console.log('🔴 User not found');
        continue;
      }
      if (user.credits < keywords.length) {
        console.log('🔴 Not enough credits');
        continue;
      }
  
  
      // process keywords in batches
      const usersSerpResults = [];
  
      for (let i = 0; i < keywords.length; i += BATCH_SIZE) {
        const batch = keywords.slice(i, i + BATCH_SIZE);
        try {
          usersSerpResults.push(await processGoogleKeywordsService.execute(tool, batch));
        } catch (error) {
          console.error(`🔴 Error processing batch: ${batch}:`, error);
          continue;
        }
      }
  
      const results = usersSerpResults.flat();
      // get previous result for keyword ids
      const keywordIds = keywords.map((keyword) => keyword.id);
      const previousResults = await googleKeywordTrackerRepository.findLatestResultsByKeywordIds(keywordIds);
  
      // compare results & create new userSerpResult
      const newResults = results.map((result) => {
        const previousResult = previousResults.find((previousResult) => previousResult.keywordId === result.keywordId);
  
        return SerpResultMapper.toUpdatedUserSerpResultInsertDTO(result, previousResult);
      });
  
  
      // insert new userSerpResult
      const res = await processGoogleKeywordsService.insertUserResult(newResults);
      if (!res) {
        console.log('🔴 Failed to insert user results');
        continue;
      }
  
      // deduct credits
      await usersRespository.deductCredits(user.id, results.length);
  
      // calculate campaign stats for this tool
      const stats = generateStats(res, tool.id);
  
      // insert campaign stats
      await processGoogleKeywordsService.insertStats(stats);
  
      console.log('🟢 Processed google keywords for tool', tool.id);
    }
  } catch (error) {
    console.error("🔴 Error processing google keywords", error);
  }
}


function generateStats(results: GoogleKeywordTrackerResult[], toolId: string) {
 let stats: GoogleKeywordTrackerStatsInsert = {
    googleKeywordTrackerToolId: toolId,
    improved: 0,
    worsened: 0,
    total: 0,
    topThree: 0,
    topTen: 0,
    topHundred: 0,
    noChange: 0,
    notFound: 0,
    averagePosition: 0,
  };

  for (const result of results) {
    // improved
    if (result.latestChange && result.latestChange > 0) {
      stats.improved += 1;
    }

    // worsened
    if (result.latestChange && result.latestChange < 0) {
      stats.worsened += 1;
    }

    // total
    stats.total += 1;

    // topThree
    if (result.position && result.position <= 3) {
      stats.topThree += 1;
    }

    // topTen
    if (result.position && result.position <= 10) {
      stats.topTen += 1;
    }

    // topHundred
    if (result.position && result.position <= 100) {
      stats.topHundred += 1;
    }

    // noChange
    if (result.latestChange === 0) {
      stats.noChange += 1;
    }

    // notFound
    if (result.position === null) {
      stats.notFound += 1;
    }

    // When position
    if (result.position) {
      stats.averagePosition += result.position;
    }
  }

  stats.averagePosition = stats.averagePosition / stats.total;

  return stats;
}


processGoogleKeywordsCron()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    console.log("Disconnecting from database");
    await db.$disconnect();
  });

  