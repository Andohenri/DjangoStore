import React from 'react'
import SongCard from './ProductCard'

const Discover = () => {
  return (
    <div className='flex flex-col'>
        <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
            <h2 className='text-white text-left font-bold text-3xl'>Discover</h2>
            <select name="" id="" className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'>
                <option value="">Dance Hall</option>
                <option value="">Rock</option>
                <option value="">Pop</option>
            </select>
        </div>
        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
            {[1,2,3,4,5,6,7,8].map((song) => (
                <SongCard key={song} /> 
            ))}
        
        </div>
    </div>
  )
}

export default Discover
