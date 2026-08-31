// app/src/services/request.service.ts

import { CreateRequestDto } from "../dto/create-request.dto";
import RequestModel, { RequestCreationAttributes, RequestStatus } from "../models/request.model";
import clinicRepository from "../repositories/clinic.repository";
import medicineRepository from "../repositories/medicine.repository";
import requestRepository from "../repositories/request.repository";
import warehouseRepository from "../repositories/warehouse.repository";
import { IRequestService } from "./interfaces/request.service.interface";

/**
 * ============================================================================
 * Request Service
 * ============================================================================
 *
 * Orchestrates domain workflow for requesting and fulfilling medical supplies.
 *
 * Key Domain Rules:
 *  - Target clinic, warehouse, and medicine entities must exist and be active.
 *  - Requested quantities must be greater than zero.
 *  - Adequate inventory must exist prior to request creation or approval.
 *  - Approving a request automatically decrements stock via `MedicineRepository`.
 * ============================================================================
 */
class RequestService implements IRequestService {
    /**
     * Creates a new medicine request after validating stock and relational integrity.
     *
     * @async
     * @param {CreateRequestDto} dto - Request payload details.
     * @returns {Promise<RequestModel>} Request initialized in 'pending' status.
     * @throws {Error} If related entities do not exist or stock is insufficient.
     */
    async create(dto: CreateRequestDto): Promise<RequestModel> {
        if (dto.quantity <= 0) {
            throw new Error("Requested quantity must be greater than zero.");
        }

        const clinic = await clinicRepository.findById(dto.clinicId);
        if (!clinic) {
            throw new Error("The specified clinic does not exist or is inactive.");
        }

        const warehouse = await warehouseRepository.findById(dto.warehouseId);
        if (!warehouse) {
            throw new Error("The specified warehouse does not exist or is inactive.");
        }

        const medicine = await medicineRepository.findById(dto.medicineId);
        if (!medicine) {
            throw new Error("The requested medicine does not exist or is inactive.");
        }

        if (medicine.stock < dto.quantity) {
            throw new Error(`Insufficient stock. Available: ${medicine.stock}, Requested: ${dto.quantity}`);
        }

        const requestData: RequestCreationAttributes = {
            ...dto,
            status: "pending",
        };

        return await requestRepository.create(requestData);
    }

    /**
     * Updates request status and applies domain side-effects (e.g., stock deduction).
     *
     * @async
     * @param {number} id - Request ID.
     * @param {RequestStatus} status - New status ('approved', 'rejected', 'delivered', 'pending').
     * @returns {Promise<RequestModel | null>} Request record with updated status.
     * @throws {Error} If approving a request exceeds available stock.
     */
    async updateStatus(id: number, status: RequestStatus): Promise<RequestModel | null> {
        const currentRequest = await requestRepository.findById(id);
        if (!currentRequest) {
            return null;
        }

        // Domain Rule: When transitioning to 'approved', deduct requested quantity from stock.
        if (status === "approved" && currentRequest.status === "pending") {
            const medicine = await medicineRepository.findById(currentRequest.medicineId);

            if (!medicine || medicine.stock < currentRequest.quantity) {
                throw new Error("Insufficient stock available to approve this request.");
            }

            const newStock = medicine.stock - currentRequest.quantity;
            await medicineRepository.update(medicine.id, { stock: newStock });
        }

        return await requestRepository.updateStatus(id, status);
    }

    /**
     * Retrieves all active/pending requests.
     *
     * @async
     * @returns {Promise<RequestModel[]>} Array of pending requests.
     */
    async findActive(): Promise<RequestModel[]> {
        return await requestRepository.findActive();
    }

    /**
     * Filters requests associated with a specific clinic ID.
     *
     * @async
     * @param {number} clinicId - Clinic ID.
     * @returns {Promise<RequestModel[]>} Clinic supply requests.
     */
    async findByClinic(clinicId: number): Promise<RequestModel[]> {
        return await requestRepository.findByClinic(clinicId);
    }

    /**
     * Retrieves all supply requests in the system.
     *
     * @async
     * @returns {Promise<RequestModel[]>} Global requests list.
     */
    async findAll(): Promise<RequestModel[]> {
        return await requestRepository.findAll();
    }
}

export default new RequestService();
