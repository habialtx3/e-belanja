'use server'
import { ProductStock } from "@/generated/prisma/enums"
import { postProduct } from "@/services/product.service"
import { redirect } from "next/navigation"

export async function createProductAction(formData: FormData) {
    
    const data = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: BigInt(formData.get("price") as string),
        brand: {
            connect: { id: Number(formData.get('brand_id')) }
        },
        category: {
            connect: { id: Number(formData.get('category_id')) }
        },
        location: {
            connect: { id: Number(formData.get('location_id')) }
        },
        stock : formData.get("stock") as ProductStock,
        images: formData.get("images") as string,
    }

    await postProduct({
        ...data,
        images: [data.images]
    })

    redirect('/dashboard/products')
}

export async function getProduct(id : string) {
    
}