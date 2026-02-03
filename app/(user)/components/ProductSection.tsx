import { getProducts } from '@/services/product.service'
import Link from 'next/link'

export default async function ProductSection() {
    const products = await getProducts()

    return (
        <>
            <div className="grid grid-cols-5 gap-[30px]">
                {products.map((product: any) => (
                    <Link href={`product/${product.id}`} key={product.id} className="product-card">
                        <div className="bg-white flex flex-col gap-[24px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
                            <div className="w-full h-[90px] flex shrink-0 items-center justify-center overflow-hidden">
                                <img
                                    src="assets/thumbnails/color_back_green__buxxfjccqjzm_large_2x-Photoroom 1.png"
                                    className="w-full h-full object-contain"
                                    alt="thumbnail"
                                />
                            </div>
                            <div className="flex flex-col gap-[10px]">
                                <div className="flex flex-col gap-1">
                                    <p className="font-semibold leading-[22px]">
                                        {product.name}
                                    </p>
                                    <p className="text-sm text-[#616369]">{product.category.name}</p>
                                </div>
                                <p className="font-semibold text-[#0D5CD7] leading-[22px]">
                                    Rp.{Number(product.price).toLocaleString("id")}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}
