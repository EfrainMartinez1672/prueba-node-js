// app/src/routes/clinic.routes.ts

/**
 * Clinic Routes
 * ------------
 * This file defines the HTTP routes associated with the `Clinic` entity.
 *
 * Available Endpoints:
 *  - `POST /clinics/`        : Create a new clinic (Admin only).
 *  - `GET /clinics/`         : Retrieve all registered clinics.
 *  - `GET /clinics/:id`      : Get clinic details by ID.
 *  - `PATCH /clinics/:id`    : Update clinic information (Admin only).
 *  - `DELETE /clinics/:id`   : Soft-delete a clinic (Admin only).
 */

import { Router } from "express";
import { createClinic, deleteClinic, getClinicById, getClinics, updateClinic } from "../controllers/clinic.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

/**
 * POST /
 * ------
 * Creates a new clinic entry in the database.
 *
 * @swagger
 * /api/clinics:
 *   post:
 *     summary: Create a new clinic
 *     tags: [Clinics]
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
 *               - nit
 *               - manager
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *                 example: "San Vicente Central Clinic"
 *               nit:
 *                 type: string
 *                 example: "900123456-1"
 *               manager:
 *                 type: string
 *                 example: "Dr. Sarah Connor"
 *               address:
 *                 type: string
 *                 example: "123 Healthcare Blvd"
 *     responses:
 *       201:
 *         description: Clinic created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: "San Vicente Central Clinic"
 *               nit: "900123456-1"
 *               manager: "Dr. Sarah Connor"
 *               address: "123 Healthcare Blvd"
 *               status: "active"
 *       400:
 *         description: Invalid input or duplicate NIT
 *       401:
 *         description: Unauthorized (Token required)
 *       403:
 *         description: Forbidden (Requires Admin role)
 *       500:
 *         description: Internal server error
 */
router.post("/", authMiddleware, roleMiddleware(["admin"]), createClinic);

/**
 * GET /
 * -----
 * Retrieves a list of all clinics.
 *
 * @swagger
 * /api/clinics:
 *   get:
 *     summary: Get all clinics
 *     tags: [Clinics]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of clinics retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: "San Vicente Central Clinic"
 *                 nit: "900123456-1"
 *                 manager: "Dr. Sarah Connor"
 *                 address: "123 Healthcare Blvd"
 *                 status: "active"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware, getClinics);

/**
 * GET /:id
 * --------
 * Retrieves a single clinic by its unique ID.
 *
 * @swagger
 * /api/clinics/{id}:
 *   get:
 *     summary: Get clinic by ID
 *     tags: [Clinics]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique clinic identifier
 *     responses:
 *       200:
 *         description: Clinic found
 *       404:
 *         description: Clinic not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authMiddleware, getClinicById);

/**
 * PATCH /:id
 * ----------
 * Updates an existing clinic's details by ID.
 *
 * @swagger
 * /api/clinics/{id}:
 *   patch:
 *     summary: Update clinic by ID
 *     tags: [Clinics]
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
 *                 example: "San Vicente North Clinic"
 *               manager:
 *                 type: string
 *                 example: "Dr. John Smith"
 *               address:
 *                 type: string
 *                 example: "456 Health Ave"
 *     responses:
 *       200:
 *         description: Clinic updated successfully
 *       400:
 *         description: Invalid parameters
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: Clinic not found
 *       500:
 *         description: Internal server error
 */
router.patch("/:id", authMiddleware, roleMiddleware(["admin"]), updateClinic);

/**
 * DELETE /:id
 * -----------
 * Performs a soft-delete on a clinic record by changing its status to 'deleted'.
 *
 * @swagger
 * /api/clinics/{id}:
 *   delete:
 *     summary: Soft-delete clinic by ID
 *     tags: [Clinics]
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
 *         description: Clinic deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: Clinic not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteClinic);

export default router;
