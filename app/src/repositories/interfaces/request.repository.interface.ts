// app/src/repositories/interfaces/request.repository.interface.ts

import RequestModel, { RequestCreationAttributes, RequestStatus } from "../../models/request.model";

/**
 * Interface defining contract operations for Request Repository.
 */
export interface IRequestRepository {
    create(data: RequestCreationAttributes): Promise<RequestModel>;
    findAll(): Promise<RequestModel[]>;
    findById(id: number): Promise<RequestModel | null>;
    findActive(): Promise<RequestModel[]>;
    findByClinic(clinicId: number): Promise<RequestModel[]>;
    updateStatus(id: number, status: RequestStatus): Promise<RequestModel | null>;
}
