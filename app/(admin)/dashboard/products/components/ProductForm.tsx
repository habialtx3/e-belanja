'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useActionState, useCallback, useEffect, useState } from "react"
import { ActionState, createProductAction, editProductAction } from "../create/action"
import { useParams, useRouter } from "next/navigation"
import { getBrands } from "@/services/brand.service"
import { getCategories } from "@/services/category.service"
import { BrandProps, CategoryProps, LocationProps } from "@/types/common"
import { getLocations } from "@/services/location.service"
import { ProductProps } from "@/types/product"
import { getProduct } from "../edit/[id]/action"

const initial_Form = {
    name: "",
    description: "",
    price: "",
    brand_id: "",
    category_id: "",
    location_id: "",
    stock: "",
    images: ""
}

const initial_State: ActionState = {
    errors: {}
}

interface FormErrors {
    name?: string[];
    description?: string[];
    price?: string[];
    brand_id?: string[];
    category_id?: string[];
    location_id?: string[];
    stock?: string[];
    images?: string[];
}

export default function ProductForm() {

    const { id } = useParams()
    const isEdit = !!id

    const action = isEdit
        ? (prevState: ActionState, formData: FormData) =>
            editProductAction(String(id), prevState, formData)
        : createProductAction

    const [state, formAction] = useActionState<ActionState, FormData>(
        isEdit
            ? action
            : createProductAction,
        initial_State
    )

    const [brands, setBrands] = useState<BrandProps[]>([])
    const [categories, setCategories] = useState<CategoryProps[]>([])
    const [locations, setLocations] = useState<LocationProps[]>([])


    const [form, setForm] = useState(initial_Form)

    useEffect(() => {
        async function loadMasterData() {
            try {
                const [b, c, l] = await Promise.all([
                    getBrands(),
                    getCategories(),
                    getLocations()
                ])

                setBrands(b)
                setCategories(c)
                setLocations(l)
            } catch (error) {
                console.error("Error loading master data", error)
            }
        }

        loadMasterData()
    }, [])

    useEffect(() => {
        async function loadData() {
            if (isEdit && id) {
                try {
                    const [b, c, l] = await Promise.all([
                        getBrands(),
                        getCategories(),
                        getLocations()
                    ])

                    setBrands(b);
                    setCategories(c);
                    setLocations(l);
                    async function loadAllData() {
                        if (isEdit && id) {
                            const productData = await getProduct(id.toString())
                            if (productData) {
                                setForm({
                                    name: productData.name,
                                    description: productData.description,
                                    price: productData.price.toString(),
                                    brand_id: productData.brand_id.toString(),
                                    category_id: productData.category_id.toString(),
                                    location_id: productData.location_id.toString(),
                                    stock: productData.stock,
                                    images: ""
                                })
                            }
                        }
                    }
                    loadAllData()
                } catch (error) {
                    console.error('Error loading data', error);

                }
            }
        }
        loadData()
    }, [id, isEdit]
    )



    const handleChange = useCallback((key: string, value: string) => {
        setForm(prev => ({
            ...prev,
            [key]: value
        }))
    }, [])


    return (
        <>
            <div className="max-w-7xl py-10 bg-amber-50/65 rounded-2xl">
                <div className="mx-10">

                    <h1 className="text-2xl font-bold mb-6">{(!isEdit) ? 'Create Product' : 'Edit Product'}</h1>

                    <form action={formAction} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Product Name</label>
                            <Input
                                value={form.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                name="name" placeholder="Product name..." />
                            {state.errors?.name && (<p className="text-red-500 text-sm">{state.errors?.name[0]}</p>)}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <Textarea name="description" placeholder="Product description..."
                                value={form.description}
                                onChange={(e) => handleChange("description", e.target.value)} />
                            {state.errors?.description && (<p className="text-red-500 text-sm">{state.errors?.description[0]}</p>)}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Price</label>
                            <Input name="price" type="number" placeholder="Input price..."
                                value={form.price}
                                onChange={(e) => handleChange("price", e.target.value)} />
                            {state.errors?.price && (<p className="text-red-500 text-sm">{state.errors?.price[0]}</p>)}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Brand</label>
                            {
                                brands.length > 0 && (
                                    <Select
                                        value={form.brand_id}
                                        onValueChange={(value) => handleChange("brand_id", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select brand" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {brands.map((brand) => (
                                                <SelectItem key={brand.id} value={String(brand.id)} >
                                                    {brand.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )
                            }

                            <input type="hidden" name="brand_id" value={form.brand_id} />
                            {state.errors?.brand_id && (<p className="text-red-500 text-sm">{state.errors?.brand_id[0]}</p>)}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category</label>
                            {
                                categories.length > 0 && (
                                    <Select
                                        value={form.category_id}
                                        onValueChange={(value) => handleChange("category_id", value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={String(category.id)}>{category.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )
                            }
                            <input type="hidden" name="category_id" value={form.category_id} />
                            {state.errors?.category_id && (<p className="text-red-500 text-sm">{state.errors?.category_id[0]}</p>)}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Location</label>
                            {locations.length > 0 && (
                                <Select
                                    value={form.location_id}
                                    onValueChange={(value) => handleChange("location_id", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {locations.map((location) => (
                                            <SelectItem key={location.id} value={String(location.id)}>{location.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}

                            <input type="hidden" name="location_id" value={form.location_id} />
                            {state.errors?.location_id && (<p className="text-red-500 text-sm">{state.errors?.location_id[0]}</p>)}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Stock Type</label>
                            <Select
                                name="stock"
                                value={form.stock}
                                onValueChange={(value) => handleChange("stock", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select stock type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ready">Ready</SelectItem>
                                    <SelectItem value="preorder">Preorder</SelectItem>
                                </SelectContent>
                            </Select>
                            <input type="hidden" name="stock" value={form.stock} />
                            {state.errors?.stock && (<p className="text-red-500 text-sm">{state.errors?.stock[0]}</p>)}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Gambar</label>
                            <Input
                                name="images"
                                value={form.images}
                                onChange={(e) => handleChange("images", e.target.value)}
                                placeholder="Image URL"
                            />
                            {state.errors?.images && (<p className="text-red-500 text-sm">{state.errors?.images[0]}</p>)}
                        </div>


                        <Button type="submit" className="w-full">
                            {(isEdit) ? 'Edit Product' : 'Create Products'}
                        </Button>

                    </form>
                </div>
            </div>
        </>
    )
}

