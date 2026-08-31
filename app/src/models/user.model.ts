// app/src/models/user.model.ts

/**
 * Modelo de Usuario
 * -----------------
 * Este archivo define el modelo `User` de Sequelize, que representa
 * la tabla `users` en la base de datos.
 *
 * Un usuario representa cualquier persona registrada en la plataforma,
 * ya sea un cliente, administrador o empleado del cine.
 */

import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { hash_password } from "../utils/auth";

/**
 * Atributos principales de la entidad User.
 */
export interface UserAttributes {
    id: number;
    email: string;
    password: string;
    name: string;
    rol: string;
}

/**
 * Atributos utilizados durante la creación.
 */
export interface UserCreationAttributes extends Optional<
    UserAttributes,
    "id" | "email" | "name" | "password" | "rol"
> {}

/**
 * Clase que representa el modelo User.
 */
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    /** Identificador del usuario. */
    public id!: number;

    /** Correo electrónico. */
    public email!: string;

    /** Hash de la contraseña. */
    public password!: string;

    /** Nombre del usuario. */
    public name!: string;

    /** Rol del usuario. */
    public rol!: string;
}

/**
 * Inicialización del modelo User.
 */
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },

        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "password_hash",
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: "first_name",
        },

        rol: {
            type: DataTypes.STRING(30),
            allowNull: false,
            defaultValue: "user",
        },
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,
        paranoid: true,
        hooks: {
            beforeCreate: async (user: User) => {
                if (user.password) {
                    user.password = await hash_password(user.password);
                }
            },
            beforeUpdate: async (user: User) => {
                if (user.password) {
                    user.password = await hash_password(user.password);
                }
            },
        },
    },
);

export default User;
