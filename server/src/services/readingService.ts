import { Reading } from "@prisma/client/wasm";
import { prisma } from "../config/db.js";
import type { CreateReadingPayload, UtilityType } from "../types/index.js";

const requireString = (value: unknown, field: string) => {
  if (typeof value !== "string" || value.trim() === "") {
    const error = new Error(`"${field}" is required`);
    (error as { statusCode?: number }).statusCode = 400;
    throw error;
  }
  return value.trim();
};

const requireNumber = (value: unknown, field: string) => {
  const parsed = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(parsed)) {
    const error = new Error(`"${field}" must be a number`);
    (error as { statusCode?: number }).statusCode = 400;
    throw error;
  }
  return parsed;
};

const formatDate = (value: Date) => value.toISOString().slice(0, 10);

const ensureUtilityType = (value: string): UtilityType => {
  if (value === "electricity" || value === "water" || value === "gas") {
    return value;
  }
  const error = new Error(`"type" must be electricity, water, or gas`);
  (error as { statusCode?: number }).statusCode = 400;
  throw error;
};

const ensureStatus = (value: string) => {
  if (value === "paid" || value === "pending") {
    return value;
  }
  const error = new Error(`"status" must be paid or pending`);
  (error as { statusCode?: number }).statusCode = 400;
  throw error;
};

export const createReading = async (payload: CreateReadingPayload) => {
  const tenantId = requireString(payload.tenantId, "tenantId");
  const type = ensureUtilityType(requireString(payload.type, "type"));
  const readingValue = requireNumber(payload.readingValue, "readingValue");
  const date = requireString(payload.date, "date");
  const status = payload.status ? ensureStatus(payload.status) : undefined;

  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
    select: { id: true, propertyId: true },
  });

  if (!tenant) {
    const error = new Error("Tenant not found");
    (error as { statusCode?: number }).statusCode = 404;
    throw error;
  }

  const meter = await prisma.meter.upsert({
    where: {
      propertyId_type: {
        propertyId: tenant.propertyId,
        type,
      },
    },
    update: {},
    create: {
      propertyId: tenant.propertyId,
      type,
    },
  });

  const reading = await prisma.reading.create({
    data: {
      tenantId: tenant.id,
      meterId: meter.id,
      type,
      readingValue,
      date: new Date(date),
      status: status ?? "pending",
    },
  });

  return {
    ...reading,
    date: formatDate(reading.date),
  };
};

export const listReadingsByTenant = async (tenantId: string) => {
  const id = requireString(tenantId, "tenantId");
  const readings = await prisma.reading.findMany({
    where: { tenantId: id },
    orderBy: { date: "desc" },
  });

  return readings.map((reading: Reading) => ({
    ...reading,
    date: formatDate(reading.date as Date),
  }));
};
