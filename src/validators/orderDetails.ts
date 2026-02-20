import { z } from "zod"

export const orderDetailSchema = z.object({
    fullName: z.string().min(3, "Nama minimal 3 karakter"),
    address: z.string().min(5, "Alamat terlalu pendek"),
    city: z.string().min(2, "Kota terlalu pendek"),
    postCode: z.string().min(4, "Kode pos minimal 4 digit"),
    phone: z.string().min(8, "Nomor HP minimal 8 digit"),
})
