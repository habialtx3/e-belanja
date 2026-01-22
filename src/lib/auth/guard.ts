import { getSession } from "./session"

export async function authGuard(){
    const session = await getSession()

    if(!session) throw new Error("Unauthorized");

    return session.user
}

export async function requireAdmin(){
    const user = await authGuard()

    if(user.role !== "superadmin"){
        throw new Error("Forbidden");
    }

    return user
}