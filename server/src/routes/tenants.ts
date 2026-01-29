import { Router } from "express";
import {
  createTenantController,
  listTenantsController,
} from "../controllers/tenantsController.js";

export const tenantsRouter = Router();

tenantsRouter.post("/", createTenantController);
tenantsRouter.get("/", listTenantsController);
