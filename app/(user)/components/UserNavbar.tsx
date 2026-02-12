import { getSession } from '@/lib/auth/session'
import Link from 'next/link'
import React from 'react'
export default async function UserNavbar() {
    const session = await getSession()
    const user = session?.user
    
    async function handleSubmit(e : React.FormEvent) {
        e.preventDefault
        
    }
    return (
        <nav className="container max-w-[1130px] mx-auto flex items-center justify-between bg-[#0D5CD7] p-5 rounded-3xl">
            <div className="flex shrink-0">
                <img src="assets/logos/logo.svg" alt="icon" />
            </div>
            <ul className="flex items-center gap-[30px]">
                <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 font-bold text-[#FFC736]">
                    <Link href="/">Shop</Link>
                </li>
                <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
                    <Link href="/category">Categories</Link>
                </li>
                <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
                    <Link href="">Testimonials</Link>
                </li>
                <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
                    <Link href="">Rewards</Link>
                </li>
            </ul>
            <div className="flex items-center gap-3">
                <Link href="/cart">
                    <div className="w-12 h-12 flex shrink-0">
                        <img src="assets/icons/cart.svg" alt="icon" />
                    </div>
                </Link>
                {
                    !user ? (
                        <>
                            <Link
                                href="sign-in"
                                className="p-[12px_20px] bg-white rounded-full font-semibold"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="sign-up"
                                className="p-[12px_20px] bg-white rounded-full font-semibold"
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <>
                            <span>Hi {user.name}</span>
                            <form action="/api/auth/logout"  method='POST'>
                                <button type='submit'>Log Out</button></form>
                        </>
                    )
                }

            </div>
        </nav>
    )
}
