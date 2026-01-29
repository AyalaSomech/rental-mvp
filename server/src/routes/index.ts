import { Router } from "express";
import { propertiesRouter } from "./properties.js";
import { tenantsRouter } from "./tenants.js";
import { readingsRouter } from "./readings.js";

export const apiRouter = Router();

apiRouter.use("/properties", propertiesRouter);
apiRouter.use("/tenants", tenantsRouter);
apiRouter.use("/readings", readingsRouter);
