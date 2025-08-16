import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/User/Navbar";
import { getAllProducts } from "../../../services/productService";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [foilOnly, setFoilOnly] = useState(false);
  const [nonFoilOnly, setNonFoilOnly] = useState(false);

  // Fetch products once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(Array.isArray(res) ? res : []);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = products;

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (foilOnly) {
      filtered = filtered.filter((p) => p.isFoil === true);
    } else if (nonFoilOnly) {
      filtered = filtered.filter((p) => p.isFoil === false);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, foilOnly, nonFoilOnly, products]);

  // Handlers for mutually exclusive checkboxes
  const handleFoilChange = (checked) => {
    setFoilOnly(checked);
    if (checked) setNonFoilOnly(false);
  };

  const handleNonFoilChange = (checked) => {
    setNonFoilOnly(checked);
    if (checked) setFoilOnly(false);
  };

  return (
    <div>
      <Navbar />

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 p-6">
          {/* Left: Filters (sticky) */}
          <div className="lg:col-span-1 bg-white shadow rounded-lg p-4 h-fit sticky top-6 self-start">
            <h2 className="font-semibold mb-4">Filters</h2>

            {/* Search bar */}
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300"
            />

            {/* Foil only */}
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={foilOnly}
                onChange={(e) => handleFoilChange(e.target.checked)}
                className="mr-2"
              />
              Foil only
            </label>

            {/* Non-Foil only */}
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={nonFoilOnly}
                onChange={(e) => handleNonFoilChange(e.target.checked)}
                className="mr-2"
              />
              Non-Foil only
            </label>
          </div>

          {/* Middle: Products */}
          <div className="lg:col-span-4">
            {filteredProducts.length === 0 ? (
              <p>No products found.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row items-center sm:items-stretch bg-white shadow p-4 rounded-lg gap-4"
                  >
                    {/* Left: Image */}
                    <div className="flex-shrink-0 w-40 h-56">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>

                    {/* Middle: Name & Description */}
                    <div className="flex-1 flex flex-col justify-center text-center sm:text-left">
                      <h2 className="text-xl font-semibold mb-2">
                        {product.name}
                      </h2>
                      <p className="text-gray-700">{product.description}</p>
                    </div>

                    {/* Right: Price & Stock */}
                    <div className="flex flex-col items-center sm:items-end justify-center min-w-[100px]">
                      <span className="text-xl font-bold text-green-600">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        {product.stockQuantity} in stock
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Cart (sticky) */}
          <div className="lg:col-span-1 bg-white shadow rounded-lg p-4 h-fit sticky top-6 self-start">
            <h2 className="font-semibold mb-3">Your Cart</h2>
            <p className="text-sm text-gray-500">Cart is empty</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
