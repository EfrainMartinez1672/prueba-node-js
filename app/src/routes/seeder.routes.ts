// app/src/routes/seeder.routes.ts

import { Router } from "express";
import seederController from "../controllers/seeder.controller";
import { uploadJson } from "../middlewares/upload.middleware";

const router = Router();

/**
 * @swagger
 * /api/seeder/upload:
 *   post:
 *     summary: Carga masiva y población de la base de datos mediante archivo JSON
 *     tags: [Seeder]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Archivo .json con los registros iniciales (users, clinics, warehouses, medicines)
 *     responses:
 *       201:
 *         description: Base de datos poblada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Database seeded successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: integer
 *                       example: 5
 *                     clinics:
 *                       type: integer
 *                       example: 2
 *                     warehouses:
 *                       type: integer
 *                       example: 2
 *                     medicines:
 *                       type: integer
 *                       example: 10
 *       400:
 *         description: Archivo no adjuntado o extensión/formato inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Please attach a valid .json file under the key 'file'.
 *       500:
 *         description: Error interno en la transacción de la base de datos
 */
router.post(
    "/upload",
    uploadJson.single("file"),
    seederController.uploadSeedFile
);

export default router;