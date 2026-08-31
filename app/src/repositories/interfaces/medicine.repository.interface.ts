// app/src/repositories/interfaces/medicine.repository.interface.ts

import Medicine, { MedicineCreationAttributes } from "../../models/medicine.model";

/**
 * Interface defining contract operations for Medicine Repository.
 */
export interface IMedicineRepository {
    create(data: MedicineCreationAttributes): Promise<Medicine>;
    findAll(): Promise<Medicine[]>;
    findById(id: number): Promise<Medicine | null>;
    update(id: number, data: Partial<MedicineCreationAttributes>): Promise<Medicine | null>;
    delete(id: number): Promise<boolean>;
}
