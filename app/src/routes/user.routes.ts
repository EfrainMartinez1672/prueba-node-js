// app/src/routes/user.routes.ts

/**
 * Rutas de Usuario
 * ----------------
 * Este archivo define las rutas HTTP relacionadas con la entidad `User`.
 *
 * Endpoints disponibles:
 *  - `POST /users/`        : Crear un nuevo usuario.
 *  - `PATCH /users/:id`    : Actualizar un usuario por ID.
 *  - `GET /users/`         : Obtener todos los usuarios registrados.
 *  - `POST /users/search`  : Buscar un usuario específico por email.
 *
 * Cada ruta se conecta con su respectivo controlador.
 */

import { Router } from "express";
import { createUser, deleteUser, getUsers, restoreUser, updateUser } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

/**
 * POST /
 *
 * ---
 * Crea un nuevo usuario en la base de datos.
 *
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *               - email
 *               - rol
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Luis Reyes"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "luisreyes@example.com"
 *               rol:
 *                 type: string
 *                 example: "user"
 *
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: "Luis Reyes"
 *               email: "luisreyes@example.com"
 *               rol: "user"
 *
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             example:
 *               error: "El correo ya existe"
 *
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "No se pudo crear el usuario"
 */
router.post("/", createUser);

/**
 * PATCH /:email
 * ----------
 * Actualiza la información de un usuario existente.
 *
 * @swagger
 * /api/users/{email}:
 *   patch:
 *     summary: Actualizar un usuario por email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: Email actual del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe Actualizado"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "nuevapass123"
 *               rol:
 *                 type: string
 *                 example: "admin"
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Petición inválida o datos mal formados
 *       401:
 *         description: No autenticado (Sesión no válida)
 *       403:
 *         description: No autorizado (Requiere rol de administrador)
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.patch("/:email", authMiddleware, roleMiddleware(["admin"]), updateUser);
/**
 * GET /
 *
 * ---
 * Obtiene la lista completa de usuarios registrados en la base de datos.
 *
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: "Luis Reyes"
 *                 email: "luisreyes@example.com"
 *                 rol: "user"
 *               - id: 2
 *                 name: "David Doe"
 *                 email: "david@example.com"
 *                 rol: "admin"
 *
 *       400:
 *         description: Solicitud inválida
 *         content:
 *           application/json:
 *             example:
 *               error: "Parámetros incorrectos"
 *
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error al obtener los usuarios"
 */
router.get("/", getUsers);

/**
 * DELETE /:email:
 * -----------
 * Elimina un usuario registrado en la base de datos a partir de su email.
 *
 * @swagger
 * /api/users/{email}:
 *   delete:
 *     summary: Eliminar usuario por email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email del usuario a eliminar
 *         schema:
 *           type: string
 *           example: "john.doe@example.com"
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               message: "Usuario eliminado correctamente"
 *               email: "john.doe@example.com"
 *       400:
 *         description: Solicitud inválida
 *         content:
 *           application/json:
 *             example:
 *               error: "Formato de email inválido"
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error al eliminar al usuario"
 */
router.delete("/:email", deleteUser);

/**
 * POST /restore/{email}:
 * -----------------
 * Restaura a un usuario registrado en la base de datos por su email.
 *
 * @swagger
 * /api/users/restore/{email}:
 *   post:
 *     summary: Restaurar usuario por email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email del usuario a restaurar
 *         schema:
 *           type: string
 *           example: "john.doe@example.com"
 *     responses:
 *       200:
 *         description: Usuario restaurado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               message: "Usuario restaurado correctamente"
 *               id: 1
 *       400:
 *         description: Solicitud inválida
 *         content:
 *           application/json:
 *             example:
 *               error: "Parámetros incorrectos"
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error al restaurar al usuario"
 */
router.post("/restore/:email", restoreUser);

export default router;
