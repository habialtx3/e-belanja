'use client'

import React from 'react'
import ProductForm from '../components/ProductForm'

export default function Page() {
  const isEdit = false
  return (
    <>
      <ProductForm isEdit={isEdit} />
    </>
  )
}
