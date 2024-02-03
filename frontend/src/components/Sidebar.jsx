import React, { useState } from 'react'

const NavLinks = ({handleClick}) => (
  <div className='mt-10'>
    {['Discover', 'Around You', 'Top Artists', 'Top Charts'].map((link) => (
      <a href="#" 
        className='flex text-cyan-300 flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400'
        key={link}
        onClick={() => handleClick && handleClick()}
      >
        {link}
      </a>
    ))}
  </div>
);

export default function Sidebar() {
  const [mobilMenuOpen, setMobilMenuOpen] = useState(false)
  return (
    <>
      <div className='md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]'>
        <h1 className='text-white font-bold text-4xl'>LOGO</h1>
        <NavLinks />
      </div>
      <div 
        className="absolute md:hidden block cursor-pointer top-4 right-6 text-white mr-4 text-white z-10 font-bold text-2xl"
        onClick={() => setMobilMenuOpen((prev) => !prev)}
      >
        {mobilMenuOpen ? 'X' : '#'}
      </div>
      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d9b] backdrop-blur-lg z-10 p-6 md:hidden transition-smooth ${mobilMenuOpen ? 'left-0': '-left-full'}`}>
        <h1 className='text-white font-bold text-4xl'>LOGO</h1>
          <NavLinks handleClick={() => setMobilMenuOpen(false)}/>
      </div>
    </>
  )
}
