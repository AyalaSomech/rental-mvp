import type { NextFunction, Request, Response } from "express";
import { createTenant, listTenants } from "../services/tenantService.js";

export const createTenantController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tenant = await createTenant(req.body);
    res.status(201).json(tenant);
  } catch (error) {
    next(error);
  }
};

export const listTenantsController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tenants = await listTenants();
    res.json(tenants);
  } catch (error) {
    next(error);
  }
};
