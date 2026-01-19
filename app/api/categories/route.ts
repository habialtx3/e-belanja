import { Brand, Category } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const categories = await prisma.category.findMany()
    return NextResponse.json(categories)
}

export async function POST(req: NextRequest) {
    const { name } = await req.json()
    const category = await prisma.category.create({ data: { name } })
    return NextResponse.json(category)
}

export async function PATCH(req: NextRequest) {
    const { id, name } = await req.json()

    if (!id) return NextResponse.json({ error: "Category ID is required" }, { status: 400 })

    const updateData: Partial<Pick<Category, 'name'>> = { name }
    const category = await prisma.category.update({
        where: { id },
        data: updateData
    })
    return NextResponse.json(category)
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json()

    if (!id) return NextResponse.json({ error: "Category ID is required" }, { status: 400 })

    await prisma.category.delete({
        where: {id}
    })

    return NextResponse.json({message : "Category deleted successfully"})
}