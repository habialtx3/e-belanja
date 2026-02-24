'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { postProduct } from "@/services/product.service"
import { useState } from "react"
import { createProductAction } from "./action"
import { createProductSchema } from "@/validators/product"


export default function Page() {

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    brand_id: "",
    category_id: "",
    location_id: "",
    stock: "",
    image: ""
  })

  const [error, setError] = useState<any>({})


  const handleChange = (key: string, value: string) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validateData = {
      ...form,
      price: Number(form.price),
      brand_id: Number(form.brand_id),
      stock: Number(form.stock),
      location_id: Number(form.location_id),
      category_id: Number(form.category_id),
      images: [form.image],
    }

    const parsed = createProductSchema.safeParse(validateData)

    if (!parsed.success) {
      const fieldError = parsed.error.flatten().fieldErrors
      setError(fieldError)
      console.log('Validation Error');
      return
    }

    setError({})

    try {
      console.log('Validated data : ', parsed);
    } catch (error) {
      console.log('Failed to create payload', error);
    }
  }


  return (
    <>
      <div className="max-w-7xl py-10 bg-amber-50/65 rounded-2xl">
        <div className="mx-10">

          <h1 className="text-2xl font-bold mb-6">Create Product</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              <Input name="price" type="number"
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)} />
              {error.price && (<p className="text-red-500 text-sm">{error.price[0]}</p>)}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Brand</label>
              <Select
                value={form.brand_id}
                onValueChange={(value) => handleChange("brand_id", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Brand 1</SelectItem>
                  <SelectItem value="2">Brand 2</SelectItem>
                </SelectContent>
              </Select>
              {error.brand_id && (<p className="text-red-500 text-sm">{error.brand_id[0]}</p>)}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select name="category"
                value={form.category_id}
                onValueChange={(value) => handleChange("category_id", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Category 1</SelectItem>
                  <SelectItem value="2">Category 2</SelectItem>
                </SelectContent>
              </Select>
              {error.category_id && (<p className="text-red-500 text-sm">{error.category_id[0]}</p>)}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Select name="location"
                value={form.location_id}
                onValueChange={(value) => handleChange("location_id", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Location 1</SelectItem>
                  <SelectItem value="2">Location 2</SelectItem>
                </SelectContent>
              </Select>
              {error.location_id && (<p className="text-red-500 text-sm">{error.location_id[0]}</p>)}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Stock Type</label>
              <Select
                value={form.stock}
                onValueChange={(value) => handleChange("stock", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select stock type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Ready</SelectItem>
                  <SelectItem value="2">Preorder</SelectItem>
                </SelectContent>
              </Select>
              {error.stock && (<p className="text-red-500 text-sm">{error.stock[0]}</p>)}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Gambar</label>
              <Input
                value={form.image}
                onChange={(e) => handleChange("image", e.target.value)}
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
