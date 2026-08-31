// app/src/dto/create-warehouse.dto.ts

/**
 * DTO - Warehouse Creation
 *
 * ---
 * This DTO represents the necessary information required to create a new warehouse.
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
 * Data Transfer Object for creating a warehouse facility.
 *
 * @property {string} name - Name of the warehouse facility.
 * @property {string} location - Physical location or address of the warehouse.
 *
 * @example
 * const dto: CreateWarehouseDto = {
 *   name: "Central Logistics Hub",
 *   location: "Sector 4 Industrial Park, Bldg B"
 * };
 */
export interface CreateWarehouseDto {
    name: string;

    location: string;
}

/**
 * Data Transfer Object for updating an existing warehouse facility.
 */
export type UpdateWarehouseDto = Partial<CreateWarehouseDto>;
