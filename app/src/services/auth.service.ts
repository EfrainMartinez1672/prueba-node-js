import User from "../models/user.model";
import { compare_password, hash_password } from "../utils/auth";

/**
 * Auth User Service
 * -----------------
 * Class containing utility methods for password hashing and credential verification.
 */
class AuthUser {
    /**
     * Hashes a plain-text password using the configured hashing algorithm.
     *
     * @async
     * @param {string} password - Plain-text password to hash
     * @returns {Promise<string>} Promise resolving to the hashed password string
     */
    async hashing(password: string): Promise<string> {
        return hash_password(password);
    }

    /**
     * Authenticates a user by comparing a plain-text password against the stored password hash.
     *
     * @async
     * @param {User} user - User model instance retrieved from the database
     * @param {string} passwordPlain - Plain-text password provided during login
     * @returns {Promise<User>} Promise resolving to the authenticated User instance
     * @throws {Error} Throws an error if password verification fails
     */
    async login(user: User, passwordPlain: string): Promise<User> {
        const isMatch = await compare_password(passwordPlain, user.password);

        if (!isMatch) {
            throw new Error("password incorrect.");
        }

        return user;
    }
}

export default new AuthUser();