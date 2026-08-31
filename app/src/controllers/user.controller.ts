import { Request, Response } from "express";

import { CreateUserDto } from "../dto/create-user.dto";
import AuthUser from "../services/auth.service";
import userService from "../services/user.service";

/**
 * ============================================================================
 * User Controller
 * ============================================================================
 *
 * This controller manages HTTP requests related to the `User` entity.
 *
 * Its sole responsibility is to act as an intermediary between the client
 * (HTTP) and the service layer, delegating all business logic to `UserService`.
 *
 * Responsibilities:
 *  - Receive and process HTTP requests.
 *  - Retrieve information sent by the client.
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
 * UserController
 *      │
 * UserService
 *      │
 * UserRepository
 *      │
 * Sequelize
 *      │
 * PostgreSQL
 * ============================================================================
 */

/**
 * Creates a new user.
 *
 * Receives the information sent by the client, constructs the creation DTO,
 * and delegates the operation to the corresponding service.
 *
 * @async
 *
 * @param {Request} req
 * HTTP request object.
 *
 * Expects to receive in the body:
 * @example
 *  {
 *  "name": "pepe",
 *  "password": "pepe123",
 *  "email": "hlaluz59@gmail.com",
 *  "role": "admin"
 *  }
 *
 * @param {Response} res
 * Object used to build the HTTP response.
 *
 * @returns {Promise<Response>}
 * Promise resolving to an HTTP response.
 *
 * Possible responses:
 *
 * - **201 Created**
 *   User created successfully.
 *
 * - **500 Internal Server Error**
 *   Unexpected error during processing.
 *
 * @throws {Error}
 * Any exception thrown by the service layer will be caught
 * and returned as an HTTP response with status code 500.
 */
export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Construction of the DTO received from the client.
        const dto: CreateUserDto = req.body;

        // Delegates business logic to the service.
        const user = await userService.create(dto);

        // Returns the created resource.
        return res.status(201).json(user);
    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

/**
 * Retrieves the complete list of users.
 *
 * Delegates the query to the service layer, which will be responsible for
 * applying any business rules before querying the repository.
 *
 * @async
 *
 * @param {Request} _req
 * HTTP request object.
 *
 * Not used in this endpoint, hence "_" is prefixed to the variable name
 * to explicitly indicate that the parameter is required by Express but will not be used.
 *
 * @param {Response} res
 * Object used to build the HTTP response.
 *
 * @returns {Promise<Response>}
 * Promise resolving to an HTTP response.
 *
 * Possible responses:
 *
 * - **200 OK**
 *   List of users retrieved successfully.
 *
 * - **500 Internal Server Error**
 *   Unexpected error during the query.
 *
 * @example
 * [
 *  {
 *  "name": "pepe",
 *  "password": "pepe123",
 *  "email": "hlaluz59@gmail.com",
 *  "role": "admin"
 *  }
 * ]
 */
export const getUsers = async (_req: Request, res: Response): Promise<Response> => {
    try {
        // Requests information from the service.
        const users = await userService.findAll();

        // Returns the collection of users.
        return res.status(200).json(users);
    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
        });
    }
};  

/**
 * Updates an existing user by email.
 *
 * Extracts the email parameter from the request URL and partial user payload
 * from the request body, delegating the update operation to the service.
 *
 * @async
 *
 * @param {Request} req
 * HTTP request object containing `email` in route params and DTO in body.
 *
 * @param {Response} res
 * Object used to build the HTTP response.
 *
 * @returns {Promise<Response>}
 * Promise resolving to an HTTP response.
 */
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email } = req.params;
        const dto: Partial<CreateUserDto> = req.body;

        if (!email) {
            return res.status(400).json({
                error: "El email es obligatorio.",
            });
        }

        const user = await userService.update(String(email), dto);

        if (!user) {
            return res.status(404).json({
                error: "Usuario no encontrado.",
            });
        }

        return res.status(200).json(user);
    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

/**
 * Deletes a user by email.
 *
 * @async
 *
 * @param {Request} req
 * HTTP request object containing `email` in route params.
 *
 * @param {Response} res
 * Object used to build the HTTP response.
 *
 * @returns {Promise<Response>}
 * Promise resolving to an HTTP response.
 */
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({
                error: "El email es obligatorio.",
            });
        }
        const deleted = await userService.delete(String(email));

        if (!deleted) {
            return res.status(404).json({
                error: "Usuario no encontrado.",
            });
        }

        return res.status(200).json({
            message: "Usuario eliminado correctamente.",
            email: String(email),
        });
    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

/**
 * Restores a previously soft-deleted user by email.
 *
 * @async
 *
 * @param {Request} req
 * HTTP request object containing `email` in route params.
 *
 * @param {Response} res
 * Object used to build the HTTP response.
 *
 * @returns {Promise<Response>}
 * Promise resolving to an HTTP response.
 */
export const restoreUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({
                error: "El email es obligatorio.",
            });
        }
        await userService.restore(String(email));

        return res.status(200).json({
            message: "Usuario restaurado correctamente.",
            email: String(email),
        });
    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
        });
    }
};