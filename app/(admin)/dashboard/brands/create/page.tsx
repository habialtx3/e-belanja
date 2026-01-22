'use client'

import { useState } from 'react'

export default function CreateBrandPage() {
  const [name, setName] = useState('')
  const [logo, setLogo] = useState('')

  const logoPath = `/assets/logos/${logo}`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/brands', {
      method: 'POST',
      body: JSON.stringify({ name, logo : logoPath }),
      headers: { 'Content-Type': 'application/json' },
    })
    alert('Brand created!')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Brand name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Logo URL"
        value={logo}
        onChange={(e) => setLogo(e.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  )
}
