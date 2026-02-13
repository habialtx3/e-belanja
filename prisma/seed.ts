import { ProductStock, RoleUser, StatusOrder } from '@/generated/prisma/enums';
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


// async function main() {
//   const passwordAdmin = await bcrypt.hash('admin', 12)
//   const passwordCustomer = await bcrypt.hash('customer', 12)

//   await prisma.user.createMany({
//     data: [
//       {
//         name: 'admin',
//         email: 'admin@gmail.com',
//         password: passwordAdmin,
//         role: RoleUser.superadmin
//       },
//       {
//         name: 'customer',
//         email: 'customer@gmail.com',
//         password: passwordCustomer,
//         role: RoleUser.customer
//       },
//     ],
//     skipDuplicates: true, // biar gak error kalau data sudah ada
//   })

//   console.log('Users seeded!')
// }


// async function main() {
//   const locationsData = [
//     { name: "Jakarta" },
//     { name: "Bandung" },
//     { name: "Surabaya" },
//     { name: "Medan" },
//     { name: "Batam" }
//   ];

//   for (const loc of locationsData) {
//     // create jika belum ada
//     const exists = await prisma.location.findUnique({
//       where: { name: loc.name }
//     });


//     if (!exists) {
//       await prisma.location.create({ data: loc });
//     }
//   }

//   console.log("Seed Location selesai!");
// }

// async function main() {
//   const brands = await prisma.brand.findMany();
//   const categories = await prisma.category.findMany();
//   const locations = await prisma.location.findMany();

//   if (!brands.length || !categories.length || !locations.length) {
//     console.log("Seed Brand/Category/Location dulu!");
//     return;
//   }

//   const productsData = [
//     {
//       name: "Laptop MacBook Pro",
//       description: "Laptop Apple MacBook Pro 16 inch",
//       price: BigInt(30000000),
//       stock: ProductStock.ready,
//       brand_id: brands[0].id,
//       category_id: categories[0].id,
//       location_id: locations[0].id,
//       images: ["macbook1.png", "macbook2.png"]
//     },
//     {
//       name: "iPhone 14",
//       description: "Smartphone Apple iPhone 14",
//       price: BigInt(15000000),
//       stock: ProductStock.preorder,
//       brand_id: brands[2].id,
//       category_id: categories[0].id,
//       location_id: locations[0].id,
//       images: ["iphone14.png"]
//     }
//   ];

//   for (const product of productsData) {
//     await prisma.product.create({ data: product });
//   }

//   console.log("Seed products berhasil!");
// }

async function main() {
  const user = await prisma.user.findFirst()
  const products = await prisma.product.findMany({
    take: 3
  })

  if (!user || products.length === 0) {
    throw new Error("User / Product belum ada");
  }

  const order1 = await prisma.order.create({
    data: {
      code: "ORD-001",
      user_id: user.id,
      total: 0,
      status: StatusOrder.pending,
    }
  })

  let totalOrder1 = 0

  for (const product of products) {
    const quantity = 2
    const subtotal = Number(product.price) * quantity

    await prisma.orderProduct.create({
      data: {
        order_id: order1.id,
        product_id: product.id,
        quantity,
        subtotal
      }
    })

    totalOrder1 += subtotal
  }

  await prisma.order.update({
    where: { id: order1.id },
    data: {
      total: totalOrder1
    }
  })

  const order2 = await prisma.order.create({
    data: {
      code: "ORD-002",
      user_id: user.id,
      total: 0,
      status: StatusOrder.pending,
    }
  })

  const product = products[2]
  const quantity = 2
  const subtotal = Number(product.price) * quantity

   await prisma.orderProduct.create({
    data: {
      order_id: order2.id,
      product_id: product.id,
      quantity,
      subtotal
    }
  })

  await prisma.order.update({
    where: { id: order2.id },
    data: {
      total: subtotal
    }
  })
  
  console.log("Seed Order & OrderProduct success")
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
