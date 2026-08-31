// app/src/repositories/interfaces/warehouse.repository.interface.ts

import Warehouse, { WarehouseCreationAttributes } from "../../models/warehouse.model";

/**
 * Interface defining contract operations for Warehouse Repository.
 */
export interface IWarehouseRepository {
    create(data: WarehouseCreationAttributes): Promise<Warehouse>;
    findAll(): Promise<Warehouse[]>;
    findById(id: number): Promise<Warehouse | null>;
    update(id: number, data: Partial<WarehouseCreationAttributes>): Promise<Warehouse | null>;
    delete(id: number): Promise<boolean>;
}
