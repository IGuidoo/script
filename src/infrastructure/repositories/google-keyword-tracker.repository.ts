import { IGoogleKeywordTrackerRepository } from "@/src/application/repositories/google-keyword-tracker.repository.interface";

export class GoogleKeywordTrackerRepository implements IGoogleKeywordTrackerRepository {

    async insert(inputSchema: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async update(updateSchema: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async delete(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }


    async findById(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
}