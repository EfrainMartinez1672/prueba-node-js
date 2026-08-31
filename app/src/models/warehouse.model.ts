// app/src/models/warehouse.model.ts

/**
 * Warehouse Model
 * ---------------
 * This file defines the Sequelize `Warehouse` model, which represents
 * the `warehouses` table in the database.
 *
 * A warehouse is a centralized facility where available medical supplies are stored.
 */

import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

/**
 * Core attributes of the Warehouse entity.
 */
export interface WarehouseAttributes {
    id: number;
    name: string;
    location: string;
    status: "active" | "deleted";
}

/**
 * Attributes used during entity creation.
 */
export interface WarehouseCreationAttributes extends Optional<WarehouseAttributes, "id" | "status"> {}

/**
 * Class representing the Warehouse model.
 */
class Warehouse extends Model<WarehouseAttributes, WarehouseCreationAttributes> implements WarehouseAttributes {
    /** Unique identifier of the warehouse. */
    public id!: number;

    /** Name of the warehouse. */
    public name!: string;

    /** Location or city of the warehouse. */
    public location!: string;

    /** Soft-delete status flag ('active' | 'deleted'). */
    public status!: "active" | "deleted";
}

/**
 * Warehouse model initialization.
 */
Warehouse.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        location: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        status: {
            type: DataTypes.ENUM("active", "deleted"),
            allowNull: false,
            defaultValue: "active",
        },
    },
    {
        sequelize,
        modelName: "Warehouse",
        tableName: "warehouses",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
);

export default Warehouse;
