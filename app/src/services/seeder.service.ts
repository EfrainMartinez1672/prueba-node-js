// app/src/services/seeder.service.ts

import sequelize from "../config/database";
import { SeedDataPayload, SeederSummary } from "../dto/seed-data.dto";
import Clinic, { ClinicCreationAttributes } from "../models/clinic.model";
import Medicine, { MedicineCreationAttributes } from "../models/medicine.model";
import User, { UserCreationAttributes } from "../models/user.model";
import Warehouse, { WarehouseCreationAttributes } from "../models/warehouse.model";
import { ISeederService } from "./interfaces/seeder.service.interface";

/**
 * Service dedicated to seeding database tables from structured payloads.
 */
class SeederService implements ISeederService {
    /**
     * Seeds the database within an isolated database transaction.
     *
     * @async
     * @param {SeedDataPayload} data - Validated payload containing entity arrays.
     * @returns {Promise<SeederSummary>} Count of created records per entity.
     * @throws {Error} If the database transaction fails.
     */
    async seedDatabase(data: SeedDataPayload): Promise<SeederSummary> {
        const transaction = await sequelize.transaction();

        try {
            const summary: SeederSummary = {
                users: 0,
                clinics: 0,
                warehouses: 0,
                medicines: 0,
            };

            if (data.users && data.users.length > 0) {
                const createdUsers = await User.bulkCreate(
                    data.users as UserCreationAttributes[],
                    { transaction }
                );
                summary.users = createdUsers.length;
            }

            if (data.clinics && data.clinics.length > 0) {
                const createdClinics = await Clinic.bulkCreate(
                    data.clinics as ClinicCreationAttributes[],
                    { transaction }
                );
                summary.clinics = createdClinics.length;
            }

            if (data.warehouses && data.warehouses.length > 0) {
                const createdWarehouses = await Warehouse.bulkCreate(
                    data.warehouses as WarehouseCreationAttributes[],
                    { transaction }
                );
                summary.warehouses = createdWarehouses.length;
            }

            if (data.medicines && data.medicines.length > 0) {
                const createdMedicines = await Medicine.bulkCreate(
                    data.medicines as MedicineCreationAttributes[],
                    { transaction }
                );
                summary.medicines = createdMedicines.length;
            }

            await transaction.commit();
            return summary;
        } catch (error) {
            await transaction.rollback();
            throw new Error(`Seeder Transaction Failed: ${(error as Error).message}`);
        }
    }
}

export default new SeederService();