"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllOrganizations = async () => {
  try {
    const allOrgs = await prisma.organization.findMany();
    return allOrgs;
  } catch (error) {
    console.log("Error getting organization from DB", error);
  }
};
