import { NextFunction, Request, Response } from "express";
import { SeedDataPayload, SeederSummary } from "../dto/seed-data.dto";
import seederService from "../services/seeder.service";

/**
 * Controller handling seed data HTTP requests.
 */
class SeederController {
    /**
     * Endpoint handler for uploading and processing JSON seed files.
     *
     * @async
     * @param {Request} req - Express Request object containing `req.file`.
     * @param {Response} res - Express Response object.
     * @param {NextFunction} next - Express Next Function.
     * @returns {Promise<void>}
     */
    async uploadSeedFile(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const file: Express.Multer.File | undefined = req.file;

            if (!file) {
                res.status(400).json({
                    success: false,
                    message: "Please attach a valid .json file under the key 'file'.",
                });
                return;
            }

            const jsonString: string = file.buffer.toString("utf-8");
            const parsedData: SeedDataPayload = JSON.parse(jsonString);

            const summary: SeederSummary = await seederService.seedDatabase(parsedData);

            res.status(201).json({
                success: true,
                message: "Database seeded successfully.",
                data: summary,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new SeederController();