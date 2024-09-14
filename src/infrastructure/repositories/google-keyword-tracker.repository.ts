import { injectable } from "inversify";
import { IGoogleKeywordTrackerRepository } from "../../application/repositories/google-keyword-tracker.repository.interface";
import { GoogleKeywordTracker, GoogleKeywordTrackerWithCompetitors, GoogleKeywordTrackerWithWebsite } from "../../entities/models/google-keyword-tracker";
import { db } from "../db";
import { GoogleKeywordTrackerKeyword } from "../../entities/models/google-keyword-tracker/keyword";

@injectable()
export class GoogleKeywordTrackerRepository
  implements IGoogleKeywordTrackerRepository
{
  async insert(inputSchema: any): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async update(updateSchema: any): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<GoogleKeywordTracker | null> {
    try {
      const googleKeywordTracker = await db.googleKeywordTrackerTool.findUnique(
        {
          where: {
            id,
          },
        }
      );

      return googleKeywordTracker;
    } catch (error) {
      throw error;
    }
  }

  async findByIdWithWebsite(id: string): Promise<GoogleKeywordTrackerWithWebsite | null> {
    try {
      const googleKeywordTracker = await db.googleKeywordTrackerTool.findUnique({
        where: {
          id,
        },
        include: {
          website: true,
        },
      });
      
      return googleKeywordTracker;
    } catch (error) {
      throw error;
    }
  }

  async findByIdWithCompetitors(id: string): Promise<GoogleKeywordTrackerWithCompetitors | null> {
    try {
      const googleKeywordTracker = await db.googleKeywordTrackerTool.findUnique({
        where: {
          id,
        },
        include: {
          competitors: true,
        },
      });

      return googleKeywordTracker;
    } catch (error) {
      throw error;
    }
  }
  
  async addKeywords(
    googleKeywordTrackerId: string,
    keywords: string[]
  ): Promise<GoogleKeywordTrackerKeyword[]> {
    try {
      const keywordObjects = keywords.map((keyword) => ({
        keyword,
        googleKeywordTrackerToolId: googleKeywordTrackerId,
      }));

      await db.googleKeywordTrackerKeyword.createMany({
        data: keywordObjects,
      });

      const createdKeywords = await db.googleKeywordTrackerKeyword.findMany({
        where: {
          googleKeywordTrackerToolId: googleKeywordTrackerId,
          keyword: {
            in: keywords,
          }
        },
      });

      return createdKeywords;
    } catch (error) {
      throw error;
    }
  }
}
