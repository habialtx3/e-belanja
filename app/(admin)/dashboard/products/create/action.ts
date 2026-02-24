'use server'
import { postProduct } from "@/services/product.service"

export async function createProductAction(formData: FormData) {
    const data = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: Number(formData.get("price")),
        brand_id: Number(formData.get("brand_id")),
        category_id: Number(formData.get("category_id")),
        location_id: Number(formData.get("location_id")),
        stock: formData.get("stock") as string,
        image: formData.get("image") as string,
    }

    await postProduct(data)
}