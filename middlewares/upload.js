import multer from "multer";
import path from "node:path";

import HttpError from "../helpers/HttpError.js";

const destination = path.resolve("temp");
const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "tiff"];
const limits = {
    fileSize: 1024 * 1024 * 5,
}

const storage = multer.diskStorage({
    destination,
    filename: (req, file, callback)=> {
        const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
        const filename = `${uniquePrefix}_${file.originalname}`;
        callback(null, filename);
    }
});

const fileFilter = (req, file, callback)=> {
    const extension = file.originalname.split(".").pop();

    if(!allowedExtensions.includes(extension)) {
        return callback(HttpError(400, `File extension ${extension} is not allowed`));
    }
    callback(null, true);
}

const upload = multer({
    storage,
    limits,
    fileFilter,
})

export default upload;