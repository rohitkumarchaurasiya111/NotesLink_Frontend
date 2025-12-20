export default function ProductCard({ product }) {
  return (
    <a key={product.id} href="" className="group">
      <img
        alt={product.name}
        src={product.imageURL}
        className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
      />
      <h3 className=" mt-1 text-lg font-medium text-gray-900">{product.name}</h3>
      <p className="mt-4 text-sm text-gray-700">{product.branch}</p>
    </a>

  )
}
