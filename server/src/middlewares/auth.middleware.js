import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-errors.js";

export default function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            throw ApiError.UnauthorizedError();
        }
        const { username } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = username;

        next();
    } catch (error) {
        throw ApiError.UnauthorizedError();
    }
}
