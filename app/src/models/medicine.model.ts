// app/src/models/medicine.model.ts

/**
 * Medicine Model
 * --------------
 * This file defines the Sequelize `Medicine` model, which represents
 * the `medicines` table in the database.
 *
 * A medicine tracks the supplies available in the global inventory.
 */

import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

/**
 * Core attributes of the Medicine entity.
 */
export interface MedicineAttributes {
    id: number;
    name: string;
    description: string;
    stock: number;
    status: "active" | "deleted";
}

/**
 * Attributes used during entity creation.
 */
export interface MedicineCreationAttributes extends Optional<
    MedicineAttributes,
    "id" | "description" | "stock" | "status"
> {}

/**
 * Class representing the Medicine model.
 */
class Medicine extends Model<MedicineAttributes, MedicineCreationAttributes> implements MedicineAttributes {
    /** Unique identifier of the medicine. */
    public id!: number;

    /** Name of the medicine. */
    public name!: string;

    /** Detailed description of the medicine. */
    public description!: string;

    /** Total available stock quantity. */
    public stock!: number;

    /** Soft-delete status flag ('active' | 'deleted'). */
    public status!: "active" | "deleted";
}

/**
 * Medicine model initialization.
 */
Medicine.init(
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

        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: "",
        },

        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
            },
        },

        status: {
            type: DataTypes.ENUM("active", "deleted"),
            allowNull: false,
            defaultValue: "active",
        },
    },
    {
        sequelize,
        modelName: "Medicine",
        tableName: "medicines",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
);

export default Medicine;
