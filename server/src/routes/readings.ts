import { Router } from "express";
import {
  createReadingController,
  listReadingsByTenantController,
} from "../controllers/readingsController.js";

export const readingsRouter = Router();

readingsRouter.post("/", createReadingController);
readingsRouter.get("/:tenantId", listReadingsByTenantController);
