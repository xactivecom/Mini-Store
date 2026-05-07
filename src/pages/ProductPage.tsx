import { useLocation, useParams } from 'react-router-dom';
import { type Product, isProductsRouteState } from '../types/Product'

function ProductPage() {
  // Get specified parameter
  const { productId } = useParams();
  console.log(`productId: ${productId}`)

  // Get current route
  const { state } = useLocation();

  // Check for no product state
  if (!productId || !isProductsRouteState(state)) {
    return (
      <div className="px-6 py-10">
        <p className="text-xl font-bold text-center text-red-500">No products found</p>
      </div>
    );
  }

  // Get data from persistent state
  const { products } = state;

  // Get specific product
  const product = products.find((p: Product) => p.id == parseInt(productId, 10));
  console.log(product);

  return (
    <div className="px-6 py-10">
      {
        product ? (
          <>
            <h1 className="mb-6 text-3xl font-semibold text-center">Product Details</h1>
            <div className="flex flex-col items-center p-6 bg-white rounded-md">
              <h2 className="mb-2 text-xl font-semibold">{product.name}</h2>
              <p className="text-lg text-gray-700">Price: {product.price}$</p>
              <img className="w-40 h-40 mb-4 rounded-md" src={product.img} alt={product.name} />
            </div>
          </>
        ) : (
          <p className="text-xl font-bold text-center text-red-500">No product found</p>
        )
      }
    </div>
  );
}

export default ProductPage;
