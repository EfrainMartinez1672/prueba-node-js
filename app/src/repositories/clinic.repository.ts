// app/src/repositories/clinic.repository.ts

import Clinic, { ClinicCreationAttributes } from "../models/clinic.model";
import { IClinicRepository } from "./interfaces/clinic.repository.interface";

/**
 * ============================================================================
 * Clinic Repository
 * ============================================================================
 *
 * Encapsulates all direct database access logic for the `Clinic` entity using Sequelize.
 *
 * Responsibilities:
 *  - Perform raw ORM operations (create, read, update, soft delete).
 *  - Hide persistence details from the service layer.
 *  - Filter queries by active status.
 *
 * Architecture:
 * ClinicService -> ClinicRepository -> Sequelize ORM -> PostgreSQL
 * ============================================================================
 */
class ClinicRepository implements IClinicRepository {
    /**
     * Persists a new clinic record in the database.
     *
     * @async
     * @param {ClinicCreationAttributes} data - Data required to create a clinic record.
     * @returns {Promise<Clinic>} Promisified Sequelize Clinic instance.
     */
    async create(data: ClinicCreationAttributes): Promise<Clinic> {
        return await Clinic.create({ ...data, status: "active" });
    }

    /**
     * Retrieves all active clinic records from the database.
     *
     * @async
     * @returns {Promise<Clinic[]>} Array of active clinics.
     */
    async findAll(): Promise<Clinic[]> {
        return await Clinic.findAll({ where: { status: "active" } });
    }

    /**
     * Finds an active clinic by primary key.
     *
     * @async
     * @param {number} id - Unique identifier of the clinic.
     * @returns {Promise<Clinic | null>} Clinic model instance or null if not found/deleted.
     */
    async findById(id: number): Promise<Clinic | null> {
        const clinic = await Clinic.findByPk(id);
        if (!clinic || clinic.status === "deleted") {
            return null;
        }
        return clinic;
    }

    /**
     * Finds an active clinic by NIT (Tax Identification Number).
     *
     * @async
     * @param {string} nit - Clinic NIT.
     * @returns {Promise<Clinic | null>} Clinic model instance or null if non-existent.
     */
    async findByNit(nit: string): Promise<Clinic | null> {
        const clinic = await Clinic.findOne({ where: { nit } });
        if (!clinic || clinic.status === "deleted") {
            return null;
        }
        return clinic;
    }

    /**
     * Updates an existing clinic record in the database.
     *
     * @async
     * @param {number} id - Unique identifier of the clinic.
     * @param {Partial<ClinicCreationAttributes>} data - Attributes to update.
     * @returns {Promise<Clinic | null>} Updated clinic instance or null if not found.
     */
    async update(id: number, data: Partial<ClinicCreationAttributes>): Promise<Clinic | null> {
        const clinic = await this.findById(id);
        if (!clinic) {
            return null;
        }
        return await clinic.update(data);
    }

    /**
     * Performs soft-deletion by updating clinic status to 'deleted'.
     *
     * @async
     * @param {number} id - Unique identifier of the clinic.
     * @returns {Promise<boolean>} True if record status was successfully updated.
     */
    async delete(id: number): Promise<boolean> {
        const clinic = await this.findById(id);
        if (!clinic) {
            return false;
        }
        await clinic.update({ status: "deleted" });
        return true;
    }
}

export default new ClinicRepository();
