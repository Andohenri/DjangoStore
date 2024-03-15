import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetFilteredProductsQuery } from '../../redux/api/productApiSlice'
import { useGetAllCategoriesQuery } from '../../redux/api/categoryApi'
import { setCategories, setChecked, setProducts } from '../../redux/features/shop/shopSlice'
import Loader from '../../components/Loader'
import ProductCard from '../../components/ProductCard'

const Shop = () => {
  const dispatch = useDispatch()
  const {categories, products, checked, radio} = useSelector(state => state.shop)

  const categoriesQuery = useGetAllCategoriesQuery()
  const [priceFilter, setPriceFilter] = useState('')

  const filteredProductQuery = useGetFilteredProductsQuery({checked, radio})

  useEffect(() => {
    if(!categoriesQuery.isLoading){
      dispatch(setCategories(categoriesQuery.data))
    }
  }, [categoriesQuery.data, dispatch])
  
  useEffect(() => {
    if(!checked.length || !radio.length){
      if(!filteredProductQuery.isLoading){
        const filteredProducts = filteredProductQuery.data.filter(product => {
          return (
            product.price.toString().includes(priceFilter) || 
            product.price === parseInt(priceFilter, 10)
          )
        })
        dispatch(setProducts(filteredProducts))
      }
    }
  }, [checked, radio, filteredProductQuery.data, dispatch, priceFilter])

  const handleChecked = (value, id) => {
    const updateChecked = value ? [...checked, id] : checked.filter(c => c !== id)
    dispatch(setChecked(updateChecked))
  }

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductQuery.data?.filter(product => product.brand === brand)
    console.log(productsByBrand)
    dispatch(setProducts(productsByBrand))
  }
  //Add "all brands" option to uniqueBrands
  const uniqueBrands = [...Array.from(new Set(filteredProductQuery.data?.map(product => product.brand).filter(brand => brand !== undefined)))]
  

  const handlePriceChange = e => {
    setPriceFilter(e.target.value)
  }

  return (
    <div className='container mx-auto p-4'>
      <div className="flex md:flex-row gap-4">
        <div className='p-5 w-56 h-fit sticky top-0 bg-[#121258]'>
          {/* Categories */}
          <h2 className='text-center text-white py-2 rounded-full bg-gradient-to-tl from-white/10 to-[#483d9b]'>Filter by Categories</h2>
          <div className='mt-4 px-2'>
            {categories?.map(c => (
              <span key={c._id} className='flex items-center gap-4 mb-2 text-white'>
                <input 
                  className='w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500' 
                  type="checkbox"
                  onChange={(e) => handleChecked(e.target.checked, c._id)}
                />
                <label className='text-sm font-medium'>{c.name}</label>
              </span>
            ))}
          </div>
          {/* Brands */}
          <h2 className='text-center text-white py-2 mt-4 rounded-full bg-gradient-to-tl from-white/10 to-[#483d9b]'>Filter by Brands</h2>
          <div className='mt-4 px-2'>
            {uniqueBrands?.map((b, idx) => (
              <span key={idx} className='flex items-center gap-4 mb-2 text-white'>
                <input type="radio" name="brand" id={b} onChange={() => handleBrandClick(b)} className='w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500' />
                <label className='text-sm font-medium'>{b}</label>
              </span>
            ))}
          </div>
          {/* Prices */}
          <h2 className='text-center text-white py-2 mt-4 rounded-full bg-gradient-to-tl from-white/10 to-[#483d9b]'>Filter by Price</h2>
          <div className='mt-4 px-2'>
            <input type="text" placeholder='Enter the price' className='mb-4 px-4 py-2 focus:outline-cyan-100 w-full rounded bg-[#121286] block text-white' value={priceFilter} onChange={handlePriceChange} />
          </div>
          <div className='mt-4'>
            <button className='text-white font-semibold bg-[#191624] w-full rounded-lg py-2' onClick={() => window.location.reload()}>Reset</button>
          </div>
        </div>
        <div className="flex-1 text-white">
            <h1>{products.length} Products</h1>
            <div className="flex flex-wrap gap-4">
              {products.lenght === 0 ? (
                <Loader />
              ) : (
                products?.map(p => (
                  <ProductCard key={p._id} p={p}/> 
                ))
              )}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Shop