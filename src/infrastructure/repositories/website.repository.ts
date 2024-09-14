import { injectable } from "inversify";
import { db } from "../db";

import {
  Website,
  WebsiteInsert,
  WebsiteUpdate,
  WebsiteWithLocation,
} from "../../entities/models/website";
import { DatabaseOperationError } from "../../entities/errors/common";

import { IWebsiteRepository } from "../../application/repositories/website.repository.interface";

@injectable()
export class WebsiteRepository implements IWebsiteRepository {
  async create(website: WebsiteInsert): Promise<Website> {
    try {
      const created = await db.website.create({
        data: {
          ...website,
        },
      });

      if (created) {
        return created;
      } else {
        throw new DatabaseOperationError("Website not created");
      }
    } catch (error) {
      throw error;
    }
  }

  async update(website: WebsiteUpdate): Promise<Website> {
    try {
      const updated = await db.website.update({
        where: {
          id: website.id,
        },
        data: {
          ...website,
        },
      });

      if (updated) {
        return updated;
      } else {
        throw new DatabaseOperationError("Website not updated");
      }
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<Website> {
    try {
      const deleted = await db.website.delete({
        where: {
          id,
        },
      });

      if (deleted) {
        return deleted;
      } else {
        throw new DatabaseOperationError("Website not deleted");
      }
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string): Promise<Website | null> {
    try {
      const website = await db.website.findUnique({
        where: { id },
      });

      return website;
    } catch (error) {
      throw error;
    }
  }

  async getByUserId(userId: string): Promise<Website[] | null> {
    try {
      const user = await db.user.findUnique({
        where: { id: userId },
        include: {
          website: true,
        },
      });

      return user?.website ?? null;
    } catch (error) {
      throw error;
    }
  }

  async getByIdWithLocation(id: string): Promise<WebsiteWithLocation | null> {
    try {
      const website = await db.website.findUnique({
        where: { id },
        include: {
          location: true,
        },
      });

      return website;
    } catch (error) {
      throw error;
    }
  }

  async getByUserIdWithLocation(
    userId: string
  ): Promise<WebsiteWithLocation[] | null> {
    try {
      const user = await db.user.findUnique({
        where: { id: userId },
        include: {
          website: {
            include: {
              location: true,
            },
          },
        },
      });

      return user?.website ?? null;
    } catch (error) {
      throw error;
    }
  }
}
