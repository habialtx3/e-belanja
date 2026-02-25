'use server'

import { prisma } from "@/lib/prisma"
import { getProductById } from "@/services/product.service"


export async function getProduct(id: string) {
    try {
        return await prisma.product.findUnique({
            where: { id: Number(id) }
        })
    } catch (error) {
        console.error('Product not valid');
    }
}