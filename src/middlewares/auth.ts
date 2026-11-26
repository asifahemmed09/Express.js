import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
import type { Role } from "../types";

const auth = (...roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }
      const payLoad = jwt.verify(
        token as string,
        config.jwt_secret_key,
      ) as JwtPayload;
      const email = payLoad.email;
      const user = await pool.query(
        `
            SELECT * FROM users WHERE email=$1
        `,
        [email],
      );
      if (user.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      if (roles.length && !roles.includes(user.rows[0].role)) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized Access",
        });
      }
      req.user = payLoad;
      next();
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error?.message,
        error,
      });
    }
  };
};
export default auth;
