/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";

export interface HTTPError extends Error {
  status?: number;
}

export function apiErrorHandle(
  error: HTTPError,
  _: Partial<Request>,
  res: Response,
  __: NextFunction
): void {
  const errorCode = error.status || 500;

  // Basic error handler
  if (errorCode >= 400 && errorCode <= 409) {
    res
      .status(errorCode)
      .json({ status: errorCode, message: error.message })
      .end();
  } else if (errorCode >= 500 && errorCode <= 509) {
    res
      .status(errorCode)
      .json({ status: errorCode, message: error.message })
      .end();
  }
}
