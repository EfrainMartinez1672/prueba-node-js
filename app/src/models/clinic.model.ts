// app/src/models/clinic.model.ts

/**
 * Clinic Model
 * ------------
 * This file defines the Sequelize `Clinic` model, which represents
 * the `clinics` table in the database.
 *
 * A clinic represents a healthcare entity registered on the platform
 * that can request medicines from available warehouses.
 */

import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

/**
 * Core attributes of the Clinic entity.
 */
export interface ClinicAttributes {
    id: number;
    name: string;
    nit: string;
    manager: string;
    address: string;
    status: "active" | "deleted";
}

/**
 * Attributes used during entity creation.
 */
export interface ClinicCreationAttributes extends Optional<ClinicAttributes, "id" | "status"> {}

/**
 * Class representing the Clinic model.
 */
class Clinic extends Model<ClinicAttributes, ClinicCreationAttributes> implements ClinicAttributes {
    /** Unique identifier of the clinic. */
    public id!: number;

    /** Name of the clinic. */
    public name!: string;

    /** Unique Tax Identification Number (NIT). */
    public nit!: string;

    /** Name of the manager/person responsible for the clinic. */
    public manager!: string;

    /** Physical address of the clinic. */
    public address!: string;

    /** Soft-delete status flag ('active' | 'deleted'). */
    public status!: "active" | "deleted";
}

/**
 * Clinic model initialization.
 */
Clinic.init(
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

        nit: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },

        manager: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        address: {
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
        modelName: "Clinic",
        tableName: "clinics",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
);

export default Clinic;
