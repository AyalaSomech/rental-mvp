import { prisma } from "../config/db.js";
import type { CreateTenantPayload } from "../types/index.js";

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

export const createTenant = async (payload: CreateTenantPayload) => {
  const propertyId = requireString(payload.propertyId, "propertyId");
  const name = requireString(payload.name, "name");
  const phone = requireString(payload.phone, "phone");
  const email = requireString(payload.email, "email");
  const apartmentNumber = requireString(payload.apartmentNumber, "apartmentNumber");
  const leaseStartDate = requireString(payload.leaseStartDate, "leaseStartDate");
  const leaseEndDate = requireString(payload.leaseEndDate, "leaseEndDate");
  const monthlyRent = requireNumber(payload.monthlyRent, "monthlyRent");

  const tenant = await prisma.tenant.create({
    data: {
      propertyId,
      name,
      phone,
      email,
      apartmentNumber,
      leaseStartDate: new Date(leaseStartDate),
      leaseEndDate: new Date(leaseEndDate),
      monthlyRent,
    },
  });

  return {
    ...tenant,
    leaseStartDate: formatDate(tenant.leaseStartDate),
    leaseEndDate: formatDate(tenant.leaseEndDate),
  };
};

export const listTenants = async () => {
  const tenants = await prisma.tenant.findMany({
    orderBy: { createdAt: "desc" },
  });

  return tenants.map((tenant) => ({
    ...tenant,
    leaseStartDate: formatDate(tenant.leaseStartDate),
    leaseEndDate: formatDate(tenant.leaseEndDate),
  }));
};
