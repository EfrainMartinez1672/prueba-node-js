// app/src/routes/medicine.routes.ts

/**
 * Medicine Routes
 * ---------------
 * This file defines the HTTP routes associated with the `Medicine` entity.
 *
 * Available Endpoints:
 *  - `POST /medicines/`        : Register a new medicine (Admin only).
 *  - `GET /medicines/`         : List all medicines in stock.
 *  - `GET /medicines/:id`      : Get details of a single medicine.
 *  - `PATCH /medicines/:id`    : Update medicine information/stock (Admin only).
 *  - `DELETE /medicines/:id`   : Soft-delete a medicine (Admin only).
 */

import { Router } from "express";
import {
    createMedicine,
    deleteMedicine,
    getMedicineById,
    getMedicines,
    updateMedicine,
} from "../controllers/medicine.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

/**
 * POST /
 * ------
 * Registers a new medicine into the system.
 *
 * @swagger
 * /api/medicines:
 *   post:
 *     summary: Create a new medicine entry
 *     tags: [Medicines]
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
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Amoxicillin 500mg"
 *               description:
 *                 type: string
 *                 example: "Broad-spectrum antibiotic capsule"
 *               stock:
 *                 type: integer
 *                 example: 500
 *     responses:
 *       201:
 *         description: Medicine added successfully
 *       400:
 *         description: Invalid payload or negative stock
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 *       500:
 *         description: Internal server error
 */
router.post("/", authMiddleware, roleMiddleware(["admin"]), createMedicine);

/**
 * GET /
 * -----
 * Gets all medicines.
 *
 * @swagger
 * /api/medicines:
 *   get:
 *     summary: Get all medicines
 *     tags: [Medicines]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of medicines
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware, getMedicines);

/**
 * GET /:id
 * --------
 * Gets medicine details by ID.
 *
 * @swagger
 * /api/medicines/{id}:
 *   get:
 *     summary: Get medicine by ID
 *     tags: [Medicines]
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
 *         description: Medicine found
 *       404:
 *         description: Medicine not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authMiddleware, getMedicineById);

/**
 * PATCH /:id
 * ----------
 * Updates medicine stock or details.
 *
 * @swagger
 * /api/medicines/{id}:
 *   patch:
 *     summary: Update medicine by ID
 *     tags: [Medicines]
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
 *                 example: "Amoxicillin 1000mg"
 *               description:
 *                 type: string
 *                 example: "Updated formulation"
 *               stock:
 *                 type: integer
 *                 example: 750
 *     responses:
 *       200:
 *         description: Medicine updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: Medicine not found
 *       500:
 *         description: Internal server error
 */
router.patch("/:id", authMiddleware, roleMiddleware(["admin"]), updateMedicine);

/**
 * DELETE /:id
 * -----------
 * Soft-deletes a medicine record.
 *
 * @swagger
 * /api/medicines/{id}:
 *   delete:
 *     summary: Soft-delete medicine by ID
 *     tags: [Medicines]
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
 *         description: Medicine deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: Medicine not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteMedicine);

export default router;
