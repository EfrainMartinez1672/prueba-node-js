// app/src/models/request.model.ts

/**
 * Request Model
 * -------------
 * This file defines the Sequelize `Request` model, which represents
 * the `requests` table in the database.
 *
 * A request tracks medicine orders made by a clinic to a specific warehouse
 * along with its status lifecycle.
 */

import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export type RequestStatus = "pending" | "approved" | "rejected" | "delivered";

/**
 * Core attributes of the Request entity.
 */
export interface RequestAttributes {
    id: number;
    clinicId: number;
    medicineId: number;
    warehouseId: number;
    quantity: number;
    status: RequestStatus;
}

/**
 * Attributes used during entity creation.
 */
export interface RequestCreationAttributes extends Optional<RequestAttributes, "id" | "status"> {}

/**
 * Class representing the Request model.
 */
class RequestModel extends Model<RequestAttributes, RequestCreationAttributes> implements RequestAttributes {
    /** Unique identifier of the request. */
    public id!: number;

    /** Foreign key referencing the requesting clinic. */
    public clinicId!: number;

    /** Foreign key referencing the requested medicine. */
    public medicineId!: number;

    /** Foreign key referencing the assigned warehouse. */
    public warehouseId!: number;

    /** Quantity of medicine units requested. */
    public quantity!: number;

    /** Current request status ('pending' | 'approved' | 'rejected' | 'delivered'). */
    public status!: RequestStatus;
}

/**
 * Request model initialization.
 */
RequestModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        clinicId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "clinic_id",
            references: {
                model: "clinics",
                key: "id",
            },
        },

        medicineId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "medicine_id",
            references: {
                model: "medicines",
                key: "id",
            },
        },

        warehouseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "warehouse_id",
            references: {
                model: "warehouses",
                key: "id",
            },
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
            },
        },

        status: {
            type: DataTypes.ENUM("pending", "approved", "rejected", "delivered"),
            allowNull: false,
            defaultValue: "pending",
        },
    },
    {
        sequelize,
        modelName: "Request",
        tableName: "requests",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
);

export default RequestModel;
