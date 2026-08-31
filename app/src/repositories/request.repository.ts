// app/src/repositories/request.repository.ts

import { Clinic, Medicine, Warehouse } from "../models";
import RequestModel, { RequestCreationAttributes, RequestStatus } from "../models/request.model";
import { IRequestRepository } from "./interfaces/request.repository.interface";

/**
 * ============================================================================
 * Request Repository
 * ============================================================================
 *
 * Encapsulates database queries for `Request` entities, including Sequelize
 * eager loading of relational models (`Clinic`, `Medicine`, `Warehouse`).
 *
 * Architecture:
 * RequestService -> RequestRepository -> Sequelize ORM -> PostgreSQL
 * ============================================================================
 */
class RequestRepository implements IRequestRepository {
    /**
     * Creates a new medicine request entry.
     *
     * @async
     * @param {RequestCreationAttributes} data - Request creation parameters.
     * @returns {Promise<RequestModel>} Created request.
     */
    async create(data: RequestCreationAttributes): Promise<RequestModel> {
        return await RequestModel.create({ ...data, status: "pending" });
    }

    /**
     * Retrieves all requests with full relational associations loaded.
     *
     * @async
     * @returns {Promise<RequestModel[]>} Array of requests with linked models.
     */
    async findAll(): Promise<RequestModel[]> {
        return await RequestModel.findAll({
            include: [
                { model: Clinic, as: "clinic", attributes: ["id", "name"] },
                { model: Medicine, as: "medicine", attributes: ["id", "name"] },
                { model: Warehouse, as: "warehouse", attributes: ["id", "name"] },
            ],
        });
    }

    /**
     * Finds a single request by primary key with relational attributes included.
     *
     * @async
     * @param {number} id - Request ID.
     * @returns {Promise<RequestModel | null>} Found request or null.
     */
    async findById(id: number): Promise<RequestModel | null> {
        return await RequestModel.findByPk(id, {
            include: [
                { model: Clinic, as: "clinic", attributes: ["id", "name"] },
                { model: Medicine, as: "medicine", attributes: ["id", "name"] },
                { model: Warehouse, as: "warehouse", attributes: ["id", "name"] },
            ],
        });
    }

    /**
     * Retrieves all pending requests.
     *
     * @async
     * @returns {Promise<RequestModel[]>} List of active requests in pending status.
     */
    async findActive(): Promise<RequestModel[]> {
        return await RequestModel.findAll({
            where: { status: "pending" },
            include: [
                { model: Clinic, as: "clinic", attributes: ["id", "name"] },
                { model: Medicine, as: "medicine", attributes: ["id", "name"] },
                { model: Warehouse, as: "warehouse", attributes: ["id", "name"] },
            ],
        });
    }

    /**
     * Finds all requests submitted by a given clinic ID.
     *
     * @async
     * @param {number} clinicId - Associated Clinic ID.
     * @returns {Promise<RequestModel[]>} Array of clinic supply requests.
     */
    async findByClinic(clinicId: number): Promise<RequestModel[]> {
        return await RequestModel.findAll({
            where: { clinicId },
            include: [
                { model: Medicine, as: "medicine", attributes: ["id", "name"] },
                { model: Warehouse, as: "warehouse", attributes: ["id", "name"] },
            ],
        });
    }

    /**
     * Updates status field of a request record.
     *
     * @async
     * @param {number} id - Request primary key.
     * @param {RequestStatus} status - Target status string.
     * @returns {Promise<RequestModel | null>} Updated request model or null.
     */
    async updateStatus(id: number, status: RequestStatus): Promise<RequestModel | null> {
        const requestItem = await RequestModel.findByPk(id);
        if (!requestItem) {
            return null;
        }
        return await requestItem.update({ status });
    }
}

export default new RequestRepository();
