export async function getProducts() {
    const res = await fetch("http://localhost:3000/api/products", {
        cache: "no-store"
    })

    if (!res.ok) throw new Error("Failed to fetch Products");

    const data = await res.json()

    return data.productString
}

export async function getProductById(id: number) {
    const res = await fetch(`http://localhost:3000/api/products/${id}`)

    if (!res.ok) throw new Error(`Failed to fetch product ${id}`)
    const data = await res.json()
    return data.product
}