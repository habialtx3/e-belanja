'use client'
import React, { useState } from 'react'

type Props = {
    totalPrice: number
    email: string
    orderId: string
}
export default function CheckButton({ totalPrice, email, orderId }: Props) {
    const [loading, setLoading] = useState(false)

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
                    cartId : orderId,
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
        
        // await new Promise(resolve => setTimeout(resolve, 3000))
        // const payload = {
        //     exteralId: `order-${orderId}`,
        //     amount: Math.round(totalPrice),
        //     payerEmail: email,
        //     description: `Checkout order - #${orderId}`,
        //     successRedirectUrl: "http://localhost:3000/success",
        //     failureRedirectUrl: "http://localhost:3000/failed",
        // }

        // console.log('Payload untuk xendit : ', payload);
        // try {
        //     setLoading(true)

        //     const res = fetch('api/checkout',{
        //         method : 'POST'
        //     })

        //     const data = (await res).json()

        //     if(data.invoiceUrl){
        //         window.location.href = data.invoiceUrl
        //     }
        // } catch (error) {
        //     alert('Invoice Failed Created')
        // } finally{
        //     setLoading(false)
        // }
    return (
        <>
            <button
                type='button'
                className="p-[12px_24px] bg-[#0D5CD7] rounded-full text-center cursor-pointer hover:bg-[#0D5CD7]/60 transtion duration-500 font-semibold text-white"
                onClick={handleCheckout}
            >
                {loading ? 'Processing ...' : 'Checkout Now'}
            </button>
        </>
    )
}
