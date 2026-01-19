import React from 'react'

export default function Navbar() {
    return (
        <>
            <nav className="container max-w-[1130px] mx-auto flex items-center justify-between bg-[#0D5CD7] p-5 rounded-3xl">
                <div className="flex shrink-0">
                    <img src="/assets/logos/logo.svg" alt="icon" />
                </div>
                <ul className="flex items-center gap-[30px]">
                    <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
                        <a href="index.html">Shop</a>
                    </li>
                    <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
                        <a href="">Categories</a>
                    </li>
                    <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
                        <a href="">Testimonials</a>
                    </li>
                    <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
                        <a href="">Rewards</a>
                    </li>
                </ul>
                <div className="flex items-center gap-3">
                    <a href="cart.html">
                        <div className="w-12 h-12 flex shrink-0">
                            <img src="/assets/icons/cart.svg" alt="icon" />
                        </div>
                    </a>
                    <a
                        href="signin.html"
                        className="p-[12px_20px] bg-white rounded-full font-semibold"
                    >
                        Sign In
                    </a>
                    <a
                        href="signup.html"
                        className="p-[12px_20px] bg-white rounded-full font-semibold"
                    >
                        Sign Up
                    </a>
                </div>
            </nav>
        </>
    )
}
