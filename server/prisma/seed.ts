import { RoleType } from '../generated/prisma/client';
import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';

async function main() {
  // ── ROLES ──
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
  console.log('✓ Roles seeded');

  // ── USER ──
  const ownerRole = await prisma.role.findUniqueOrThrow({
    where: { type: RoleType.OWNER },
  });

  const user = await prisma.user.upsert({
    where: { email: 'test@kodo.com' },
    update: {},
    create: {
      email: 'test@kodo.com',
      username: 'testuser',
      password: await bcrypt.hash('password', 10),
    },
  });
  console.log('✓ User seeded:', user.email);

  // ── SPACE + CHANNELS ──
  const existing = await prisma.space.findFirst({ where: { name: 'Kodo HQ' } });

  if (!existing) {
    await prisma.space.create({
      data: {
        name: 'Kodo HQ',
        spaceMembers: {
          create: { userId: user.id, roleId: ownerRole.id },
        },
        channels: {
          create: [
            { name: 'general' },
            { name: 'design' },
            { name: 'engineering' },
            { name: 'releases' },
            { name: 'random' },
          ],
        },
        isPremium: false,
        inviteCodes: {
          create: { code: randomUUID(), userId: user.id },
        },
      },
    });
    console.log('✓ Space and channels seeded');
  } else {
    console.log('✓ Space already exists, skipping');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
