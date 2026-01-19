import { RoleUser } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// async function main() {
//   await prisma.brand.createMany({
//     data: [
//       { name: 'Apple', logo: '/assets/logos/apple.svg' },
//       { name: 'Samsung', logo: '/assets/logos/samsung.svg' },
//       { name: 'Xiaomi', logo: '/assets/logos/xiaomi.svg' },
//     ],
//     skipDuplicates: true,
//   })
//   console.log('Brands seeded!')
// }

// async function main() {
//   await prisma.category.createMany({
//     data: [
//       { name: 'Electronics' },
//       { name: 'Fashion' },
//       { name: 'Home & Kitchen' },
//       { name: 'Books' },
//       { name: 'Toys & Games' },
//       { name: 'Sports' },
//       { name: 'Beauty & Health' },
//     ],
//     skipDuplicates: true, // biar gak error kalau data sudah ada
//   })

//   console.log('Categories seeded!')
// }


async function main() {
  const passwordAdmin = await bcrypt.hash('admin', 12)
  const passwordCustomer = await bcrypt.hash('customer', 12)

  await prisma.user.createMany({
    data: [
      {
        name: 'admin',
        email: 'admin@gmail.com',
        password: passwordAdmin,
        role: RoleUser.superadmin
      },
      {
        name: 'customer',
        email: 'customer@gmail.com',
        password: passwordCustomer,
        role: RoleUser.customer
      },
    ],
    skipDuplicates: true, // biar gak error kalau data sudah ada
  })

  console.log('Users seeded!')
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
