import { prisma } from '@/lib/prisma';

export const getBrands = () => prisma.brand.findMany()

export const getBrandById = (id: number) =>
  prisma.brand.findUnique({ where: { id } })

export const createBrand = (name: string, logo: string) =>
  prisma.brand.create({ data: { name, logo } })

export const updateBrand = (id: number, name: string, logo: string) =>
  prisma.brand.update({ where: { id }, data: { name, logo } })

export const deleteBrand = (id: number) =>
  prisma.brand.delete({ where: { id } })
