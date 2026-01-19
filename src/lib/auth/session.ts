import { prisma } from "../prisma";

export async function getSession(sessionId: string) {
    return prisma.session.findUnique({
        where: { id: sessionId },
        include: { user: true }
    })
}

export async function delteSession(sessionId: string) {
    return prisma.session.delete({ where: { id: sessionId } })
}