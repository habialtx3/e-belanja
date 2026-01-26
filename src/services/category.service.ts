export async function getCategories() {
    const res = await fetch("http://localhost:3000/api/categories", {
        cache: "no-store"
    })

    if (!res.ok) {
        throw new Error("Failed to fetch categories");
    }

    return res.json()
}