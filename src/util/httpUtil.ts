import jwt from "jsonwebtoken";
import baseUtil from "@src/util/baseUtil";
import { NextFunction, Request, Response } from "express";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    res.status(401).json({ message: "Unauthorized" }).end();
    return;
  }

  const idToken = req.headers.authorization.split("Bearer ")[1];
  jwt.verify(idToken, baseUtil.JWT_KEY, (error, decoded) => {
    if (error) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    } else {
      req.body.user = decoded;
      return next();
    }
  });
};

export const isNullOrWhiteSpace = (input: string | null) => {
  if (typeof input === "undefined" || input == null || input == "") return true;
  return typeof input === "string"
    ? input.replace(/\s/g, "").length < 1
    : false;
};
