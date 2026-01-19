import { prisma } from '@/lib/prisma';

async function main() {
  await prisma.brand.createMany({
    data: [
      { name: 'Apple', logo: '/assets/logos/apple.svg' },
      { name: 'Samsung', logo: '/assets/logos/samsung.svg' },
      { name: 'Xiaomi', logo: '/assets/logos/xiaomi.svg' },
    ],
    skipDuplicates: true,
  })
  console.log('Brands seeded!')
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
