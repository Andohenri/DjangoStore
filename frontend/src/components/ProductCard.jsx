import React from 'react'

const ProductCard = () => {
  return (
    <div className='flex flex-col w-[240px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideUp rounded-lg cursor-pointer'>
        <div className="relative group h-56 w-full">
            <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex hidden`}></div>
        </div>
    </div>
  )
}

export default ProductCard