import { postInvoice } from "@/services/xendit.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        
        const invoice = await postInvoice({
            externalId: body.externalId,
            amount: body.amount,
            email: body.email,
            cartId : body.cartId
        })

        return NextResponse.json({ invoiceUrl: invoice.invoiceUrl })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed creating invoice' }, { status: 500 })
    }
}