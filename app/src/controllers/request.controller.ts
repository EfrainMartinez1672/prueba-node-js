import { Request, Response } from "express";
import { CreateRequestDto } from "../dto/create-request.dto";
import { RequestStatus } from "../models/request.model";
import requestService from "../services/request.service";

/**
 * ============================================================================
 * Request Controller
 * ============================================================================
 *
 * This controller manages HTTP requests related to medicine requests (`Request`).
 *
 * Its sole responsibility is to act as an intermediary between the HTTP client
 * and the service layer, delegating all business logic to `RequestService`.
 *
 * Architecture:
 *
 * HTTP Client -> RequestController -> RequestService -> RequestRepository -> Sequelize -> PostgreSQL
 * ================================ ============================================
 */

/**
 * Creates a new medicine request.
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const createRequest = async (req: Request, res: Response): Promise<Response> => {
    try {
        const dto: CreateRequestDto = req.body;
        const request = await requestService.create(dto);
        return res.status(201).json(request);
    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

/**
 * Updates the lifecycle status of an existing request.
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const updateRequestStatus = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { status }: { status: RequestStatus } = req.body;

        if (!status) {
            return res.status(400).json({
                error: "Status field is required.",
            });
        }

        const updatedRequest = await requestService.updateStatus(Number(id), status);

        if (!updatedRequest) {
            return res.status(404).json({
                error: "Request not found.",
            });
        }

        return res.status(200).json(updatedRequest);
    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

/**
 * Retrieves all active/pending medicine requests.
 *
 * @async
 * @param {Request} _req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const getActiveRequests = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const activeRequests = await requestService.findActive();
        return res.status(200).json(activeRequests);
    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

/**
 * Gets all medicine requests for a specific clinic by ID.
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const getRequestsByClinic = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { clinicId } = req.params;
        const requests = await requestService.findByClinic(Number(clinicId));
        return res.status(200).json(requests);
    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

/**
 * Retrieves all requests stored in the system.
 *
 * @async
 * @param {Request} _req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const getRequests = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const requests = await requestService.findAll();
        return res.status(200).json(requests);
    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
        });
    }
};
