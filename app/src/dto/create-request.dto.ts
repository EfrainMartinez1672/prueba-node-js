// app/src/dto/create-request.dto.ts

import { RequestStatus } from "../models/request.model";

/**
 * DTO - Medicine Request Creation
 *
 * ---
 * This DTO represents the necessary information required to request medical supplies.
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
 * Data Transfer Object for creating a supply request from a clinic.
 *
 * @property {number} clinicId - Foreign Key identifier of the requesting clinic.
 * @property {number} medicineId - Foreign Key identifier of the requested medicine.
 * @property {number} warehouseId - Foreign Key identifier of the supplying warehouse.
 * @property {number} quantity - Number of units requested.
 *
 * @example
 * const dto: CreateRequestDto = {
 *   clinicId: 1,
 *   medicineId: 10,
 *   warehouseId: 2,
 *   quantity: 50
 * };
 */
export interface CreateRequestDto {
    clinicId: number;

    medicineId: number;

    warehouseId: number;

    quantity: number;
}

/**
 * Data Transfer Object for updating the status of a medicine request.
 *
 * @property {RequestStatus} status - Target status string ('approved', 'rejected', 'delivered', 'pending').
 *
 * @example
 * const dto: UpdateRequestStatusDto = {
 *   status: "approved"
 * };
 */
export interface UpdateRequestStatusDto {
    status: RequestStatus;
}
