import React from 'react'

export default function CheckoutForm() {
    return (
        <>
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
        </>
    )
}
