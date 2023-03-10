import { Request, Response, NextFunction } from "express";
import AuthService from "@src/services/auth";

export function authMiddleware(
  req: Partial<Request>,
  res: Response,
  next: NextFunction
): void {
  try {
    if (
      !req.headers?.authorization ||
      !req?.headers?.authorization.startsWith("Bearer ")
    ) {
      res?.status(403).json({ message: "Unauthorized" }).end();
      return;
    }

    const idToken = req.headers.authorization.split("Bearer ")[1];
    const claims = AuthService.decodeToken(idToken as string);
    req.context = { userId: claims.sub };
    next();
  } catch (err) {
    if (err instanceof Error) {
      res.status?.(401).send({ code: 401, error: err.message });
    } else {
      res.status?.(401).send({ code: 401, error: "Unknown auth error" });
    }
  }
}
