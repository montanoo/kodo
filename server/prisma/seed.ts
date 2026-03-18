import { RoleType } from '../generated/prisma/client';
import { prisma } from '../src/lib/prisma';

async function main() {
  const roles = [
    { type: RoleType.OWNER },
    { type: RoleType.ADMIN },
    { type: RoleType.MEMBER },
    { type: RoleType.GUEST },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { type: role.type },
      update: {},
      create: role,
    });
  }

  console.log('Roles seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
