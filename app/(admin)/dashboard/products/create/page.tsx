'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"


export default function Page() {
  return (
    <>
      <div className="max-w-7xl py-10 bg-amber-50/65 rounded-2xl">
        <div className="mx-10">

          <h1 className="text-2xl font-bold mb-6">Create Product</h1>

          <form className="space-y-6">

            <div className="space-y-2">
              <label className="text-sm font-medium">Product Name</label>
              <Input placeholder="Product name..." />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="Product description..." />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Price</label>
              <Input type="number" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Brand</label>
              <Select>
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
              <Select>
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
              <Select>
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
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select stock type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="preorder">Preorder</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="button" className="w-full">
              Create Product
            </Button>

          </form>
        </div>
      </div>
    </>
  )
}
