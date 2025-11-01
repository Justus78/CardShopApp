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

  console.log(updatedCard)
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res);
      } catch {
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
  };

  const handleSubmit = async (id) => {
    if (!price || !inventory || isNaN(price) || isNaN(inventory)) {
      toast.error("Please enter valid price and stock quantity.");
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white">
      <Navbar />
      <div className="p-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 drop-shadow-lg">
          💫 View Products 💫
        </h1>

        <div className="text-center mb-6">
          <Link
            to="/admin/AddProduct"
            className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300"
          >
            ➕ Add Product
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-300 text-lg">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-400 text-lg">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">No products found.</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {products.map((product) => (
              <div
                key={product.id}
                className="relative bg-gray-900 bg-opacity-60 border border-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-[0_0_20px_#9333ea] transition-all duration-300 hover:scale-105 group"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-20 blur-xl transition duration-500 pointer-events-none"></div>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full object-cover rounded-xl mb-3"
                />
                <h2 className="font-semibold text-lg text-purple-300">{product.name}</h2>
                <h2 className="text-sm text-gray-400">{product.isFoil ? "Foil" : "Non-Foil"}</h2>
                <p className="text-cyan-400 font-medium">${product.price}</p>
                <p className="text-gray-400 text-sm">
                  {product.stockQuantity > 0
                    ? `${product.stockQuantity} in stock`
                    : 'Out of stock'}
                </p>
                <p className="text-xs text-gray-500 italic mb-3">{product.category}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdateClick(product);
                    }}
                    className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(product.id);
                    }}
                    className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {updatedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg border border-purple-500 w-96 max-w-full mx-4 relative">
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
            >
              ✖
            </button>

            <img
              src={
                updatedCard.imageUrl
              }
              alt={updatedCard.name}
              className="w-full rounded-lg mb-4 mt-4"
            />
            <h2 className="text-2xl font-bold mb-4 text-center text-cyan-300">
              Update "{updatedCard.name}"
            </h2>
            <p className="text-center text-gray-400 mb-4">Stock Quantity: {updatedCard.stockQuantity}</p>  
       
            <p className="text-center text-gray-400 mb-4">{updatedCard.setName}</p>  
            <p className="text-center text-gray-400 mb-4">Market Price: ${updatedCard.price}</p>   
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-300">Price</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full mt-1 p-2 rounded bg-gray-800 border border-purple-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-300">Stock Quantity</label>
              <input
                type="number"
                value={inventory}
                onChange={(e) => setInventory(e.target.value)}
                className="w-full mt-1 p-2 rounded bg-gray-800 border border-purple-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setUpdatedCard(null)}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmit(updatedCard.id)}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded hover:scale-105 transition-all"
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
