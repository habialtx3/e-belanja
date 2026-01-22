import { prisma } from "@/lib/prisma";

export const getCategory = () => prisma.category.findMany()

export const getCategoryId = (id: number) =>
    prisma.category.findUnique({ where: { id } })

export const createCategory = (name: string) =>
    prisma.category.create({ data: { name } })

export const updateCategory = (id: number, name: string) =>
    prisma.category.update({ where: { id }, data: { name } })

export const deleteCategory = (id: number) =>
    prisma.category.delete({ where: { id } })