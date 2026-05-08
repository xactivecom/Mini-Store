import { Link, useLoaderData, useParams, useSearchParams } from 'react-router-dom';

import type { Product, ProductsRouteState } from '../types/Product';
import { resolveImage } from '../hooks/useImageMap';

function CategoryPage() {
  // Get specified parameter
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // Load data
  const products = useLoaderData<Product[]>();

  // Get max price
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : Infinity;
  
  // Get products in specified category
  let filteredProducts = products.filter((p) => p.categoryId === categoryId && p.price <= maxPrice);
  const state: ProductsRouteState = {
    tag: 'products',
    products: filteredProducts,
    sourceLabel: 'Filtered products',
  }

  function handleChange(e: { target: { value: any; }; }) {
    const value = e.target.value;
    setSearchParams(value ? { maxPrice: value } : {});
  }

  return (
    <div className="px-6 py-10">
      <h1 className="mb-6 text-3xl font-semibold text-center">Category: {categoryId}</h1>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="maxPrice">Max Price{" "}</label>
        <input
          className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          type="number"
          id="maxPrice"
          placeholder="Enter max price"
          value={searchParams.get("maxPrice") || ""}
          onChange={handleChange}
        />
      </div>

      <ul className="grid grid-cols-3 gap-4 px-5">
        {
        filteredProducts.map((product) => (
          <li key={product.name}>
            <Link
              className="relative flex flex-col items-center justify-center group"
              state={state}
              to={`/product/${product.id}`}
            >
              <span className="absolute z-10 text-xl font-semibold text-center text-white transition-all ease-out group-hover:text-2xl">
                {" "}
                {product.name} <br /> ${product.price}
              </span>

              <img className="rounded-md" src={resolveImage(product.img)} alt={product.name} />
              <div className="absolute inset-0 bg-gray-900 rounded-md opacity-40"></div>
            </Link>
          </li>
        ))
        }
      </ul>{" "}
    </div>
  );
}

export default CategoryPage;