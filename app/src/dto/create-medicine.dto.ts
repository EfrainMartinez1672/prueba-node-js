// app/src/dto/create-medicine.dto.ts

/**
 * DTO - Medicine Creation
 *
 * ---
 * This DTO represents the necessary information required to create a new medicine entry.
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
 * Data Transfer Object for adding a medicine to inventory.
 *
 * @property {string} name - Commercial or generic name of the medicine.
 * @property {string} [description] - Optional details or specifications of the drug.
 * @property {number} stock - Initial quantity available in inventory.
 *
 * @example
 * const dto: CreateMedicineDto = {
 *   name: "Amoxicillin 500mg",
 *   description: "Broad-spectrum antibiotic capsules",
 *   stock: 250
 * };
 */
export interface CreateMedicineDto {
    name: string;

    description?: string;

    stock: number;
}

/**
 * Data Transfer Object for updating an existing medicine entry.
 */
export type UpdateMedicineDto = Partial<CreateMedicineDto>;
