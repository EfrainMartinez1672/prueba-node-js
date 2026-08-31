// app/src/services/clinic.service.ts

import { CreateClinicDto } from "../dto/create-clinic.dto";
import Clinic, { ClinicCreationAttributes } from "../models/clinic.model";
import clinicRepository from "../repositories/clinic.repository";
import { IClinicService } from "./interfaces/clinic.service.interface";

/**
 * ============================================================================
 * Clinic Service
 * ============================================================================
 *
 * Contains all business logic related to the `Clinic` entity.
 *
 * Responsibilities:
 *  - Validate business rules (e.g., NIT uniqueness).
 *  - Coordinate operations with the clinic repository.
 *  - Keep the controller decoupled from domain logic.
 *
 * Architecture:
 * ClinicController -> ClinicService -> ClinicRepository -> Sequelize -> PostgreSQL
 * ============================================================================
 */
class ClinicService implements IClinicService {
    /**
     * Registers a new clinic in the system after validating NIT uniqueness.
     *
     * @async
     * @param {CreateClinicDto} dto - Payload data to create a clinic.
     * @returns {Promise<Clinic>} Resolves with the created clinic instance.
     * @throws {Error} If the provided NIT is already registered.
     *
     * @example
     * const newClinic = await clinicService.create({
     *   name: "Central Health Clinic",
     *   nit: "900123456-1",
     *   manager: "Dr. Sarah Connor",
     *   address: "123 Healthcare Blvd"
     * });
     */
    async create(dto: CreateClinicDto): Promise<Clinic> {
        const existingClinic = await clinicRepository.findByNit(dto.nit);
        if (existingClinic) {
            throw new Error("A clinic with this NIT is already registered.");
        }

        return await clinicRepository.create(dto as ClinicCreationAttributes);
    }

    /**
     * Retrieves all active clinic records.
     *
     * @async
     * @returns {Promise<Clinic[]>} Array of registered clinics.
     */
    async findAll(): Promise<Clinic[]> {
        return await clinicRepository.findAll();
    }

    /**
     * Finds a single clinic by its unique identifier.
     *
     * @async
     * @param {number} id - Unique clinic identifier.
     * @returns {Promise<Clinic | null>} The clinic instance or null if not found.
     */
    async findById(id: number): Promise<Clinic | null> {
        return await clinicRepository.findById(id);
    }

    /**
     * Updates an existing clinic record.
     *
     * @async
     * @param {number} id - Clinic identifier.
     * @param {Partial<CreateClinicDto>} dto - Fields to update.
     * @returns {Promise<Clinic | null>} Updated clinic instance or null if non-existent.
     */
    async update(id: number, dto: Partial<CreateClinicDto>): Promise<Clinic | null> {
        const clinic = await clinicRepository.findById(id);
        if (!clinic) {
            return null;
        }

        return await clinicRepository.update(id, dto as Partial<ClinicCreationAttributes>);
    }

    /**
     * Performs a soft deletion on a clinic record.
     *
     * @async
     * @param {number} id - Clinic identifier.
     * @returns {Promise<boolean>} True if successfully marked as deleted.
     */
    async delete(id: number): Promise<boolean> {
        const clinic = await clinicRepository.findById(id);
        if (!clinic) {
            return false;
        }

        return await clinicRepository.delete(id);
    }
}

export default new ClinicService();
