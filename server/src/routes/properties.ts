import { Router } from "express";
import {
  createPropertyController,
  listPropertiesController,
} from "../controllers/propertiesController.js";

export const propertiesRouter = Router();

propertiesRouter.post("/", createPropertyController);
propertiesRouter.get("/", listPropertiesController);
