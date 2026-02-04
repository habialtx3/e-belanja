import { ProductStock } from "./common"
import { Brand, Category, Location } from "./meta"

export type Product = {
    id: number
    name: string
    description: string
    price: number
    stock: ProductStock
    images: string[]
    brand: Brand
    category: Category
    location: Location
    created_at: string,
    updated_at: string,
}