
import UserNavbar from '../components/UserNavbar'
import { getCart } from '@/services/cart.service'
import { getSession } from '@/lib/auth/session'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { RemoveButton } from './removeButton'
import Link from 'next/link'
import CheckButton from './checkButton'

export default async function CartPage() {

    const session = await getSession()
    const cart = await getCart(Number(session?.user.id))

    let subTotal = 0
    subTotal = cart?.flatMap(order => order.products ?? []).reduce((acc, item) => acc + Number(item.subtotal), 0) ?? 0

    const insurance = subTotal * 12 / 100
    const shipping = 200000
    const warranty = 200000
    const ppn = subTotal * 11 / 100
    const totalPrice = insurance + subTotal + warranty + ppn + shipping

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

            </div>
            <form
                action=""
                id="checkout-info"
                className="container max-w-[1130px] mx-auto flex justify-between gap-5 mt-[50px] pb-[100px]"
            >
                <div className="w-[650px] flex flex-col shrink-0 gap-4 h-fit">
                    <h2 className="font-bold text-2xl leading-[34px]">
                        Your Shipping Address
                    </h2>
                    <div className="flex flex-col gap-5 p-[30px] rounded-3xl border border-[#E5E5E5] bg-white">
                        <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
                            <div className="flex shrink-0">
                                <img src="/assets/icons/profile-circle.svg" alt="icon" />
                            </div>
                            <input
                                type="text"
                                id=""
                                name=""
                                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                                placeholder="Write your real complete name"
                            />
                        </div>
                        <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
                            <div className="flex shrink-0">
                                <img src="/assets/icons/house-2.svg" alt="icon" />
                            </div>
                            <input
                                type="text"
                                id=""
                                name=""
                                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                                placeholder="Write your active house address"
                            />
                        </div>
                        <div className="flex items-center gap-[30px]">
                            <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
                                <div className="flex shrink-0">
                                    <img src="/assets/icons/global.svg" alt="icon" />
                                </div>
                                <input
                                    type="text"
                                    id=""
                                    name=""
                                    className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                                    placeholder="City"
                                />
                            </div>
                            <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
                                <div className="flex shrink-0">
                                    <img src="/assets/icons/location.svg" alt="icon" />
                                </div>
                                <input
                                    type="number"
                                    id=""
                                    name=""
                                    className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                                    placeholder="Post code"
                                />
                            </div>
                        </div>
                        <div className="flex items-start gap-[10px] rounded-[20px] border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
                            <div className="flex shrink-0">
                                <img src="/assets/icons/note.svg" alt="icon" />
                            </div>
                            <textarea
                                name=""
                                id=""
                                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black resize-none"
                                rows={6}
                                placeholder="Additional notes for courier"
                                defaultValue={""}
                            />
                        </div>
                        <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
                            <div className="flex shrink-0">
                                <img src="/assets/icons/call.svg" alt="icon" />
                            </div>
                            <input
                                type="tel"
                                id=""
                                name=""
                                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                                placeholder="Write your phone number or whatsapp"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col shrink-0 gap-4 h-fit">
                    <h2 className="font-bold text-2xl leading-[34px]">Payment Details</h2>
                    <div className="w-full bg-white border border-[#E5E5E5] flex flex-col gap-[30px] p-[30px] rounded-3xl">
                        <a href="">
                            <div className="w-full bg-white border border-[#E5E5E5] flex items-center justify-between gap-2 p-5 rounded-3xl">
                                <div className="flex items-center gap-[10px]">
                                    <div className="w-12 h-12 flex shrink-0 rounded-full bg-[#FFC736] items-center justify-center overflow-hidden">
                                        <img src="/assets/icons/cake.svg" alt="icon" />
                                    </div>
                                    <div className="flex flex-col gap-[2px]">
                                        <p className="font-semibold">100% It&aposs Original</p>
                                        <p className="text-sm">We don&apost sell fake products</p>
                                    </div>
                                </div>
                                <div className="flex shrink-0">
                                    <img src="/assets/icons/arrow-right.svg" alt="icon" />
                                </div>
                            </div>
                        </a>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex shrink-0">
                                        <img src="/assets/icons/tick-circle.svg" alt="icon" />
                                    </div>
                                    <p>Sub Total</p>
                                </div>
                                <p className="font-semibold">Rp. {(subTotal).toLocaleString('id-ID')}
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex shrink-0">
                                        <img src="/assets/icons/tick-circle.svg" alt="icon" />
                                    </div>
                                    <p>Insurance 12%</p>
                                </div>
                                <p className="font-semibold">Rp {insurance.toLocaleString('id-ID')}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex shrink-0">
                                        <img src="/assets/icons/tick-circle.svg" alt="icon" />
                                    </div>
                                    <p>Shipping (Flat)</p>
                                </div>
                                <p className="font-semibold">Rp {shipping.toLocaleString('id-ID')}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex shrink-0">
                                        <img src="/assets/icons/tick-circle.svg" alt="icon" />
                                    </div>
                                    <p>Warranty Original</p>
                                </div>
                                <p className="font-semibold">Rp {warranty.toLocaleString('id-ID')}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex shrink-0">
                                        <img src="/assets/icons/tick-circle.svg" alt="icon" />
                                    </div>
                                    <p>PPN 11%</p>
                                </div>
                                <p className="font-semibold">Rp {ppn.toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="font-semibold">Grand Total</p>
                            <p className="font-bold text-[32px] leading-[48px] underline text-[#0D5CD7]">
                                Rp {totalPrice.toLocaleString('id-ID')}
                            </p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <CheckButton totalPrice={totalPrice} email={session?.user.email || ''} orderId='123' />
                            <a
                                href=""
                                className="p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5]"
                            >
                                Contact Sales
                            </a>
                        </div>
                    </div>
                </div>
            </form>
        </>

    )
}
