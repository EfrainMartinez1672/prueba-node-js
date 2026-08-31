// app/src/services/medicine.service.ts

import { CreateMedicineDto } from "../dto/create-medicine.dto";
import Medicine, { MedicineCreationAttributes } from "../models/medicine.model";
import medicineRepository from "../repositories/medicine.repository";
import { IMedicineService } from "./interfaces/medicine.service.interface";

/**
 * ============================================================================
 * Medicine Service
 * ============================================================================
 *
 * Controls domain rules related to pharmaceutical stock and catalog items.
 *
 * Business Rules:
 *  - Initial or updated stock levels cannot be negative.
 *  - Verifies entity existence before applying inventory updates.
 * ============================================================================
 */
class MedicineService implements IMedicineService {
    /**
     * Registers a new medicine into system inventory after checking stock bounds.
     *
     * @async
     * @param {CreateMedicineDto} dto - Medicine attributes.
     * @returns {Promise<Medicine>} Created medicine record.
     * @throws {Error} If the stock parameter is negative.
     */
    async create(dto: CreateMedicineDto): Promise<Medicine> {
        if (dto.stock < 0) {
            throw new Error("Initial stock quantity cannot be negative.");
        }

        return await medicineRepository.create(dto as MedicineCreationAttributes);
    }

    /**
     * Retrieves all available active medicines.
     *
     * @async
     * @returns {Promise<Medicine[]>} List of active medicines.
     */
    async findAll(): Promise<Medicine[]> {
        return await medicineRepository.findAll();
    }

    /**
     * Finds a medicine entry by ID.
     *
     * @async
     * @param {number} id - Medicine ID.
     * @returns {Promise<Medicine | null>} Found medicine or null.
     */
    async findById(id: number): Promise<Medicine | null> {
        return await medicineRepository.findById(id);
    }

    /**
     * Updates medicine details or adjusts current stock level.
     *
     * @async
     * @param {number} id - Medicine ID.
     * @param {Partial<CreateMedicineDto>} dto - Fields to update.
     * @returns {Promise<Medicine | null>} Updated medicine instance or null.
     * @throws {Error} If updated stock value is negative.
     */
    async update(id: number, dto: Partial<CreateMedicineDto>): Promise<Medicine | null> {
        if (dto.stock !== undefined && dto.stock < 0) {
            throw new Error("Updated stock value cannot be negative.");
        }

        const medicine = await medicineRepository.findById(id);
        if (!medicine) {
            return null;
        }

        return await medicineRepository.update(id, dto as Partial<MedicineCreationAttributes>);
    }

    /**
     * Soft-deletes a medicine entry from the active catalog.
     *
     * @async
     * @param {number} id - Medicine ID.
     * @returns {Promise<boolean>} True if deletion succeeded.
     */
    async delete(id: number): Promise<boolean> {
        const medicine = await medicineRepository.findById(id);
        if (!medicine) {
            return false;
        }

        return await medicineRepository.delete(id);
    }
}

export default new MedicineService();
