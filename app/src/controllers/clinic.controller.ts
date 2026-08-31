import { Request, Response } from "express";
import { CreateClinicDto } from "../dto/create-clinic.dto";
import clinicService from "../services/clinic.service";

/**
 * ============================================================================
 * Clinic Controller
 * ============================================================================
 *
 * This controller manages HTTP requests related to the `Clinic` entity.
 *
 * Its sole responsibility is to act as an intermediary between the HTTP client
 * and the service layer, delegating all business logic to `ClinicService`.
 *
 * Responsibilities:
 *  - Receive and process HTTP requests.
 *  - Extract payload data sent by the client.
 *  - Invoke the corresponding service.
 *  - Build the HTTP response.
 *  - Return appropriate status codes.
 *
 * This controller MUST NOT:
 *  - Contain business rules.
 *  - Access the database directly.
 *  - Execute queries using Sequelize.
 *  - Perform complex domain validations.
 *
 * Architecture:
 *
 * HTTP Client
 *      │
 * ClinicController
 *      │
 * ClinicService
 *      │
 * ClinicRepository
 *      │
 * Sequelize
 *      │
 * PostgreSQL
 * ============================================================================
 */

/**
 * Creates a new clinic entry.
 *
 * Receives the information sent by the client, constructs the creation DTO,
 * and delegates the operation to the corresponding service.
 *
 * @async
 *
 * @param {Request} req
 * HTTP Request object.
 *
 * Expects in request body:
 * @example
 *  {
 *    "name": "San Vicente Central Clinic",
 *    "nit": "900123456-1",
 *    "manager": "Dr. Sarah Connor",
 *    "address": "123 Healthcare Blvd"
 *  }
 *
 * @param {Response} res
 * HTTP Response object.
 *
 * @returns {Promise<Response>}
 * Promise resolving to an HTTP response.
 *
 * Possible responses:
 * - **201 Created**: Clinic created successfully.
 * - **400 Bad Request**: Invalid input data or duplicate NIT.
 * - **500 Internal Server Error**: Unexpected processing error.
 */
export const createClinic = async (req: Request, res: Response): Promise<Response> => {
    try {
        const dto: CreateClinicDto = req.body;
        const clinic = await clinicService.create(dto);
        return res.status(201).json(clinic);
    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

/**
 * Retrieves the complete list of registered clinics.
 *
 * Delegates the query to the service layer.
 *
 * @async
 *
 * @param {Request} _req
 * HTTP Request object (unused).
 *
 * @param {Response} res
 * HTTP Response object.
 *
 * @returns {Promise<Response>}
 * Promise resolving to an HTTP response.
 *
 * Possible responses:
 * - **200 OK**: Clinic list retrieved successfully.
 * - **500 Internal Server Error**: Unexpected query error.
 */
export const getClinics = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const clinics = await clinicService.findAll();
        return res.status(200).json(clinics);
    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

/**
 * Retrieves a single clinic by its unique identifier.
 *
 * @async
 *
 * @param {Request} req
 * HTTP Request object containing `id` in route parameters.
 *
 * @param {Response} res
 * HTTP Response object.
 *
 * @returns {Promise<Response>}
 * Promise resolving to an HTTP response.
 */
export const getClinicById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const clinic = await clinicService.findById(Number(id));

        if (!clinic) {
            return res.status(404).json({
                error: "Clinic not found.",
            });
        }

        return res.status(200).json(clinic);
    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

/**
 * Updates an existing clinic by ID.
 *
 * @async
 *
 * @param {Request} req
 * HTTP Request object containing `id` parameter and body update payload.
 *
 * @param {Response} res
 * HTTP Response object.
 *
 * @returns {Promise<Response>}
 * Promise resolving to an HTTP response.
 */
export const updateClinic = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const dto: Partial<CreateClinicDto> = req.body;

        const clinic = await clinicService.update(Number(id), dto);

        if (!clinic) {
            return res.status(404).json({
                error: "Clinic not found.",
            });
        }

        return res.status(200).json(clinic);
    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

/**
 * Performs a soft-delete on a clinic record by ID.
 *
 * @async
 *
 * @param {Request} req
 * HTTP Request object containing `id` in route parameters.
 *
 * @param {Response} res
 * HTTP Response object.
 *
 * @returns {Promise<Response>}
 * Promise resolving to an HTTP response.
 */
export const deleteClinic = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const deleted = await clinicService.delete(Number(id));

        if (!deleted) {
            return res.status(404).json({
                error: "Clinic not found.",
            });
        }

        return res.status(200).json({
            message: "Clinic deleted successfully.",
            id: Number(id),
        });
    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
        });
    }
};
