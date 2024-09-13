
export interface IGoogleKeywordTrackerRepository {
    insert(inputSchema: any): Promise<any>;
    update(updateSchema: any): Promise<any>;
    delete(id: string): Promise<any>;

    findById(id: string): Promise<any>;
}