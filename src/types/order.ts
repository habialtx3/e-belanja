import type { User } from './user'
import type { Product } from './product'
import type { StatusOrder } from './common'

export type OrderProduct = {
    id: number
    product: Product
    quantity: number
    subtotal: number
}

export type OrderDetail = {
    name: string
    phone: string
    address: string
    city: string
    postal_code: string
    notes?: string
}

export type Order = {
    id: number
    code: string
    total: number
    status: StatusOrder
    user: User
    detail?: OrderDetail
    products: OrderProduct[]
    created_at: string
    updated_at: string
}
