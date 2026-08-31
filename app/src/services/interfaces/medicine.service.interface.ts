// app/src/services/interfaces/medicine.service.interface.ts

import { CreateMedicineDto } from "../../dto/create-medicine.dto";
import Medicine from "../../models/medicine.model";

/**
 * Interface defining domain business operations for Medicine Service.
 */
export interface IMedicineService {
    create(dto: CreateMedicineDto): Promise<Medicine>;
    findAll(): Promise<Medicine[]>;
    findById(id: number): Promise<Medicine | null>;
    update(id: number, dto: Partial<CreateMedicineDto>): Promise<Medicine | null>;
    delete(id: number): Promise<boolean>;
}
