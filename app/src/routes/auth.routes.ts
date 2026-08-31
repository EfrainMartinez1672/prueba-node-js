// app/src/routes/user.routes.ts

/**
 * User Routes
 * -----------
 * This file defines the HTTP routes related to the `User` entity,
 * including authentication endpoints and full CRUD operations.
 * 
 * Each route delegates request processing to its corresponding controller method.
 */

import { Router } from "express";
import { findUser } from "../controllers/auth.controller";
import {
    createUser,
    deleteUser,
    getUsers,
    restoreUser,
    updateUser,
} from "../controllers/user.controller";

const router = Router();

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Authenticate user and generate access token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "********"
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       400:
 *         description: Missing or invalid credentials input
 *       401:
 *         description: Authentication failure
 */
router.post("/login", findUser);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - NIT
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               NIT:
 *                 type: string
 *                 example: "123456789"
 *               role:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Internal server error
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.post("/", createUser);
router.get("/", getUsers);

/**
 * @swagger
 * /api/users/{email}:
 *   put:
 *     summary: Update an existing user by email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email address of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe Updated"
 *               role:
 *                 type: string
 *                 example: "user"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Email parameter is required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a user by email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email address of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Email parameter is required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put("/:email", updateUser);
router.delete("/:email", deleteUser);

/**
 * @swagger
 * /api/users/restore/{email}:
 *   patch:
 *     summary: Restore a soft-deleted user by email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email address of the user to restore
 *     responses:
 *       200:
 *         description: User restored successfully
 *       400:
 *         description: Email parameter is required
 *       500:
 *         description: Internal server error
 */
router.patch("/restore/:email", restoreUser);

export default router;