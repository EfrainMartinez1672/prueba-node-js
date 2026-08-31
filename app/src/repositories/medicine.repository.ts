// app/src/repositories/medicine.repository.ts

import Medicine, { MedicineCreationAttributes } from "../models/medicine.model";
import { IMedicineRepository } from "./interfaces/medicine.repository.interface";

/**
 * ============================================================================
 * Medicine Repository
 * ============================================================================
 *
 * Encapsulates all direct database access logic for the `Medicine` entity using Sequelize.
 *
 * Architecture:
 * MedicineService -> MedicineRepository -> Sequelize ORM -> PostgreSQL
 * ============================================================================
 */
class MedicineRepository implements IMedicineRepository {
    /**
     * Inserts a new medicine entry into inventory.
     *
     * @async
     * @param {MedicineCreationAttributes} data - Medicine creation details.
     * @returns {Promise<Medicine>} Created medicine instance.
     */
    async create(data: MedicineCreationAttributes): Promise<Medicine> {
        return await Medicine.create({ ...data, status: "active" });
    }

    /**
     * Retrieves all active medicine items.
     *
     * @async
     * @returns {Promise<Medicine[]>} List of active medicines.
     */
    async findAll(): Promise<Medicine[]> {
        return await Medicine.findAll({ where: { status: "active" } });
    }

    /**
     * Finds an active medicine item by ID.
     *
     * @async
     * @param {number} id - Medicine primary key.
     * @returns {Promise<Medicine | null>} Medicine entity or null.
     */
    async findById(id: number): Promise<Medicine | null> {
        const medicine = await Medicine.findByPk(id);
        if (!medicine || medicine.status === "deleted") {
            return null;
        }
        return medicine;
    }

    /**
     * Updates medicine stock levels or descriptive fields.
     *
     * @async
     * @param {number} id - Medicine primary key.
     * @param {Partial<MedicineCreationAttributes>} data - Fields to update.
     * @returns {Promise<Medicine | null>} Updated instance or null.
     */
    async update(id: number, data: Partial<MedicineCreationAttributes>): Promise<Medicine | null> {
        const medicine = await this.findById(id);
        if (!medicine) {
            return null;
        }
        return await medicine.update(data);
    }

    /**
     * Soft-deletes a medicine entry.
     *
     * @async
     * @param {number} id - Medicine primary key.
     * @returns {Promise<boolean>} True if soft deletion was applied.
     */
    async delete(id: number): Promise<boolean> {
        const medicine = await this.findById(id);
        if (!medicine) {
            return false;
        }
        await medicine.update({ status: "deleted" });
        return true;
    }
}

export default new MedicineRepository();
