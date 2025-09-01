import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../../Components/User/Navbar";
import { getAllProducts } from "../../../services/productService";
import { CartContext } from "../../../Context/CartContext";
import { DataContext } from "../../../Context/DataContext";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

const ViewProducts = () => {
  // Products state
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [searchTerm, setSearchTerm] = useState("");
  const [foilOnly, setFoilOnly] = useState(false);
  const [nonFoilOnly, setNonFoilOnly] = useState(false);
  const [sortOption, setSortOption] = useState("relevant");

  // Contexts
  const { cart, addItem, updateItem, removeItem, clear } = useContext(CartContext);
  const { isAuthenticated } = useContext(DataContext);
  console.log("on products: ", isAuthenticated)

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setFilter = searchParams.get("set"); // <-- get the set from URL

  // Fetch all products on mount
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

  // Apply filters + sorting whenever dependencies change
  useEffect(() => {
    let filtered = products;
    console.log(products)

    // Filter by set if query param exists
    if (setFilter) {
      filtered = filtered.filter((p) => p.setName === setFilter);
    }

    // Search filter
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Foil/non-foil filters
    if (foilOnly) filtered = filtered.filter((p) => p.isFoil === true);
    else if (nonFoilOnly) filtered = filtered.filter((p) => p.isFoil === false);

    // Sorting
    if (sortOption === "priceLowHigh") filtered = [...filtered].sort((a, b) => a.price - b.price);
    else if (sortOption === "priceHighLow") filtered = [...filtered].sort((a, b) => b.price - a.price);
    else if (sortOption === "nameAZ") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    else if (sortOption === "nameZA") filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
    else if (sortOption === "stockHighLow") filtered = [...filtered].sort((a, b) => b.stockQuantity - a.stockQuantity);
    else if (sortOption === "stockLowHigh") filtered = [...filtered].sort((a, b) => a.stockQuantity - b.stockQuantity);

    setFilteredProducts(filtered);
  }, [searchTerm, foilOnly, nonFoilOnly, sortOption, products, setFilter]);

  // Handlers for mutually exclusive checkboxes
  const handleFoilChange = (checked) => {
    setFoilOnly(checked);
    if (checked) setNonFoilOnly(false);
  };
  const handleNonFoilChange = (checked) => {
    setNonFoilOnly(checked);
    if (checked) setFoilOnly(false);
  };

  // Add product to cart
  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      toast.info("Please login or use guest checkout to add items to cart.");
      navigate("/login");
      return;
    }

    if (product.stockQuantity < 1) {
      toast.error("This item is out of stock.");
      return;
    }

    const newItem = {
      id: product.id,
      productName: product.name,
      stockQuantity: product.stockQuantity,
      quantity: 1,
    };

    addItem(newItem);
    toast.success(`${product.name} added to cart!`);
  };

  // Increment/decrement cart quantity
  const handleQuantityChange = (item, delta) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity < 1 || newQuantity > item.stockQuantity) return;
    updateItem({ ...item, quantity: newQuantity });
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
          {/* Left: Filters */}
          <div className="lg:col-span-1 bg-white shadow rounded-lg p-4 h-fit sticky top-32 self-start">
            <h2 className="font-semibold mb-4">Filters</h2>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={foilOnly}
                onChange={(e) => handleFoilChange(e.target.checked)}
                className="mr-2"
              />
              Foil only
            </label>
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

          {/* Middle: Product list */}
          <div className="lg:col-span-4">
            <div className="flex justify-end mb-4">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="relevant">Most Relevant</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="nameAZ">Name: A → Z</option>
                <option value="nameZA">Name: Z → A</option>
                <option value="stockHighLow">Stock: High to Low</option>
                <option value="stockLowHigh">Stock: Low to High</option>
              </select>
            </div>

            {filteredProducts.length === 0 ? (
              <p>No products found.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row items-center sm:items-stretch bg-white shadow p-4 rounded-lg gap-4"
                  >
                    <div className="flex-shrink-0 w-40 h-56">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center text-center sm:text-left">
                      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                      <h3 className="text-xl font-semibold mb-2">{product.setName}</h3>
                      <p className="text-gray-700">{product.description}</p>
                    </div>
                    <div className="flex flex-col items-center sm:items-end justify-center min-w-[120px]">
                      <span className="text-xl font-bold text-green-600">${product.price}</span>
                      <span className="text-sm text-gray-500">{product.stockQuantity} in stock</span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Cart */}
          <div className="lg:col-span-1 bg-white shadow rounded-lg p-4 h-fit sticky top-6 self-start">
            <h2 className="font-semibold mb-3">Your Cart</h2>
            {cart.length === 0 ? (
              <p className="text-sm text-gray-500">Cart is empty</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between items-center">
                    <span>{item.productName}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item, -1)}
                        className="px-2 py-0.5 bg-gray-200 rounded"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item, 1)}
                        className="px-2 py-0.5 bg-gray-200 rounded"
                        disabled={item.quantity >= item.stockQuantity}
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="px-2 py-0.5 bg-red-500 text-white rounded"
                      >
                        x
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {cart.length > 0 && (
              <button
                onClick={clear}
                className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
