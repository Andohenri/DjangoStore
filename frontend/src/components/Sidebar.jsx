import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaAngleDown, FaAngleUp, FaHeart, FaHome, FaShoppingBag, FaShoppingCart, FaTimes, FaUserCircle } from 'react-icons/fa'
import { CiLogout } from 'react-icons/ci'
import { RiMenu3Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../redux/api/userApiSlice';
import { logout } from '../redux/features/auth/authSlice';
import FavoritesCount from './FavoritesCount';

const NavLinks = ({handleClick}) => {
  const [toogle, setToogle] = useState(false)
  const [logoutApiCall] = useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const { userInfo } = useSelector(state => state.auth)

  const toogleDropDown = () =>{
    setToogle(!toogle)
  }
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return <div className='flex justify-between flex-col h-full '>
    <div className='flex flex-col justify-center gap-2 mt-10'>
      <NavLink to="/" 
        className='flex flex-row justify-start items-center text-lg font-medium text-gray-400 hover:text-cyan-400'
        onClick={() => handleClick && handleClick()}
      >
        <FaHome className='mr-2 text-lg'/> Home
      </NavLink>
      <NavLink to="/shop" 
        className='flex flex-row justify-start items-center text-lg font-medium text-gray-400 hover:text-cyan-400'
        onClick={() => handleClick && handleClick()}
      >
        <FaShoppingBag className='mr-2 text-lg'/> Shop
      </NavLink>
      <NavLink to="/favorite" 
        className='flex flex-row relative justify-start items-center text-lg font-medium text-gray-400 hover:text-cyan-400'
        onClick={() => handleClick && handleClick()}
      >
        <FaHeart className='mr-2 text-lg'/> Favorites <FavoritesCount />
      </NavLink>
      <NavLink to="/cart" 
        className='flex flex-row justify-start items-center text-lg font-medium text-gray-400 hover:text-cyan-400'
        onClick={() => handleClick && handleClick()}
      >
        <FaShoppingCart className='mr-2 text-lg'/> Carts
      </NavLink>
    </div>
    <div className='flex flex-col mb-10 md:m-0 gap-5 relative'>
      <button onClick={toogleDropDown} className="flex flex-row justify-start items-center text-lg font-medium text-gray-400 hover:text-cyan-400">
        <FaUserCircle className='mr-2 text-xl' /> {userInfo ? userInfo.username : ''} {!toogle ? <FaAngleDown className='ml-4'/> : <FaAngleUp className='ml-4'/>}
      </button>
      <button onClick={logoutHandler} className="flex flex-row justify-start items-center text-lg font-medium text-gray-400 hover:text-cyan-400">
        <CiLogout className='mr-2 text-xl' /> Logout
      </button>
      {toogle && userInfo && <div className={`flex flex-col flex-start absolute ${userInfo.isAdmin ? 'top-[-15rem]': 'top-[-3rem]'}  right-1 rounded bg-[#000000dc]`}>
        {userInfo.isAdmin ? <>
          <Link to='/admin/users' className='text-white font-semibold hover:bg-gray-800 hover:text-cyan-400 py-2 px-4'>Users</Link>
          <Link to='/admin/products' className='text-white font-semibold hover:bg-gray-800 hover:text-cyan-400 py-2 px-4'>Products</Link>
          <Link to='/admin/orders-list' className='text-white font-semibold hover:bg-gray-800 hover:text-cyan-400 py-2 px-4'>Orders</Link>
          <Link to='/admin/dashboard' className='text-white font-semibold hover:bg-gray-800 hover:text-cyan-400 py-2 px-4'>Dashboard</Link>
          <Link to='/admin/categories' className='text-white font-semibold hover:bg-gray-800 hover:text-cyan-400 py-2 px-4'>Categories</Link>
          <Link to='/profile' className='text-white font-semibold hover:bg-gray-800 hover:text-cyan-400 py-2 px-4'>Profile</Link>
        </>:<>
          <Link to='/profile' className='text-white font-semibold hover:bg-gray-800 hover:text-cyan-400 py-2 px-4'>Profile</Link>
        </>}
      </div>}
    </div>
  </div>
};

export default function Sidebar() {
  const [mobilMenuOpen, setMobilMenuOpen] = useState(false)
  return (
    <>
      <div className='md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]'>
        <h1 className='text-white font-bold text-4xl'>LOGO</h1>
        <NavLinks />
      </div>
      <div 
        className="absolute md:hidden block cursor-pointer top-4 right-6 text-white z-10 font-bold text-2xl"
        onClick={() => setMobilMenuOpen((prev) => !prev)}
      >
        {mobilMenuOpen ? <FaTimes /> : <RiMenu3Fill />}
      </div>
      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d9b] backdrop-blur-lg z-10 p-6 md:hidden transition-all ${mobilMenuOpen ? 'left-0': '-left-full'}`}>
        <h1 className='text-white font-bold text-4xl'>LOGO</h1>
          <NavLinks handleClick={() => setMobilMenuOpen(false)}/>
      </div>
    </>
  )
}
