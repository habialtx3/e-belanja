export async function getLocations() {
    const res = await fetch('http://localhost:3000/api/location', {
        cache: 'no-store'
    })

    if (!res.ok) throw new Error("Failed fetch brands")

    return res.json()
}