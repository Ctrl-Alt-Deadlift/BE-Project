import { ShopContext } from "../context/ShopContext.jsx"
import { useContext, useState, useEffect } from "react";
import { assets } from '../assets/assets';
import Title from '../components/Title.jsx';
import ProductItem from "../components/ProductItem";

const Collection = () => {

  const { search, showSearch, products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [Subcategory, setSubcategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  // to update categories: if the category exists in the array remove it else add it
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else {
      setCategory(prev => [...prev, e.target.value]);
    }
  }
  // to update subcategories
  const toggleSubcategory = (e) => {
    if (Subcategory.includes(e.target.value)) {
      setSubcategory(prev => prev.filter(item => item !== e.target.value));
    }
    else {
      setSubcategory(prev => [...prev, e.target.value]);
    }
  }
  const applyFilter = () => {

    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }


    if (Subcategory.length > 0) {
      productsCopy = productsCopy.filter(item => Subcategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  }

  const sortProducts = () => {

    let fpCopy = filterProducts.slice();
    switch (sortType) {

      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();

    }

  }
  // useEffect(() => {
  //   setFilterProducts(products);
  // }, [])

  useEffect(() => {
    console.log(`Category = ${category}\nSubcategory=${Subcategory}`);
    applyFilter();
  }, [category, Subcategory, search, showSearch, products])

  useEffect(() => {
    sortProducts();
  }, [sortType])


  return (

    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/*Filter Options */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
        </p>
        {/*Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:display:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" onChange={toggleCategory} value={'Men'} /> Men
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" onChange={toggleCategory} value={'Women'} /> Women
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" onChange={toggleCategory} value={'Kids'} /> Kids
            </p>
          </div>

        </div>

        {/* Subcategory Filter */}

        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:display-block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" onChange={toggleSubcategory} value={'Topwear'} /> Top-Wear
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" onChange={toggleSubcategory} value={'Bottomwear'} /> Bottom-Wear
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" onChange={toggleSubcategory} value={'Winterwear'} /> Winter-Wear
            </p>
          </div>

        </div>
      </div>

      {/* UI for right side */}

      <div className="flex-1">

        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'All'} text2={'COLLECTIONS'} />

          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relevant">Sort by:Relevant</option>
            <option value="low-high">Sort by:Low to High</option>
            <option value="high-low">Sort by:High to Low</option>
          </select>
        </div>


        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }


        </div>

      </div>


    </div>
  )
}

export default Collection