import type { NextFunction, Request, Response } from "express";
import {
  createReading,
  listReadingsByTenant,
} from "../services/readingService.js";

export const createReadingController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reading = await createReading(req.body);
    res.status(201).json(reading);
  } catch (error) {
    next(error);
  }
};

export const listReadingsByTenantController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const readings = await listReadingsByTenant(req.params.tenantId);
    res.json(readings);
  } catch (error) {
    next(error);
  }
};
