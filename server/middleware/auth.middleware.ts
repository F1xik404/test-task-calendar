import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    id: number;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[0];

    if (!token) {
        console.log("No token provided!");
        res.status(401).json({ message: "Access Denied. No Token Provided!" });
    } else {
        const decoded = jwt.verify(token, String(process.env.JWT_SECRET)) as JwtPayload;
        if (!decoded) {
            res.status(403).json({ message: "Invalid or Expired Token!" });
        } else {
            (req as any).user = { id: decoded.id };
            next();
        }
    }
};
