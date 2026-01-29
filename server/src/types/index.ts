export type UtilityType = "electricity" | "water" | "gas";
export type ReadingStatus = "paid" | "pending";

export type CreatePropertyPayload = {
  name: string;
  address?: string;
};

export type CreateTenantPayload = {
  propertyId: string;
  name: string;
  phone: string;
  email: string;
  apartmentNumber: string;
  leaseStartDate: string;
  leaseEndDate: string;
  monthlyRent: number;
};

export type CreateReadingPayload = {
  tenantId: string;
  type: UtilityType;
  readingValue: number;
  date: string;
  status?: ReadingStatus;
};
