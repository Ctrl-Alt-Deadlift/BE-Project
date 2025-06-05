import { ShopContext } from "../context/ShopContext.jsx"
import { useContext, useState, useEffect } from "react";
import { assets } from '../assets/assets.js';
import Title from '../components/Title.jsx';
import ProductItem from "../components/ProductItem.jsx";


const Collection = () => {
  const { search, showSearch, products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [availabilityFilter, setAvailabilityFilter] = useState('all'); // NEW FILTER

  // Mapping of categories to their corresponding subcategories
  const categoryToSubCategories = {
    Sports: ["Cricket", "Football", "Gym Equipment"],
    Electronics: ["Camera", "Laptops", "Gaming Equipment"]
  };

  // Toggle category selection
  const toggleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory(prev => prev.filter(item => item !== value));
      setSubCategory([]); // Reset subcategory when category is removed
    } else {
      setCategory([value]); // Allow only one category at a time
      setSubCategory([]); // Reset subcategories when a new category is selected
    }
  };

  // Toggle subcategory selection
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    if (subCategory.includes(value)) {
      setSubCategory(prev => prev.filter(item => item !== value));
    } else {
      setSubCategory(prev => [...prev, value]);
    }
  };

  // Apply filters based on selected categories, subcategories, availability, and search term
  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subcategory));
    }

    // Apply Availability Filter
    if (availabilityFilter === 'sale') {
      productsCopy = productsCopy.filter(item => item.available_for_sale);
    } else if (availabilityFilter === 'rent') {
      productsCopy = productsCopy.filter(item => item.available_for_rent);
    }

    setFilterProducts(productsCopy);
  };

  const sortProducts = () => {
    let sortedProducts = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(sortedProducts.sort((a, b) => a.rent_per_day - b.rent_per_day));
        break;
      case 'high-low':
        setFilterProducts(sortedProducts.sort((a, b) => b.rent_per_day - a.rent_per_day));
        break;
      case 'high-low-sale':
        setFilterProducts(sortedProducts.sort((a, b) => b.sale_price - a.sale_price));
        break;
      case 'low-high-sale':
        setFilterProducts(sortedProducts.sort((a, b) => a.sale_price - b.sale_price));
        break;
      default:
        applyFilter();
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products, availabilityFilter]); // ADDED `availabilityFilter`

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">

      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
        </p>

        {/* Availability Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">AVAILABILITY</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2">
              <input
                type="radio"
                className="w-3"
                name="availability"
                value="all"
                checked={availabilityFilter === "all"}
                onChange={() => setAvailabilityFilter("all")}
              />
              All
            </label>
            <label className="flex gap-2">
              <input
                type="radio"
                className="w-3"
                name="availability"
                value="sale"
                checked={availabilityFilter === "sale"}
                onChange={() => setAvailabilityFilter("sale")}
              />
              For Sale
            </label>
            <label className="flex gap-2">
              <input
                type="radio"
                className="w-3"
                name="availability"
                value="rent"
                checked={availabilityFilter === "rent"}
                onChange={() => setAvailabilityFilter("rent")}
              />
              For Rent
            </label>
          </div>
        </div>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2">
              <input type="checkbox" className="w-3" onChange={toggleCategory} value="Electronics" checked={category.includes("Electronics")} />
              Electronics
            </label>
            <label className="flex gap-2">
              <input type="checkbox" className="w-3" onChange={toggleCategory} value="Sports" checked={category.includes("Sports")} />
              Sports
            </label>
          </div>
        </div>

        {/* Subcategory Filter (Only visible if a category is selected) */}
        {category.length > 0 && (
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className="mb-3 text-sm font-medium">SUBCATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {categoryToSubCategories[category[0]].map(sub => (
                <label key={sub} className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3"
                    onChange={toggleSubCategory}
                    value={sub}
                    checked={subCategory.includes(sub)}
                  />
                  {sub}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* UI for right side (Filtered Products) */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"All"} text2={"COLLECTIONS"} />

          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relevant">Sort by: Relevant </option>
            <option value="low-high">Sort by: Low to High( Rent Per Day )</option>
            <option value="high-low">Sort by: High to Low( Rent Per Day )</option>
            <option value="high-low-sale">Sort by: High to Low ( Selling Price )</option>
            <option value="low-high-sale">Sort by: Low to High ( Selling Price )</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                salePrice={item.available_for_sale ? item.sale_price : null}
                rentPrice={item.available_for_rent ? item.rent_per_day : null}
                image={item.image}
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-4 text-center">No products found.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Collection;
