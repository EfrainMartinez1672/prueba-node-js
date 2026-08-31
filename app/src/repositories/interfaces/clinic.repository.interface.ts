// app/src/repositories/interfaces/clinic.repository.interface.ts

import Clinic, { ClinicCreationAttributes } from "../../models/clinic.model";

/**
 * Interface defining contract operations for Clinic Repository.
 */
export interface IClinicRepository {
    create(data: ClinicCreationAttributes): Promise<Clinic>;
    findAll(): Promise<Clinic[]>;
    findById(id: number): Promise<Clinic | null>;
    findByNit(nit: string): Promise<Clinic | null>;
    update(id: number, data: Partial<ClinicCreationAttributes>): Promise<Clinic | null>;
    delete(id: number): Promise<boolean>;
}
