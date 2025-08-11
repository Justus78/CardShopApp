import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/User/Navbar'
import { getAllProducts } from '../../../services/productService';

const ViewProducts = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedCard, setUpdatedCard] = useState(null);
  const [price, setPrice] = useState("");
  const [inventory, setInventory] = useState(""); 
  
  // use effect to get products
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await getAllProducts(); // get products
        setProducts(res); // set products
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, [])


  return (
    <div>
      <Navbar />

      {
      /*
        / filtering items on the left
        products in the middle
        cart on the right
      */
      }

      {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          // container for product comp
          <div className='grid grid-cols-1 gap-6'> 
          {/** left side-- filters */}
          <div>

          </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white shadow-md rounded-lg w-75 overflow-hidden cursor-pointer"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full object-cover rounded mb-2"
                  />
                  <h2 className="font-semibold text-lg">{product.name}</h2>
                  <h2 className="font-semibold text-lg">{product.isFoil == true ? "Foil" : "Non-Foil"}</h2>
                  <p className="text-gray-600">${product.price}</p>
                  <p className="text-sm text-gray-500">
                    {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
                  </p>
                  <p className="text-sm text-gray-400">{product.category}</p>
                  <div className="mt-3 flex space-x-2">
                </div>
              </div>
              ))}
            </div>

            {/** right side -- cart section */}
            <div>

            </div>

          </div>
          
        )}
    </div>
    
  )
}

export default ViewProducts