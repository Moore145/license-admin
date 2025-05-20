import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create some license entries
  await prisma.license.createMany({
    data: [
      {
        key: 'LICENSE-1234-ABCD',
        email: 'user1@example.com',
        expiresAt: new Date('2025-12-31'),
        isActive: true,
      },
      {
        key: 'LICENSE-5678-EFGH',
        email: 'user2@example.com',
        expiresAt: new Date('2024-06-30'),
        isActive: false,
      },
    ],
  })

  // Fetch all licenses
  const licenses = await prisma.license.findMany()
  console.log('All licenses:', licenses)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
