import { z } from "zod"

export const createProductSchema = z.object({
    brand_id: z.number(),
    category_id: z.number(),
    location_id: z.number(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    stock: z.number(),
    images: z.array(z.string())
})

export const updateProductSchema = createProductSchema.partial()

