import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function getProducts() {
    const res = await fetch("http://localhost:3000/api/products", {
        cache: "no-store"
    })

    if (!res.ok) throw new Error("Failed to fetch Products");

    const data = await res.json()

    return data.productString
}

export async function getProductById(id: number) {
    const res = await fetch(`http://localhost:3000/api/products/${id}`)

    if (!res.ok) throw new Error(`Failed to fetch product ${id}`)
    const data = await res.json()
    return data.product
}

export async function postProduct(data: Prisma.ProductCreateInput) {
    try {
        const product = await prisma.product.create({
            data
        })
    
        return product 
    } catch (error) {
        console.error("Error creating product:", error)
        throw error
    }
}

export async function updateProduct(id : number, data : Prisma.ProductUpdateInput){
    try {
        const newData = data

        const updatedProduct = await prisma.product.update({
            where : {id},
            data : data
        })

        return updatedProduct
    } catch (error) {
        console.error("Error updating data",error);        
    }
}