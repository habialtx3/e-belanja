
import { prisma } from '@/lib/prisma';
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

    await prisma.order.update({
        where: { id: Number(params.cartId) },
        data: {
            status: 'success'
        }
    })

    const response = await invoiceClient.createInvoice({ data })

    return response;
}