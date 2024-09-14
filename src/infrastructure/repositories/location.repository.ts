import { injectable } from "inversify";

import { ILocationRepository } from "../../application/repositories/location.repository.interface";
import {
  Location,
  LocationInsert,
  LocationUpdate,
} from "../../entities/models/location";
import { DatabaseOperationError } from "../../entities/errors/common";
import { db } from "../db";

@injectable()
export class LocationRepository implements ILocationRepository {
  async create(location: LocationInsert): Promise<Location> {
    try {
      const created = await db.location.create({
        data: {
          ...location,
        },
      });

      if (created) {
        return created;
      } else {
        throw new DatabaseOperationError("Location not created");
      }
    } catch (error) {
      throw error;
    }
  }

  async update(location: LocationUpdate): Promise<Location> {
    try {
      const updated = await db.location.update({
        where: {
          id: location.id,
        },
        data: {
          ...location,
        },
      });

      if (updated) {
        return updated;
      } else {
        throw new DatabaseOperationError("Location not updated");
      }
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<Location> {
    try {
      const deleted = await db.location.delete({
        where: {
          id,
        },
      });

      if (deleted) {
        return deleted;
      } else {
        throw new DatabaseOperationError("Location not deleted");
      }
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string): Promise<Location | null> {
    try {
      const location = await db.location.findUnique({
        where: {
          id,
        },
      });

      return location;
    } catch (error) {
      throw error;
    }
  }
}
