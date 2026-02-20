import { NavLink } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <NavLink key={product.id} to={`/subject/${product.id}/${product.name}`} className="group">
      <img
        alt={product.name}
        src={product.imageURL || "https://res.cloudinary.com/dfdusmc9k/image/upload/SubjectImage_jydtuy.png"}
        className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
      />
      <h3 className=" mt-1 text-lg font-medium text-gray-900">{product.name}</h3>
      <p className="mt-4 text-sm text-gray-700">{product.branch}</p>
    </NavLink>

  )
}
