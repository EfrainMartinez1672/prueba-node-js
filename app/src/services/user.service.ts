// app/src/services/user.service.ts

import { CreateUserDto } from "../dto/create-user.dto";
import User, { UserCreationAttributes } from "../models/user.model";
import repository from "../repositories/user.repository";
import { IUserService } from "./interfaces/user.service.interface";

/**
 * User Service
 * ------------
 * Contains all business logic related to the User entity.
 *
 * Responsibilities:
 *  - Validate business rules.
 *  - Coordinate operations between one or multiple repositories.
 *  - Orchestrate processes before and after persisting information.
 *  - Keep the controller free from business logic.
 *
 * Examples of business rules:
 *
 *  Verify that the email address does not exist before creating the user.
 *  Validate that the email domain belongs to the company.
 *  Hash the password before storing it.
 *  Assign a default role (e.g., "Request Manager").
 *  Log an audit entry for the operation.
 *  Send a welcome email after registration.
 *  Automatically create an associated profile for the user.
 *
 * The Service knows the business rules.
 * The Repository only knows how to store and retrieve data.
 */

class UserService implements IUserService {
    async create(dto: CreateUserDto): Promise<User> {
        /**
         * Business rule example:
         *
         * Before creating a user, we could validate that the email
         * address is not already registered.
         *
         * const existingUser = await repository.findByEmail(dto.email);
         *
         * if (existingUser) {
         *     throw new Error("The email address is already registered.");
         * }
         *
         * We could also:
         *  - Hash the password.
         *  - Assign a default role.
         *  - Log the operation in an audit log.
         *  - Send a welcome email.
         */

        return await repository.create(dto as UserCreationAttributes);
    }

    /**
     * Retrieves all registered users in the system.
     *
     * This method delegates the query to the user repository, which is
     * responsible for interacting with the database. Additional business rules
     * could be incorporated into this layer, such as filters, pagination,
     * sorting, or data transformations before sending data to the controller.
     *
     * @async
     * @returns {Promise<User[]>} Promise resolving to an array of objects
     *                            of type {@link User} representing the users
     *                            found in the database.
     *
     * @example
     * const users = await userService.findAll();
     *
     * console.log(users);
     *  [
     *    {
     *      id: 1,
     *      name: "David",
     *      email: "david@example.com",
     *      password: "password123"
     *    }
     *  ]
     */
    async findAll(): Promise<User[]> {
        return await repository.findAll();
    }

    /**
     * This method is responsible for delegating authentication or log-in lookup.
     * Uses the email input to check if the user exists in the database.
     *
     * @param {string} email - User email address
     *
     * @returns {Promise<User>} - Returns the user wrapped in a promise after verification
     */
    async findOne(email: string): Promise<User> {
        const user = await repository.findOne(email);
        return user;
    }

    /**
     * Updates an existing user record identified by email.
     *
     * @async
     * @param {string} email - Target user email address
     * @param {Partial<CreateUserDto>} dto - Partial user attributes to update
     * @returns {Promise<User | null>} The updated User object or null if not found
     */
    async update(email: string, dto: Partial<CreateUserDto>): Promise<User | null> {
        const dataToUpdate: Partial<UserCreationAttributes> = { ...dto } as Partial<UserCreationAttributes>;

        return await repository.update(email, dataToUpdate);
    }

    /**
     * Deletes (or soft-deletes) a user record by email.
     *
     * @async
     * @param {string} email - Target user email address
     * @returns {Promise<Boolean>} True if deletion succeeded, false otherwise
     */
    async delete(email: string): Promise<Boolean> {
        const userEmail = await repository.delete(email);
        return userEmail;
    }

    /**
     * Restores a soft-deleted user record by email.
     *
     * @async
     * @param {string} email - Target user email address
     * @returns {Promise<void>}
     */
    async restore(email: string): Promise<void> {
        const userID = await repository.restore(email);
        return userID;
    }
}

export default new UserService();