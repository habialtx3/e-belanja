import { prisma } from "@/lib/prisma";
import { updateProductSchema } from "@/validators/product";
import { NextResponse } from "next/server";

const imgPath = `/upload/products/`

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params

        if (!id) return NextResponse.json({ message: 'Id is required' }, { status: 500 })
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
            include: {
                brand: true,
                category: true,
                location: true,
            }
        })

        if (!product) return NextResponse.json({ message: "Product not found" }, { status: 500 })

        const productString = { ...product, price: product.price.toString() }

        return NextResponse.json({ message: "Get by Id Success", product: productString })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 })
    }
}

export async function UPDATE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params
        if (!id) return NextResponse.json({ message: "Id is required" }, { status: 500 })

        const body = updateProductSchema.parse(await req.json());

        if (body.images) {
            body.images = body.images.map(img => `${imgPath}${img}`);
        }

        if (body.price !== undefined) {
            body.price = BigInt(body.price) as any;
        }

        const product = await prisma.product.update({
            where: { id: parseInt(id) },
            data: body as any
        });

        const productString = { ...product, price: product.price.toString() }

        return NextResponse.json({ message: "Updated Product Success", product: productString })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 })
    }
}

