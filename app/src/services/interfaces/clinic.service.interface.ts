// app/src/services/interfaces/clinic.service.interface.ts

import { CreateClinicDto } from "../../dto/create-clinic.dto";
import Clinic from "../../models/clinic.model";

/**
 * Interface defining domain business operations for Clinic Service.
 */
export interface IClinicService {
    create(dto: CreateClinicDto): Promise<Clinic>;
    findAll(): Promise<Clinic[]>;
    findById(id: number): Promise<Clinic | null>;
    update(id: number, dto: Partial<CreateClinicDto>): Promise<Clinic | null>;
    delete(id: number): Promise<boolean>;
}
