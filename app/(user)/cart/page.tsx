
import { getCart } from '@/services/cart.service'
import { getSession } from '@/lib/auth/session'
import { RemoveButton } from './removeButton'
import Link from 'next/link'
import CheckButton from './checkButton'
import CheckoutForm from './CheckoutForm'

export default async function CartPage() {

    const session = await getSession()
    const cart = await getCart(Number(session?.user.id))

    console.log(cart);

    let subTotal = 0
    subTotal = cart?.flatMap(order => order.products ?? []).reduce((acc, item) => acc + Number(item.subtotal), 0) ?? 0

    return (
        <>
            <div
                id="title"
                className="container max-w-[1130px] mx-auto flex items-center justify-between"
            >
                <div className="flex flex-col gap-5">
                    <div className="flex gap-5 items-center">
                        <a className="page text-sm text-[#6A7789] last-of-type:text-black">
                            Shop
                        </a>
                        <span className="text-sm text-[#6A7789]">/</span>
                        <a className="page text-sm text-[#6A7789] last-of-type:text-black">
                            Browse
                        </a>
                        <span className="text-sm text-[#6A7789]">/</span>
                        <a className="page text-sm text-[#6A7789] last-of-type:text-black">
                            Details
                        </a>
                    </div>
                    <h1 className="font-bold text-4xl leading-9">My Shopping Cart</h1>
                </div>
            </div>
            <div
                id="cart"
                className="container max-w-[1130px] mx-auto flex flex-col gap-5 mt-[50px]"
            >
                {cart?.map((order) =>
                    order.products?.map((item) => (
                        <div key={item.id} className="product-total-card bg-white flex items-center justify-between p-5 rounded-[20px] border border-[#E5E5E5]">
                            <div className="flex items-center w-[340px] gap-5">
                                <div className="w-[120px] h-[70px] flex shrink-0 overflow-hidden items-center justify-center">
                                    <img
                                        src="/assets/thumbnails/iphone15pro-digitalmat-gallery-3-202309-Photoroom 1.png"
                                        className="w-full h-full object-contain"
                                        alt=""
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Link href={`/product/${item?.product?.id}`}>
                                        <p className="font-semibold leading-[22px]">{item?.product?.name}</p>
                                    </Link>
                                    <p className="text-sm text-[#616369]">{item?.product?.category.name}</p>
                                </div>
                            </div>
                            <div className="w-[150px] flex flex-col gap-1">
                                <p className="text-sm text-[#616369]">Price</p>
                                <p className="font-semibold text-[#0D5CD7] leading-[22px]">
                                    Rp. {(item?.product.price).toLocaleString('id-ID')}
                                </p>
                            </div>
                            <div className="w-[120px] flex flex-col gap-1">
                                <p className="text-sm text-[#616369]">Quantity</p>
                                <div className="flex items-center gap-3">
                                    <button className="w-6 h-6 flex shrink-0 cursor-pointer hover:scale-125 transition duration-500 ease-in-out">
                                        <img src="/assets/icons/minus-cirlce.svg" alt="minus" />
                                    </button>
                                    <p className="text-[#0D5CD7] font-semibold leading-[22px]">{item.quantity}</p>
                                    <button className="w-6 h-6 flex shrink-0 cursor-pointer hover:scale-125 transition duration-500 ease-in-out">
                                        <img src="/assets/icons/add-circle.svg" alt="plus" />
                                    </button>
                                </div>
                            </div>
                            <div className="w-[150px] flex flex-col gap-1">
                                <p className="text-sm text-[#616369]">Total</p>
                                <p className="font-semibold text-[#0D5CD7] leading-[22px]">
                                    Rp. {item.subtotal.toLocaleString('id-ID')}
                                </p>
                            </div>
                            <RemoveButton item_id={item.id} />
                        </div>
                    ))
                )}
                <CheckoutForm subTotal={Number(subTotal)} email={session?.user.email} orderId={'2'} />
            </div>
        </>

    )
}
