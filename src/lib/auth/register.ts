import bcrypt from "bcryptjs"
import { prisma } from "../prisma"

interface RegistyPayload {
    name: string,
    email: string,
    password: string
}

export async function register(payload: RegistyPayload) {
    const { name, email, password } = payload

    const emailExisted = await prisma.user.findUnique({
        where: { email }
    })

    if (emailExisted) throw new Error("Email already registered");

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data : {
            name,
            email,
            password : hashedPassword
        },
        select : {
            id : true,
            name : true,
            email : true,
            role : true
        }
    })
    return user
}