import bcrypt from "bcryptjs"
import { prisma } from "../prisma"

export async function  register(name:string,email:string,password:string) {
    const hashPassword = await bcrypt.hash(password,12)

    return prisma.user.create({
        data : {
            name,
            email,
            password : hashPassword
        }
    })
}