import bcrypt from "bcryptjs"
import { prisma } from "../prisma"
import crypto from "crypto"

export async function login(email:string,password : string) {
    const user = await prisma.user.findUnique({where : {email}});
    if(!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(password, user.password)
    if(!valid) throw new Error("Invalid Credentials")

    const sessionId = crypto.randomUUID()

    await prisma.session.create({
        data : {
            id : sessionId,
            userId : user.id,
            expiresAt : new Date(Date.now() + 1000*60*60*24*3),
        }
    })
    
    
}