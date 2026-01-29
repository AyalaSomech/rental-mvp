import type { NextFunction, Request, Response } from "express";
import { createProperty, listProperties } from "../services/propertyService.js";

export const createPropertyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const property = await createProperty(req.body);
    res.status(201).json(property);
  } catch (error) {
    next(error);
  }
};

export const listPropertiesController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const properties = await listProperties();
    res.json(properties);
  } catch (error) {
    next(error);
  }
};
