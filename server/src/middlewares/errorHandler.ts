import type { NextFunction, Request, Response } from "express";

type ApiError = {
  statusCode?: number;
  message: string;
};

export const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = err.statusCode ?? 500;
  res.status(status).json({
    message: err.message ?? "Internal server error",
  });
};
