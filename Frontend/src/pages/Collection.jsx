import { ShopContext } from "../context/ShopContext.jsx"
import { useContext, useState, useEffect } from "react";
import { assets } from '../assets/assets';
import Title from '../components/Title.jsx';
import ProductItem from "../components/ProductItem";

// const Collection = () => {

//   const { search, showSearch, products } = useContext(ShopContext);
//   const [showFilter, setShowFilter] = useState(true);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [Subcategory, setSubcategory] = useState([]);
//   const [sortType, setSortType] = useState('relevant');

//   // to update categories: if the category exists in the array remove it else add it
//   const toggleCategory = (e) => {
//     if (category.includes(e.target.value)) {
//       setCategory(prev => prev.filter(item => item !== e.target.value));
//     }
//     else {
//       setCategory(prev => [...prev, e.target.value]);
//     }
//   }
//   // to update subcategories
//   const toggleSubcategory = (e) => {
//     if (Subcategory.includes(e.target.value)) {
//       setSubcategory(prev => prev.filter(item => item !== e.target.value));
//     }
//     else {
//       setSubcategory(prev => [...prev, e.target.value]);
//     }
//   }
//   const applyFilter = () => {

//     let productsCopy = products.slice();

//     if (showSearch && search) {
//       productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
//     }

//     if (category.length > 0) {
//       productsCopy = productsCopy.filter(item => category.includes(item.category));
//     }


//     if (Subcategory.length > 0) {
//       productsCopy = productsCopy.filter(item => Subcategory.includes(item.subCategory));
//     }

//     setFilterProducts(productsCopy);
//   }

//   const sortProducts = () => {

//     let fpCopy = filterProducts.slice();
//     switch (sortType) {

//       case 'low-high':
//         setFilterProducts(fpCopy.sort((a, b) => a.rent_per_day - b.rent_per_day));
//         break;
//       case 'high-low':
//         setFilterProducts(fpCopy.sort((a, b) => b.rent_per_day - a.rent_per_day));
//         break;
//       default:
//         applyFilter();

//     }

//   }
//   // useEffect(() => {
//   //   setFilterProducts(products);
//   // }, [])

//   useEffect(() => {
//     console.log(`Category = ${category}\nSubcategory=${Subcategory}`);
//     applyFilter();
//   }, [category, Subcategory, search, showSearch, products])

//   useEffect(() => {
//     sortProducts();
//   }, [sortType])


//   return (

//     <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

//       {/*Filter Options */}
//       <div className="min-w-60">
//         <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
//           <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
//         </p>
//         {/*Category Filter */}
//         <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:display:block`}>
//           <p className="mb-3 text-sm font-medium">CATEGORIES</p>

//           <div className="flex flex-col gap-2 text-sm font-light text-gray-700">

//             <p className="flex gap-2">
//               <input className="w-3" type="checkbox" onChange={toggleCategory} value={'Electronics'} /> Electronics
//             </p>

//             <p className="flex gap-2">
//               <input className="w-3" type="checkbox" onChange={toggleCategory} value={'Sports'} /> Sports
//             </p>

//             {/* 
//             Add more categories in the future
//             <p className="flex gap-2">
//               <input className="w-3" type="checkbox" onChange={toggleCategory} value={'Kids'} /> Kids
//             </p> */}
//           </div>

//         </div>

//         {/* Subcategory Filter */}

//         <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:display-block`}>
//           <p className="mb-3 text-sm font-medium">CATEGORIES</p>


//           <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
//             {
//               category.includes('Sports') &&
//               (
//             <p className="flex gap-2">
//               <input className="w-3" type="checkbox" onChange={toggleSubcategory} value={'Cricket'} /> Cricket
//             </p>

//             <p className="flex gap-2">
//               <input className="w-3" type="checkbox" onChange={toggleSubcategory} value={'Gym Equipment'} /> Gym Equipment
//             </p>

//             <p className="flex gap-2">
//               <input className="w-3" type="checkbox" onChange={toggleSubcategory} value={''} /> Football
//             </p>
//               )
//             }
//           </div>

//         </div>
//       </div>

//       {/* UI for right side */}

//       <div className="flex-1">

//         <div className="flex justify-between text-base sm:text-2xl mb-4">
//           <Title text1={'All'} text2={'COLLECTIONS'} />

//           <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
//             <option value="relevant">Sort by:Relevant</option>
//             <option value="low-high">Sort by:Low to High</option>
//             <option value="high-low">Sort by:High to Low</option>
//           </select>
//         </div>


//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
//           {
//             filterProducts.map((item, index) => (
//               <ProductItem key={index} name={item.name} id={item._id} price={item.rent_per_day} image={item.image} />
//             ))
//           }


//         </div>

//       </div>


//     </div>
//   )
// }

// export default Collection

const Collection = () => {
  const { search, showSearch, products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

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

  // Apply filters based on selected categories, subcategories, and search term
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
      default:
        applyFilter();
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

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
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.rent_per_day} image={item.image} />
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