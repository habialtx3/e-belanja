'use client'

import { orderDetailSchema } from '@/validators/orderDetails'
import React, { useState } from 'react'
type Props = {
    subTotal: number
    email: string
    orderId: string
}

export default function CheckoutForm({ subTotal, email, orderId }: Props) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>({})
    const insurance = subTotal * 12 / 100
    const shipping = 200000
    const warranty = 200000
    const ppn = subTotal * 11 / 100
    const totalPrice = insurance + subTotal + warranty + ppn + shipping

    async function handleCheckout() {

        try {

            setLoading(true)

            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    externalId: `order-${orderId}`,
                    email: email,
                    amount: Math.round(totalPrice),
                    cartId: orderId,
                })
            })

            if (!res.ok) {
                throw new Error("Failed create Invoice");
            }

            const data = await res.json()

            if (data.invoiceUrl) {
                window.location.href = data.invoiceUrl
            }

        } catch (error) {
            console.log(error);
            alert('Invoice failed created')
        } finally {
            setLoading(false)
        }

    }

    function handleOrderDetail(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const form = e.currentTarget
        const formData = new FormData(form)

        const payload = {
            fullName: formData.get("fullName") ?? '',
            address: formData.get("address") ?? '',
            city: formData.get("city") ?? '',
            postCode: formData.get("postCode") ?? '',
            notes: formData.get("notes") ?? '',
            phone: formData.get("phone") ?? '',
            email,
            orderId,
            subTotal,
            totalPrice
        }

        const parsed = orderDetailSchema.safeParse(payload)

        if (!parsed.success) {
            const fieldError = parsed.error.flatten().fieldErrors
            setError(fieldError)
            console.log('Validation error : ', fieldError);
            return
        }

        setError({})
        console.log('Payload : ', parsed.data);


        console.log(payload);

    }

    return (
        <>
            <form
                action=""
                onSubmit={handleOrderDetail}
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
                                name="fullName"
                                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                                placeholder="Write your real complete name"
                            />
                        </div>
                        {error.fullName && (<p className='text-red-500 text-sm'>{error.fullName[0]}</p>)}
                        <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
                            <div className="flex shrink-0">
                                <img src="/assets/icons/house-2.svg" alt="icon" />
                            </div>
                            <input
                                type="text"
                                id=""
                                name="address"
                                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                                placeholder="Write your active house address"
                            />
                        </div>
                        {error.address && (<p className='text-red-500 text-sm'>{error.address[0]}</p>)}

                        <div className="flex items-center gap-[30px]">
                            <div>
                                <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
                                    <div className="flex shrink-0">
                                        <img src="/assets/icons/global.svg" alt="icon" />
                                    </div>
                                    <input
                                        type="text"
                                        id=""
                                        name="city"
                                        className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                                        placeholder="City"
                                    />
                                </div>
                                {error.city && (<p className='text-red-500 text-sm'>{error.city[0]}</p>)}
                            </div>

                            <div>
                                <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
                                    <div className="flex shrink-0">
                                        <img src="/assets/icons/location.svg" alt="icon" />
                                    </div>
                                    <input
                                        type="text"
                                        id=""
                                        name="postCode"
                                        className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                                        placeholder="Post code"
                                    />
                                </div>
                                {error.postCode && (<p className='text-red-500 text-sm'>{error.postCode[0]}</p>)}
                            </div>

                        </div>
                        <div className="flex items-start gap-[10px] rounded-[20px] border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
                            <div className="flex shrink-0">
                                <img src="/assets/icons/note.svg" alt="icon" />
                            </div>
                            <textarea
                                name="notes"
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
                                name="phone"
                                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                                placeholder="Write your phone number or whatsapp"
                            />
                        </div>
                        {error.phone && (<p className='text-red-500 text-sm'>{error.phone[0]}</p>)}

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
                            <button
                                type='submit'
                                className="p-[12px_24px] bg-[#0D5CD7] rounded-full text-center cursor-pointer hover:bg-[#0D5CD7]/60 transtion duration-500 font-semibold text-white"
                            >
                                {loading ? 'Processing ...' : 'Checkout Now'}
                            </button>
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
