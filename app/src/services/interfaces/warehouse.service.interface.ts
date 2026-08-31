// app/src/services/interfaces/warehouse.service.interface.ts

import { CreateWarehouseDto } from "../../dto/create-warehouse.dto";
import Warehouse from "../../models/warehouse.model";

/**
 * Interface defining domain business operations for Warehouse Service.
 */
export interface IWarehouseService {
    create(dto: CreateWarehouseDto): Promise<Warehouse>;
    findAll(): Promise<Warehouse[]>;
    findById(id: number): Promise<Warehouse | null>;
    update(id: number, dto: Partial<CreateWarehouseDto>): Promise<Warehouse | null>;
    delete(id: number): Promise<boolean>;
}
