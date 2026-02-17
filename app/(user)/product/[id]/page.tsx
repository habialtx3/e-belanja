'use server'

import React from 'react'
import DetailsProduct from './detailProduct'
import { getSession } from '@/lib/auth/session'

export default async function Page() {
    const session = await getSession()
    const userId = session?.user.id

    return (
        <DetailsProduct userId={Number(userId)} />
    )
}

