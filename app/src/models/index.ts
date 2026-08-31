// app/src/models/index.ts

/**
 * Models & Associations Index
 * ---------------------------
 * Central point for exporting all database models and establishing
 * relationships (belongsTo / hasMany) between them.
 */

import Clinic from "./clinic.model";
import Medicine from "./medicine.model";
import RequestModel from "./request.model";
import User from "./user.model";
import Warehouse from "./warehouse.model";

// --- Request Associations ---

// A clinic has many requests
Clinic.hasMany(RequestModel, { foreignKey: "clinic_id", as: "requests" });
RequestModel.belongsTo(Clinic, { foreignKey: "clinic_id", as: "clinic" });

// A medicine can be included in many requests
Medicine.hasMany(RequestModel, { foreignKey: "medicine_id", as: "requests" });
RequestModel.belongsTo(Medicine, { foreignKey: "medicine_id", as: "medicine" });

// A warehouse handles many requests
Warehouse.hasMany(RequestModel, { foreignKey: "warehouse_id", as: "requests" });
RequestModel.belongsTo(Warehouse, { foreignKey: "warehouse_id", as: "warehouse" });

export { Clinic, Medicine, RequestModel as Request, User, Warehouse };
