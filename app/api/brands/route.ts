import { Brand } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server'

const logoPath = '/assets/logos/'


export async function GET() {
    const brands = await prisma.brand.findMany()
    return NextResponse.json(brands)
}

export async function POST(req: NextRequest) {
    const { name, logo } = await req.json()
    const fullPath = `${logoPath}${logo}`
    const brand = await prisma.brand.create({ data: { name, logo: fullPath } })
    return NextResponse.json(brand)
}


export async function PATCH(req: NextRequest) {
    const { id, name, logo } = await req.json()

    if (!id) {
        return NextResponse.json({ error: "Brand ID is required" }, { status: 400 })
    }

    const updateData: Partial<Pick<Brand, 'name' | 'logo'>> = { name }

    // tambahkan logoPath hanya jika logo baru dikirim
    if (logo) {
        updateData.logo = `${logoPath}${logo}`
    }

    const brand = await prisma.brand.update({
        where: { id },
        data: updateData
    })

    return NextResponse.json(brand)
}
