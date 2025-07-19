import React, { useEffect, useState } from 'react';
import Navbar from '../../../Components/Admin/Navbar';
import { Link } from 'react-router-dom';
import { getAllProducts, updateProduct, deleteProduct } from '../../../services/productService';
import { toast } from 'react-toastify';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedCard, setUpdatedCard] = useState(null);
  const [price, setPrice] = useState("");
  const [inventory, setInventory] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res); // or res.data depending on your API response structure
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const handleUpdateClick = (card) => {
    setUpdatedCard(card);
    setPrice("");
    setInventory("");
  }

    const handleSubmit = async (id) => {
      if (!price || !inventory || isNaN(price) || isNaN(inventory)) {
        alert("Please enter valid price and stock quantity.");
        return;
      }
  
      try {
        const formData = new FormData();  
       
        formData.append("Price", price);
        formData.append("StockQuantity", inventory);       
  
        await updateProduct(id, formData);
        toast.success("Product updated successfully!");
        setUpdatedCard(null);
        const refreshed = await getAllProducts();
        setProducts(refreshed);
      } catch (err) {
        console.error(err);
        toast.error("Failed to update product.");
      }
    };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;

  try {
    await deleteProduct(id);
    toast.success("Product deleted successfully!");
    const refreshed = await getAllProducts();
    setProducts(refreshed);
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete product.");
  }
};

  return (
    <div>
      <Navbar />

      <div className="p-4">
        <Link
          to="/admin/AddProduct"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition block w-40 text-center mb-4"
        >
          Add Product
        </Link>

        {/* You can later add filters here */}
        {/* e.g., show sold items / out-of-stock toggle */}

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
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
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdateClick(product);
                  }}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                >
                  Update
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(product.id);
                  }}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/** pop up menu for when adding selected card to inventory */}
      {updatedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Update &quot;{updatedCard.name}&quot; Price: ${ updatedCard.price}</h2>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Stock Quantity
              </label>
              <input
                type="number"
                value={inventory}
                onChange={(e) => setInventory(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </div>           

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setUpdatedCard(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmit(updatedCard.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
