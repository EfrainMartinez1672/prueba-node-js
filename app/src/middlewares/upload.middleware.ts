import multer, { FileFilterCallback, StorageEngine } from "multer";

const storage: StorageEngine = multer.memoryStorage();

export const uploadJson = multer({
    storage,
    fileFilter: (_req, file, cb: FileFilterCallback) => {
        if (file.mimetype === "application/json" || file.originalname.endsWith(".json")) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file format. Only .json files are allowed."));
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});