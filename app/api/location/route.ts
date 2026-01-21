import { Location } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const locations = await prisma.location.findMany()

    if (locations.length === 0) {
        return NextResponse.json({ message: "No location yet" }, { status: 400 })
    }
    return NextResponse.json(locations)
}

export async function POST(req: NextRequest) {
    const { name } = await req.json()

    const exist = await prisma.location.findUnique({
        where: { name }
    })

    if (exist) return NextResponse.json({ message: 'Location name already exist' }, { status: 409 })

    const location = await prisma.location.create({ data: { name } })
    return NextResponse.json(location)
}

export async function PATCH(req: NextRequest) {
    const { id, name } = await req.json()
    const updateData: Partial<Pick<Location, 'name'>> = { name }

    const exist = await prisma.location.findUnique({
        where: { name }
    })

    if (exist) return NextResponse.json({ message: 'Location name already exist' }, { status: 409 })

    const location = await prisma.location.update({
        where: { id },
        data: updateData
    })
    return NextResponse.json(location)
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json()

    if (!id) return NextResponse.json({ error: "Location ID is required" }, { status: 400 })

    await prisma.location.delete({
        where: { id }
    })

    return NextResponse.json({ message: "Location deleted successfully" })
}