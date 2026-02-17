'use client'

import { getSession } from "@/lib/auth/session"
import { prisma } from "@/lib/prisma"
import { deleteCart } from "@/services/cart.service"

interface RemoveButtonProps {
    item_id: number
}

export function RemoveButton({ item_id }: RemoveButtonProps) {
    const handleDelete = async () => {
        try {
            await deleteCart(item_id)
            window.location.reload()
        } catch (error) {
            window.alert((error as Error).message)
        }
    }
    return (
        <button className="p-[12px_24px] cursor-pointer bg-white rounded-full text-center font-semibold border cursor border-[#E5E5E5] hover:shadow-lg duration-200 ease-in-out" onClick={handleDelete}>
            Remove
        </button>
    )
}