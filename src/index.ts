import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Example query
  const allUsers = await prisma.location.findMany();
  console.log(allUsers);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });