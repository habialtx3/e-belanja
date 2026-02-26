'use server'
import { ProductStock } from "@/generated/prisma/enums"
import { postProduct } from "@/services/product.service"
import { createProductSchema } from "@/validators/product"
import { redirect } from "next/navigation"

export interface ActionState {
    errors?: {
        name?: string[]
        description?: string[]
        price?: string[]
        brand_id?: string[]
        category_id?: string[]
        location_id?: string[]
        stock?: string[]
        images?: string[]
    }
}


export async function createProductAction(prevState: ActionState, formData: FormData): Promise<ActionState> {

    const rawData = {
        name: formData.get("name"),
        description: formData.get("description"),
        price: Number(formData.get("price")),
        brand_id: Number(formData.get("brand_id")),
        category_id: Number(formData.get("category_id")),
        location_id: Number(formData.get("location_id")),
        stock: Number(formData.get("stock")),
        images: [formData.get("images")]
    }

    const parsed = createProductSchema.safeParse(rawData)

    if (!parsed.success) {
        return {
            errors: parsed.error.flatten().fieldErrors
        }
    }

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
        stock: formData.get("stock") as ProductStock,
        images: formData.get("images") as string,
    }



    await postProduct({
        ...data,
        images: [data.images]
    })

    redirect('/dashboard/products')
}

export async function editProductAction(id: string, prevState: ActionState, formData: FormData): Promise<ActionState> {
    const rawData = {
        name: formData.get("name"),
        description: formData.get("description"),
        price: Number(formData.get("price")),
        brand_id: Number(formData.get("brand_id")),
        category_id: Number(formData.get("category_id")),
        location_id: Number(formData.get("location_id")),
        stock: formData.get("stock"),
        images: [formData.get("images")]
    }

    const parsed = createProductSchema.safeParse(rawData)

    if (!parsed.success) {
        return {
            errors: parsed.error.flatten().fieldErrors
        }
    }

    console.log(parsed);


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
        stock: formData.get("stock") as ProductStock,
        images: formData.get("images") as string,
    }




    return {}
}