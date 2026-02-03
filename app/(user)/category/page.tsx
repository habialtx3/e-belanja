import Navbar from '@/components/ui/navbar'
import React from 'react'
import CategorySection from '../components/CategorySection'

export default function CategoryPage() {
    return (
        <>
            <div
                id="category"
                className="bg-[#EFF3FA] min-h-screen pt-[30px] pb-[50px] flex flex-col"
            >
                <Navbar />
                <CategorySection/>
            </div>
        </>
    )
}
