import {parse} from "cookie"
import { getSession } from "./session"

export async function getAuthUser(req : Request) {
    const cookies = parse(req.headers.get("cookie") || '')
    const sessionId = cookies.session
    if(!sessionId) return null

    const session = await getSession(sessionId)
    if(!session || session.expiresAt < new Date()) return null

    return session.user
}