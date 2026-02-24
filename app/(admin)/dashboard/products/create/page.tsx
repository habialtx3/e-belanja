'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { postProduct } from "@/services/product.service"
import { useState } from "react"
import { createProductAction } from "./action"


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


  const handleChange = (key: string, value: string) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSubmit = () => {
    console.log(form);
  }


  return (
    <>
      <div className="max-w-7xl py-10 bg-amber-50/65 rounded-2xl">
        <div className="mx-10">

          <h1 className="text-2xl font-bold mb-6">Create Product</h1>

          <form action={handleSubmit} className="space-y-6">

            <div className="space-y-2">
              <label className="text-sm font-medium">Product Name</label>
              <Input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                name="name" placeholder="Product name..." />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea name="description" placeholder="Product description..."
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Price</label>
              <Input name="price" type="number"
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)} />
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
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="preorder">Preorder</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Gambar</label>
              <Input
                value={form.image}
                onChange={(e) => handleChange("image", e.target.value)}
                placeholder="Image URL"
              />
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
