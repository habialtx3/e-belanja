import { authGuard, requireAdmin } from "@/lib/auth/guard"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

const imgPath = `/upload/products/`

export async function GET() {
    try {
        const products = await prisma.product.findMany(
            {
                include: {
                    brand: true,
                    category: true,
                    location: true,
                }
            }
        )
        if (products.length === 0) return NextResponse.json({ message: "No Product Yet" }, { status: 400 })

        const productString = products.map((p) => ({
            ...p,
            price: p.price.toString()
        }))

        return NextResponse.json({ productString })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 })
    }
}


export async function POST(req: NextRequest) {
    const user = await requireAdmin()
    if (user instanceof NextResponse) return user
    try {
        const {
            brand_id,
            category_id,
            location_id,
            name,
            description,
            price,
            stock,
            images
        } = await req.json()

        const fullPath = images.map((img: string) => `${imgPath}${img}`)
        const product = await prisma.product.create(
            {
                data: {
                    brand_id,
                    category_id,
                    location_id,
                    name,
                    description,
                    price: BigInt(price),
                    stock,
                    images: fullPath
                }
            }
        )
        const productString = { ...product, price: product.price.toString() }
        return NextResponse.json(productString)
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 })
    }

}

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json()
        if (!id) return NextResponse.json({ error: "Product id is required" })
        await prisma.product.delete({
            where: { id }
        })

        return NextResponse.json({ message: 'Product has been deleted' }, { status: 400 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 })
    }
}