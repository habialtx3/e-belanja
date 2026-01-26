export async function getBrands() {
    const res = await fetch('http://localhost:3000/api/brands', {
        cache: 'no-store'
    })

    if (!res.ok) throw new Error("Failed fetch brands")

    return res.json()
}