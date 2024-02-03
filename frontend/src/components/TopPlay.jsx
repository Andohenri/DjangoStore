import React, { useEffect, useRef } from 'react'

const TopChartPlayCard = () => (
  <div className='w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2'>
    <h2 className='text-gray-400 font-semibold'>Song title</h2>
  </div>
)

export default function TopPLay() {
  const divRef = useRef(null)
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' })
  })
  
  return (
    <div ref={divRef} className='xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] xl:min-w-[240px] max-w-full flex flex-col'>
      <div className='w-full flex flex-col'>
        <div className="flex flex-row justify-between items-center">
          <h2 className='text-white font-bold text-2xl'>Top Charts</h2>
          <a href="#">
            <p className='text-gray-300 text-base cursor-pointer'>See more...</p></a>
        </div>
      </div>
      <div className='mt-4 flex flex-col gap-1'>
        <TopChartPlayCard/>
        <TopChartPlayCard/>
        <TopChartPlayCard/>
        <TopChartPlayCard/>
        <TopChartPlayCard/>
      </div>
    </div>
  )
}
