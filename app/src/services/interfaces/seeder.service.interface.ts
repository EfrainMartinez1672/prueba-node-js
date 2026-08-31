// app/src/services/interfaces/seeder.service.interface.ts

import { SeedDataPayload, SeederSummary } from "../../dto/seed-data.dto";

/**
 * Interface defining contract operations for Seeder Service.
 */
export interface ISeederService {
    seedDatabase(data: SeedDataPayload): Promise<SeederSummary>;
}