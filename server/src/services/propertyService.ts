import { prisma } from "../config/db.js";
import type { CreatePropertyPayload } from "../types/index.js";

const requireString = (value: unknown, field: string) => {
  if (typeof value !== "string" || value.trim() === "") {
    const error = new Error(`"${field}" is required`);
    (error as { statusCode?: number }).statusCode = 400;
    throw error;
  }
  return value.trim();
};

export const createProperty = async (payload: CreatePropertyPayload) => {
  const name = requireString(payload.name, "name");
  const address =
    typeof payload.address === "string" ? payload.address.trim() : undefined;

  return prisma.property.create({
    data: { name, address },
  });
};

export const listProperties = async () => {
  return prisma.property.findMany({
    orderBy: { createdAt: "desc" },
  });
};
