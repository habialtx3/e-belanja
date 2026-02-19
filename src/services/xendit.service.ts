
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { Xendit } from 'xendit-node';
import { CreateInvoiceRequest } from 'xendit-node/invoice/models';

const xenditClient = new Xendit({
    secretKey: process.env.XENDIT_SECRET_KEY!,
})

type invoiceParams = {
    externalId: string
    amount: number
    email: string
    cartId: number
}

export async function postInvoice(params: invoiceParams) {
    try {
        const invoiceClient = xenditClient.Invoice;
        const data: CreateInvoiceRequest = {
            amount: Number(params.amount),
            invoiceDuration: 172800,
            externalId: `${params.externalId} - ${Date.now()}`,
            description: `Checkout Order ${params.externalId}`,
            payerEmail: params.email,
            currency: "IDR",
            successRedirectUrl: "http://localhost:3000/payment/success",
            failureRedirectUrl: "http://localhost:3000/payment/failed",
        }

        console.log(data);
        const response = await invoiceClient.createInvoice({ data })

        return response;
    } catch (error) {
        return NextResponse.json({ message: 'Payment failed', status: 500 })
    }
}


async function paymentStatusChange(status: string, cartId: number) {
    if (status === 'PAID') {
        await prisma.order.update({
            where: { id: Number(cartId) },
            data: {
                status: 'success'
            }
        })
    }
}