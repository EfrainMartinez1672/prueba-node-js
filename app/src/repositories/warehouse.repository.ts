// app/src/repositories/warehouse.repository.ts

import Warehouse, { WarehouseCreationAttributes } from "../models/warehouse.model";
import { IWarehouseRepository } from "./interfaces/warehouse.repository.interface";

/**
 * ============================================================================
 * Warehouse Repository
 * ============================================================================
 *
 * Encapsulates all direct database access logic for the `Warehouse` entity using Sequelize.
 *
 * Architecture:
 * WarehouseService -> WarehouseRepository -> Sequelize ORM -> PostgreSQL
 * ============================================================================
 */
class WarehouseRepository implements IWarehouseRepository {
    /**
     * Inserts a new warehouse record.
     *
     * @async
     * @param {WarehouseCreationAttributes} data - Creation payload for warehouse.
     * @returns {Promise<Warehouse>} Created warehouse record.
     */
    async create(data: WarehouseCreationAttributes): Promise<Warehouse> {
        return await Warehouse.create({ ...data, status: "active" });
    }

    /**
     * Fetches all active warehouses.
     *
     * @async
     * @returns {Promise<Warehouse[]>} List of active warehouses.
     */
    async findAll(): Promise<Warehouse[]> {
        return await Warehouse.findAll({ where: { status: "active" } });
    }

    /**
     * Finds an active warehouse by ID.
     *
     * @async
     * @param {number} id - Warehouse primary key.
     * @returns {Promise<Warehouse | null>} Found warehouse or null.
     */
    async findById(id: number): Promise<Warehouse | null> {
        const warehouse = await Warehouse.findByPk(id);
        if (!warehouse || warehouse.status === "deleted") {
            return null;
        }
        return warehouse;
    }

    /**
     * Modifies warehouse record fields.
     *
     * @async
     * @param {number} id - Warehouse primary key.
     * @param {Partial<WarehouseCreationAttributes>} data - Modified attributes.
     * @returns {Promise<Warehouse | null>} Updated instance or null.
     */
    async update(id: number, data: Partial<WarehouseCreationAttributes>): Promise<Warehouse | null> {
        const warehouse = await this.findById(id);
        if (!warehouse) {
            return null;
        }
        return await warehouse.update(data);
    }

    /**
     * Soft-deletes a warehouse entry.
     *
     * @async
     * @param {number} id - Warehouse primary key.
     * @returns {Promise<boolean>} True if successful.
     */
    async delete(id: number): Promise<boolean> {
        const warehouse = await this.findById(id);
        if (!warehouse) {
            return false;
        }
        await warehouse.update({ status: "deleted" });
        return true;
    }
}

export default new WarehouseRepository();
