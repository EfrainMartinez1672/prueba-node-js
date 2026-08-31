import { Request, Response } from "express";
import { CreateMedicineDto } from "../dto/create-medicine.dto";
import medicineService from "../services/medicine.service";

/**
 * ============================================================================
 * Medicine Controller
 * ============================================================================
 *
 * This controller manages HTTP requests related to the `Medicine` entity.
 *
 * Its sole responsibility is to act as an intermediary between the HTTP client
 * and the service layer, delegating all business logic to `MedicineService`.
 *
 * Architecture:
 *
 * HTTP Client -> MedicineController -> MedicineService -> MedicineRepository -> Sequelize -> PostgreSQL
 * ============================================================================
 */

/**
 * Registers a new medicine into inventory.
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const createMedicine = async (req: Request, res: Response): Promise<Response> => {
    try {
        const dto: CreateMedicineDto = req.body;
        const medicine = await medicineService.create(dto);
        return res.status(201).json(medicine);
    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

/**
 * Retrieves all registered medicines in stock.
 *
 * @async
 * @param {Request} _req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const getMedicines = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const medicines = await medicineService.findAll();
        return res.status(200).json(medicines);
    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

/**
 * Retrieves a single medicine by ID.
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const getMedicineById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const medicine = await medicineService.findById(Number(id));

        if (!medicine) {
            return res.status(404).json({
                error: "Medicine not found.",
            });
        }

        return res.status(200).json(medicine);
    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

/**
 * Updates medicine stock or details by ID.
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const updateMedicine = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const dto: Partial<CreateMedicineDto> = req.body;

        const medicine = await medicineService.update(Number(id), dto);

        if (!medicine) {
            return res.status(404).json({
                error: "Medicine not found.",
            });
        }

        return res.status(200).json(medicine);
    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

/**
 * Soft-deletes a medicine entry by ID.
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const deleteMedicine = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const deleted = await medicineService.delete(Number(id));

        if (!deleted) {
            return res.status(404).json({
                error: "Medicine not found.",
            });
        }

        return res.status(200).json({
            message: "Medicine deleted successfully.",
            id: Number(id),
        });
    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
        });
    }
};
