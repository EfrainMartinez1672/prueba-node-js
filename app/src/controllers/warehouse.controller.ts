import { Request, Response } from "express";
import { CreateWarehouseDto } from "../dto/create-warehouse.dto";
import warehouseService from "../services/warehouse.service";

/**
 * ============================================================================
 * Warehouse Controller
 * ============================================================================
 *
 * This controller manages HTTP requests related to the `Warehouse` entity.
 *
 * Its sole responsibility is to act as an intermediary between the HTTP client
 * and the service layer, delegating all business logic to `WarehouseService`.
 *
 * Architecture:
 *
 * HTTP Client -> WarehouseController -> WarehouseService -> WarehouseRepository -> Sequelize -> PostgreSQL
 * ============================================================================
 */

/**
 * Creates a new warehouse.
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const createWarehouse = async (req: Request, res: Response): Promise<Response> => {
    try {
        const dto: CreateWarehouseDto = req.body;
        const warehouse = await warehouseService.create(dto);
        return res.status(201).json(warehouse);
    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

/**
 * Retrieves all registered warehouses.
 *
 * @async
 * @param {Request} _req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const getWarehouses = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const warehouses = await warehouseService.findAll();
        return res.status(200).json(warehouses);
    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

/**
 * Retrieves a single warehouse by ID.
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const getWarehouseById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const warehouse = await warehouseService.findById(Number(id));

        if (!warehouse) {
            return res.status(404).json({
                error: "Warehouse not found.",
            });
        }

        return res.status(200).json(warehouse);
    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

/**
 * Updates an existing warehouse by ID.
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const updateWarehouse = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const dto: Partial<CreateWarehouseDto> = req.body;

        const warehouse = await warehouseService.update(Number(id), dto);

        if (!warehouse) {
            return res.status(404).json({
                error: "Warehouse not found.",
            });
        }

        return res.status(200).json(warehouse);
    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

/**
 * Soft-deletes a warehouse entry by ID.
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const deleteWarehouse = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const deleted = await warehouseService.delete(Number(id));

        if (!deleted) {
            return res.status(404).json({
                error: "Warehouse not found.",
            });
        }

        return res.status(200).json({
            message: "Warehouse deleted successfully.",
            id: Number(id),
        });
    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
        });
    }
};
