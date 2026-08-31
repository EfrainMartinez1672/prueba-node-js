// app/src/repositories/user.repository.ts

import User, { UserCreationAttributes } from "../models/user.model";
import { IUserRepository } from "./interfaces/user.repository.interface";

/**
 * User Repository
 * ---------------
 * Implements the Repository pattern to encapsulate all persistence operations
 * related to the User entity.
 *
 * This class is solely responsible for interacting with Sequelize.
 */

class UserRepository implements IUserRepository {
    /**
     * Creates a new user.
     */
    async create(data: UserCreationAttributes): Promise<User> {
        return await User.create(data);
    }

    /**
     * Retrieves all users (excluding sensitive attributes like password).
     */
    async findAll(): Promise<User[]> {
        return await User.findAll({
            attributes: { exclude: ["password"] },
        });
    }

    /**
     * Retrieves a user by their email address.
     *
     * @param {string} email - User email address
     *
     * @returns {Promise<User>} - Returns the user instance
     *
     * @throws {Error} - Error message if the user does not exist
     */
    async findOne(email: string): Promise<User> {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error("Usuario o contraseña incorrectos");
        }
        return user;
    }

    /**
     * Updates an existing user record identified by email.
     *
     * @param {string} email - Target user email address
     * @param {Partial<UserCreationAttributes>} data - Attributes to update
     * @returns {Promise<User | null>} Updated user instance or null if not found
     */
    async update(email: string, data: Partial<UserCreationAttributes>): Promise<User | null> {
        const user = await User.findOne({ where: { email } });
        if (user) {
            return await user.update(data);
        }
        return null;
    }

    /**
     * Deletes a user record matching the given email.
     *
     * @param {string} email - Target user email address
     * @returns {Promise<Boolean>} True if one or more rows were deleted, false otherwise
     */
    async delete(email: string): Promise<Boolean> {
        const row = await User.destroy({ where: { email } });
        return row > 0;
    }

    /**
     * Restores a soft-deleted user record by email.
     *
     * @param {string} email - Target user email address
     * @returns {Promise<void>}
     */
    async restore(email: string): Promise<void> {
        const row = User.restore({ where: { email } });
        return row;
    }
}

export default new UserRepository();