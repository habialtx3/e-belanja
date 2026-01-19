export function sessionCookie(sessionId:string) {
    return `session=${sessionId}; HttpOnly; Path=/; Max-Age=2592000`;
}