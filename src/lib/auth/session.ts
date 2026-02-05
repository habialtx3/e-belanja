import { cookies } from "next/headers";
import { prisma } from "../prisma";

export async function getSession() {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("session")?.value

    if (!sessionId) return null

    const session = await prisma.session.findUnique({
        where: { id: sessionId },
        include: { user: true }
    })

    if (!session) return null

    if (session.expiresAt < new Date()) {
        await prisma.session.delete({
            where: { id: session.id }
        })
        return null
    }

    return session
}

export async function destroySession() {
    const cookiesStore = await cookies()
    const sessionId = cookiesStore.get('session')?.value

    if (!sessionId) return null

    await prisma.session.delete({
        where: { id: cookiesStore.get("session")?.value }
    })
}

export async function deleteSession(sessionId: string) {
    const cookieStore = await cookies()
    prisma.session.delete({ where: { id: sessionId } })
    cookieStore.delete("session")
}