import React from 'react'

const Login = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-br from-black to-[#121286]'>
      <div className='p-10'>
        <h1 className='text-white text-lg font-bold'>Register</h1>
        <form>
          <label className='text-white font-semibold block'>Email</label>
          <input type="email" className='px-4 py-2 bg-gray-300 text-[#0a0808c7] w-[25rem]' placeholder='Enter your email'/>
          <label className='text-white font-semibold block'>Password</label>
          <input type="password" className='px-4 py-2 bg-gray-300 text-[#0a0808c7] w-[25rem]' placeholder='Enter your password'/>
          <button type="submit" className='text-white text-2xl bg-cyan-400 px-4 py-2 rounded block mt-4'>Log in</button>  
        </form>
      </div>
    </div>
  )
}

export default Login