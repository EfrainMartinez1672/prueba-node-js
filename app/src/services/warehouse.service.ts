// app/src/services/warehouse.service.ts

import { CreateWarehouseDto } from "../dto/create-warehouse.dto";
import Warehouse, { WarehouseCreationAttributes } from "../models/warehouse.model";
import warehouseRepository from "../repositories/warehouse.repository";
import { IWarehouseService } from "./interfaces/warehouse.service.interface";

/**
 * ============================================================================
 * Warehouse Service
 * ============================================================================
 *
 * Manages domain logic for warehouse operations and inventory locations.
 *
 * Responsibilities:
 *  - Handle entity creation and persistence through WarehouseRepository.
 *  - Enforce business validations regarding physical locations.
 *
 * Architecture:
 * WarehouseController -> WarehouseService -> WarehouseRepository -> Sequelize
 * ============================================================================
 */
class WarehouseService implements IWarehouseService {
    /**
     * Creates a new warehouse entry.
     *
     * @async
     * @param {CreateWarehouseDto} dto - Warehouse payload.
     * @returns {Promise<Warehouse>} Created warehouse record.
     */
    async create(dto: CreateWarehouseDto): Promise<Warehouse> {
        return await warehouseRepository.create(dto as WarehouseCreationAttributes);
    }

    /**
     * Retrieves all active warehouses.
     *
     * @async
     * @returns {Promise<Warehouse[]>} Collection of active warehouses.
     */
    async findAll(): Promise<Warehouse[]> {
        return await warehouseRepository.findAll();
    }

    /**
     * Retrieves a warehouse by its primary key.
     *
     * @async
     * @param {number} id - Warehouse ID.
     * @returns {Promise<Warehouse | null>} Found warehouse or null.
     */
    async findById(id: number): Promise<Warehouse | null> {
        return await warehouseRepository.findById(id);
    }

    /**
     * Updates warehouse attributes by ID.
     *
     * @async
     * @param {number} id - Warehouse ID.
     * @param {Partial<CreateWarehouseDto>} dto - Updated fields.
     * @returns {Promise<Warehouse | null>} Updated record or null.
     */
    async update(id: number, dto: Partial<CreateWarehouseDto>): Promise<Warehouse | null> {
        const warehouse = await warehouseRepository.findById(id);
        if (!warehouse) {
            return null;
        }

        return await warehouseRepository.update(id, dto as Partial<WarehouseCreationAttributes>);
    }

    /**
     * Performs a soft-delete operation on a warehouse.
     *
     * @async
     * @param {number} id - Warehouse ID.
     * @returns {Promise<boolean>} Success status of deletion.
     */
    async delete(id: number): Promise<boolean> {
        const warehouse = await warehouseRepository.findById(id);
        if (!warehouse) {
            return false;
        }

        return await warehouseRepository.delete(id);
    }
}

export default new WarehouseService();
