import { injectable } from "inversify";
import "reflect-metadata";
import { db } from "../../infrastructure/db";
import { Account, User } from "@prisma/client";

import { IUsersRepository } from "../../application/repositories/users.repository.interface";
import { DatabaseOperationError } from "../../entities/errors/common";

@injectable()
export class UsersRepository implements IUsersRepository {
  async create(email: string, password: string, name: string): Promise<User> {
    try {
      const user = await db.user.create({
        data: {
          name,
          email,
          password,
          loginProvider: "credentials",
        },
      });

      if (user) {
        return user;
      } else {
        throw new DatabaseOperationError("User not created");
      }
    } catch (error) {
      throw error;
    }
  }

  async deductCredits(userId: string, credits: number): Promise<void> {
    try {
      const user = await db.user.update({
        where: { id: userId },
        data: { credits: { decrement: credits } },
      });

    } catch (error) {
      throw error;
    }
  }

  async getByEmail(email: string): Promise<User | null> {
    try {
      const user = await db.user.findUnique({
        where: { email },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string): Promise<User | null> {
    try {
      const user = await db.user.findUnique({
        where: { id },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAccountById(id: string): Promise<Account | null> {
    try {
      const user = await db.account.findFirst({
        where: { userId: id },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateEmailVerified(id: string, email: string): Promise<void> {
    try {
      const res = await db.user.update({
        where: { id },
        data: { emailVerified: new Date(), email },
      });

      if (res) {
        return;
      } else {
        throw new DatabaseOperationError("User not found");
      }
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(id: string, password: string): Promise<void> {
    try {
      const res = await db.user.update({
        where: { id },
        data: { password },
      });

      if (res) {
        return;
      } else {
        throw new DatabaseOperationError("User not found");
      }
    } catch (error) {
      throw error;
    }
  }

  async update(data: any, userId: string): Promise<User> {
    try {
      const user = await db.user.update({
        where: { id: userId },
        data: { ...data },
      });

      if (user) {
        return user;
      } else {
        throw new DatabaseOperationError("User not found");
      }
    } catch (error) {
      throw error;
    }
  }
}
