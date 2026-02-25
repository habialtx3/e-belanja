'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import { createProductAction } from "./action"
import { useRouter } from "next/navigation"
import { getBrands } from "@/services/brand.service"
import { getCategories } from "@/services/category.service"
import { BrandProps, CategoryProps, LocationProps } from "@/types/common"
import { getLocations } from "@/services/location.service"


export default function Page() {


  const router = useRouter()
  const [error, setError] = useState<any>({})

  const [brands, setBrands] = useState<BrandProps[]>([])
  const [categories, setCategories] = useState<CategoryProps[]>([])
  const [locations, setLocations] = useState<LocationProps[]>([])

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    brand_id: "",
    category_id: "",
    location_id: "",
    stock: "",
    images: ""
  })

  useEffect(() => {
    async function loadData() {
      const brandsData = await getBrands()
      const categoriesData = await getCategories()
      const locationsData = await getLocations()
      setBrands(brandsData)
      setCategories(categoriesData)
      setLocations(locationsData)
    }
    loadData()
  }, []
  )



  const handleChange = (key: string, value: string) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   const validateData = {
  //     ...form,
  //     price: Number(form.price),
  //     brand_id: Number(form.brand_id),
  //     stock: Number(form.stock),
  //     location_id: Number(form.location_id),
  //     category_id: Number(form.category_id),
  //     images: [form.image],
  //   }

  //   const parsed = createProductSchema.safeParse(validateData)

  //   if (!parsed.success) {
  //     const fieldError = parsed.error.flatten().fieldErrors
  //     setError(fieldError)
  //     console.log('Validation Error');
  //     return
  //   }

  //   setError({})

  //   try {
  //     console.log('Validated data : ', parsed);
  //     // await createProductAction(parsed)
  //     // router.push('/dashboard/product')

  //   } catch (error) {
  //     console.log('Failed to create payload', error);
  //   }
  // }


  return (
    <>
      <div className="max-w-7xl py-10 bg-amber-50/65 rounded-2xl">
        <div className="mx-10">

          <h1 className="text-2xl font-bold mb-6">Create Product</h1>

          <form action={createProductAction} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Product Name</label>
              <Input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                name="name" placeholder="Product name..." />
              {error.name && (<p className="text-red-500 text-sm">{error.name[0]}</p>)}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea name="description" placeholder="Product description..."
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)} />
              {error.description && (<p className="text-red-500 text-sm">{error.description[0]}</p>)}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Price</label>
              <Input name="price" type="number" placeholder="Input price..."
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)} />
              {error.price && (<p className="text-red-500 text-sm">{error.price[0]}</p>)}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Brand</label>
              <Select
                value={form.brand_id}
                name='brand_id'
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
              <input type="hidden" name="brand_id" value={form.brand_id} />
              {error.brand_id && (<p className="text-red-500 text-sm">{error.brand_id[0]}</p>)}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select
                name="category_id"
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
              <input type="hidden" name="category_id" value={form.category_id} />
              {error.category_id && (<p className="text-red-500 text-sm">{error.category_id[0]}</p>)}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Select
                name="location_id"
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
              <input type="hidden" name="location_id" value={form.location_id} />
              {error.location_id && (<p className="text-red-500 text-sm">{error.location_id[0]}</p>)}
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
              {error.stock && (<p className="text-red-500 text-sm">{error.stock[0]}</p>)}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Gambar</label>
              <Input
                name="images"
                value={form.image}
                onChange={(e) => handleChange("images", e.target.value)}
                placeholder="Image URL"
              />
              {error.images && (<p className="text-red-500 text-sm">{error.images[0]}</p>)}
            </div>


            <Button type="submit" className="w-full">
              Create Product
            </Button>

          </form>
        </div>
      </div>
    </>
  )
}
