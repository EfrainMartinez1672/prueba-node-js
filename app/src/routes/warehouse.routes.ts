// app/src/routes/warehouse.routes.ts

/**
 * Warehouse Routes
 * ----------------
 * This file defines the HTTP routes associated with the `Warehouse` entity.
 *
 * Available Endpoints:
 *  - `POST /warehouses/`        : Create a new warehouse (Admin only).
 *  - `GET /warehouses/`         : Retrieve all registered warehouses.
 *  - `GET /warehouses/:id`      : Get warehouse details by ID.
 *  - `PATCH /warehouses/:id`    : Update warehouse details (Admin only).
 *  - `DELETE /warehouses/:id`   : Soft-delete a warehouse (Admin only).
 */

import { Router } from "express";
import {
    createWarehouse,
    deleteWarehouse,
    getWarehouseById,
    getWarehouses,
    updateWarehouse,
} from "../controllers/warehouse.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

/**
 * POST /
 * ------
 * Creates a new warehouse.
 *
 * @swagger
 * /api/warehouses:
 *   post:
 *     summary: Create a new warehouse
 *     tags: [Warehouses]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Central Medical Warehouse"
 *               location:
 *                 type: string
 *                 example: "Building 4, Logistics Park"
 *     responses:
 *       201:
 *         description: Warehouse created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 *       500:
 *         description: Internal server error
 */
router.post("/", authMiddleware, roleMiddleware(["admin"]), createWarehouse);

/**
 * GET /
 * -----
 * Gets all registered warehouses.
 *
 * @swagger
 * /api/warehouses:
 *   get:
 *     summary: Get all warehouses
 *     tags: [Warehouses]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of warehouses
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware, getWarehouses);

/**
 * GET /:id
 * --------
 * Gets warehouse details by ID.
 *
 * @swagger
 * /api/warehouses/{id}:
 *   get:
 *     summary: Get warehouse by ID
 *     tags: [Warehouses]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Warehouse found
 *       404:
 *         description: Warehouse not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authMiddleware, getWarehouseById);

/**
 * PATCH /:id
 * ----------
 * Updates warehouse details by ID.
 *
 * @swagger
 * /api/warehouses/{id}:
 *   patch:
 *     summary: Update warehouse by ID
 *     tags: [Warehouses]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Central Warehouse"
 *               location:
 *                 type: string
 *                 example: "Building 5, Logistics Park"
 *     responses:
 *       200:
 *         description: Warehouse updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: Warehouse not found
 *       500:
 *         description: Internal server error
 */
router.patch("/:id", authMiddleware, roleMiddleware(["admin"]), updateWarehouse);

/**
 * DELETE /:id
 * -----------
 * Soft-deletes a warehouse.
 *
 * @swagger
 * /api/warehouses/{id}:
 *   delete:
 *     summary: Soft-delete warehouse by ID
 *     tags: [Warehouses]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Warehouse soft-deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: Warehouse not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteWarehouse);

export default router;
