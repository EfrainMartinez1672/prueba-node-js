import { ClinicCreationAttributes } from "../models/clinic.model";
import { MedicineCreationAttributes } from "../models/medicine.model";
import { UserCreationAttributes } from "../models/user.model";
import { WarehouseCreationAttributes } from "../models/warehouse.model";

/**
 * Interface representing the structured payload inside the JSON seed file.
 */
export interface SeedDataPayload {
    users?: UserCreationAttributes[];
    clinics?: ClinicCreationAttributes[];
    warehouses?: WarehouseCreationAttributes[];
    medicines?: MedicineCreationAttributes[];
}

/**
 * Interface representing the summary returned after a successful seed operation.
 */
export interface SeederSummary {
    users: number;
    clinics: number;
    warehouses: number;
    medicines: number;
}