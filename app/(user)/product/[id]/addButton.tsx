import { addToCart } from '@/services/cart.service'
import React, { useTransition } from 'react'

interface addButtonProps {
  productId: number,
  userId: number
}

export default function AddButton({ productId, userId }: addButtonProps) {
  const [isPending, startTransition] = useTransition()

  function handleAdd() {
    startTransition(() => {
      addToCart(productId, userId)
    })
  }

  return (
    <button
      disabled={isPending}
      className="p-[12px_24px] bg-[#0D5CD7] rounded-full text-center font-semibold cursor-pointer text-white"
      onClick={handleAdd}
    >
      {isPending ? 'Adding ...' : 'Add to Cart'}
    </button>
  )
}
