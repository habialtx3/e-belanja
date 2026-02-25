import { z } from "zod"

export const createProductSchema = z.object({
    brand_id: z.number().min(1, "Pilih salah satu"),
    category_id: z.number().min(1, "Pilih category"),
    location_id: z.number().min(1, "Pilih lokasi"),
    name: z.string().min(5, "Nama minimal 5 karakter"),
    description: z.string().min(3, "Nama minimal 2 karakter"),
    price: z.number().min(1, "Harga minimal 1"),  
    stock: z.number().min(1, "Stok harus diisi"),
    images: z.array(z.string().min(3, "URL gambar minimal 3 karakter"))
})

export const updateProductSchema = createProductSchema.partial()

