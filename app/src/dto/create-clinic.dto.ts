// app/src/dto/create-clinic.dto.ts

/**
 * DTO - Clinic Creation
 *
 * ---
 * This DTO represents the necessary information required to create a new clinic.
 *
 * A DTO (Data Transfer Object) defines the data contract between the client
 * and the API, preventing direct exposure of the database model.
 *
 * It is used to:
 * - Standardize data received or sent through the API.
 * - Validate and type objects entering controllers.
 * - Prevent direct exposure of database models.
 */

/**
 * Data Transfer Object for creating a clinic entity.
 *
 * @property {string} name - Name of the medical clinic.
 * @property {string} nit - Unique Tax Identification Number (NIT).
 * @property {string} manager - Name of the clinic manager or administrator.
 * @property {string} address - Physical address of the clinic.
 *
 * @example
 * const dto: CreateClinicDto = {
 *   name: "Central Health Clinic",
 *   nit: "900123456-1",
 *   manager: "Dr. Sarah Connor",
 *   address: "123 Healthcare Blvd"
 * };
 */
export interface CreateClinicDto {
    name: string;

    nit: string;

    manager: string;

    address: string;
}

/**
 * Data Transfer Object for updating an existing clinic entity.
 */
export type UpdateClinicDto = Partial<CreateClinicDto>;
