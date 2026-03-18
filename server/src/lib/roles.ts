// src/lib/roles.ts
import { prisma } from '@/lib/prisma';
import { RoleType } from 'generated/prisma/client';

export const RoleIds: Record<RoleType, number> = {} as Record<RoleType, number>;

export async function loadRoles(retries = 5, delay = 2000): Promise<void> {
  try {
    const roles = await prisma.role.findMany();
    for (const role of roles) {
      RoleIds[role.type] = role.id;
    }
    console.log('✅ Roles loaded');
  } catch (error) {
    if (retries > 0) {
      console.log(
        `⏳ DB not ready, retrying in ${delay}ms... (${retries} retries left)`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      return loadRoles(retries - 1, delay);
    }
    throw new Error('❌ Failed to load roles after multiple retries');
  }
}
