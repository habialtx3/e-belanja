import { getBrands } from "./lib/brandServices"

export default async function BrandsPage() {
  const brands = await getBrands()

  return (
    <div>
      <h1>Brands</h1>
      <ul>
        {brands.map((brand) => (
          <li key={brand.id}>
            <img src={brand.logo} alt={brand.name} width={50} />
            {brand.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
