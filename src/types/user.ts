import { RoleUser } from "./common"

export type User = {
    id: number
    name: string
    email: string
    role: RoleUser
    created_at: string
    updated_at: string
}