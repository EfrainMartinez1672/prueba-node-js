// app/src/routes/request.routes.ts

/**
 * Request Routes
 * --------------
 * This file defines the HTTP routes associated with medicine requests (`Request` entity).
 *
 * Available Endpoints:
 *  - `POST /requests/`                  : Create a new request (Manager or Admin).
 *  - `PATCH /requests/:id/status`       : Update a request's status (Manager or Admin).
 *  - `GET /requests/active`             : Get all active/pending requests (All authenticated users).
 *  - `GET /requests/clinic/:clinicId`   : Query full request history for a specific clinic.
 *  - `GET /requests/`                  : Retrieve all requests across the system.
 */

import { Router } from "express";
import {
    createRequest,
    getActiveRequests,
    getRequests,
    getRequestsByClinic,
    updateRequestStatus,
} from "../controllers/request.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

/**
 * POST /
 * ------
 * Submits a new medicine request from a clinic to a warehouse.
 *
 * @swagger
 * /api/requests:
 *   post:
 *     summary: Create a new medicine request
 *     tags: [Requests]
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
 *               - clinicId
 *               - medicineId
 *               - warehouseId
 *               - quantity
 *             properties:
 *               clinicId:
 *                 type: integer
 *                 example: 1
 *               medicineId:
 *                 type: integer
 *                 example: 2
 *               warehouseId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Request created successfully with initial 'pending' status
 *       400:
 *         description: Insufficient warehouse stock or invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Requires Manager or Admin role)
 *       500:
 *         description: Internal server error
 */
router.post("/", authMiddleware, roleMiddleware(["admin", "manager"]), createRequest);

/**
 * PATCH /:id/status
 * -----------------
 * Updates the lifecycle status of an existing request ('pending', 'approved', 'rejected', 'delivered').
 *
 * @swagger
 * /api/requests/{id}/status:
 *   patch:
 *     summary: Update request status
 *     tags: [Requests]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected, delivered]
 *                 example: "approved"
 *     responses:
 *       200:
 *         description: Request status updated successfully
 *       400:
 *         description: Invalid status transition or stock overflow
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Requires Manager or Admin role)
 *       404:
 *         description: Request not found
 *       500:
 *         description: Internal server error
 */
router.patch("/:id/status", authMiddleware, roleMiddleware(["admin", "manager"]), updateRequestStatus);

/**
 * GET /active
 * -----------
 * Gets all active/pending requests in the system. Accessible by any authenticated user.
 *
 * @swagger
 * /api/requests/active:
 *   get:
 *     summary: Get all active requests
 *     tags: [Requests]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of active requests
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/active", authMiddleware, getActiveRequests);

/**
 * GET /clinic/:clinicId
 * ---------------------
 * Retrieves the full request history for a specific clinic by its ID.
 *
 * @swagger
 * /api/requests/clinic/{clinicId}:
 *   get:
 *     summary: Get request history by clinic
 *     tags: [Requests]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clinicId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the clinic
 *     responses:
 *       200:
 *         description: List of requests submitted by the specified clinic
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Clinic not found
 *       500:
 *         description: Internal server error
 */
router.get("/clinic/:clinicId", authMiddleware, getRequestsByClinic);

/**
 * GET /
 * -----
 * Retrieves all requests stored in the system.
 *
 * @swagger
 * /api/requests:
 *   get:
 *     summary: Get all requests
 *     tags: [Requests]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Complete list of requests
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware, roleMiddleware(["admin", "manager"]), getRequests);

export default router;
