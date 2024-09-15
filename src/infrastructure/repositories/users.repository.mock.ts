import { IUsersRepository } from "../../application/repositories/users.repository.interface";
import { User } from "../../entities/models/user";
import { injectable } from "inversify";


@injectable()
export class MockUsersRepository implements IUsersRepository {
  private _users: User[];
  private _initialized: Promise<void>;

  constructor() {
    this._users = [];
    this._initialized = this.initializeUsers();
  }

  private async initializeUsers() {
    const users: User[] = [
      {
        id: "1",
        name: 'Test user 1',
        email: "test1@test.nl",
        emailVerified: new Date(),
        image: null,
        password: "123456",
        role: "USER",
        loginProvider: 'credentials',
        createdAt: new Date(),
        updatedAt: new Date(),
        credits: 10
      },
      {
        id: "2",
        name: 'Test admin 2',
        email: "test2@test.nl",
        emailVerified: new Date(),
        image: null,
        password: "123456",
        role: "ADMIN",
        loginProvider: 'credentials',
        createdAt: new Date(),
        updatedAt: new Date(),
        credits: 10
      },
      {
        id: 'cm0tpkvvy0000qn064e5btdf5',
        name: 'test',
        email: 'test@user1.nl',
        emailVerified: new Date('2024-09-08T15:09:06.848Z'),
        image: null,
        password: '$2a$10$pp2ugNXWIA0P0vlwyL7z8uryWuR9F1CPYbQhH.jff2iHiGc8Hcq1O',
        role: 'ADMIN',
        loginProvider: 'credentials',
        createdAt: new Date('2024-09-08T15:08:14.063Z'),
        updatedAt: new Date('2024-09-12T21:09:40.414Z'),
        credits: 10
      }
    ];
  }

  async create(email: string, password: string, name: string): Promise<User> {
    await this._initialized;
    const user: User = {
      id: (this._users.length + 1).toString(),
      name,
      email,
      emailVerified: new Date(),
      image: null,
      password: 'password',
      role: "USER",
      loginProvider: 'credentials',
      createdAt: new Date(),
      updatedAt: new Date(),
      credits: 0
    };

    this._users.push(user);

    return user;
  }

  async deductCredits(userId: string, credits: number): Promise<void> {
    await this._initialized;
    const user = this._users.find(user => user.id === userId);
    if (user) {
      user.credits -= credits;
    } else {
      throw new Error('User not found');
    }
  }

  async getByEmail(email: string): Promise<User | null> {
    await this._initialized;
    return this._users.find(user => user.email === email) || null;
  }

  async getById(id: string): Promise<User | null> {
    await this._initialized;
    return this._users.find(user => user.id === id) || null;
  }

  async updateEmailVerified(id: string, email: string): Promise<void> {
    await this._initialized;
    const user = this._users.find(user => user.id === id);
    if (user) {
      user.emailVerified = new Date();
      user.email = email;
    }
  }

  async updatePassword(id: string, password: string): Promise<void> {
    await this._initialized;
    const user = this._users.find(user => user.id === id);
    if (user) {
      user.password = password;
    }
  }

  async update(data: any, userId: string): Promise<User> {
    await this._initialized;
    const user = this._users.find(user => user.id === userId);
    if (user) {
      return Object.assign(user, data);
    }
    throw new Error('User not found');
  }
}