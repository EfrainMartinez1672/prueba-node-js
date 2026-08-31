// app/src/services/interfaces/request.service.interface.ts

import { CreateRequestDto } from "../../dto/create-request.dto";
import RequestModel, { RequestStatus } from "../../models/request.model";

/**
 * Interface defining domain business operations for Request Service.
 */
export interface IRequestService {
    create(dto: CreateRequestDto): Promise<RequestModel>;
    updateStatus(id: number, status: RequestStatus): Promise<RequestModel | null>;
    findActive(): Promise<RequestModel[]>;
    findByClinic(clinicId: number): Promise<RequestModel[]>;
    findAll(): Promise<RequestModel[]>;
}
