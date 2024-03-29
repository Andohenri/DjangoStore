import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useLoginMutation } from "../redux/api/userApiSlice"
import { setCredentials } from "../redux/features/auth/authSlice"
import Banner from '../assets/banner.jpeg'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, {isLoading, error }] = useLoginMutation()
  const { userInfo } = useSelector(state => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if(userInfo){
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])
  
  const loginHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await login({email, password}).unwrap()
      dispatch(setCredentials({...res}))
    } catch (error) {
      console.error(error?.data?.message || error.message)
    }
  }

  return (
    <div className='flex items-stretch w-full flex-col-reverse sm:flex-row sm:items-center h-screen bg-gradient-to-br from-black to-[#121286]'>
      <div className='flex-1 p-10 max-w-[500px]'>
        <h1 className='text-white text-2xl font-bold mb-4'>Sign In</h1>
        <form onSubmit={loginHandler} className="container">
          <label className='text-white text-sm font-medium block mt-4 mb-1'>Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className='mb-4 px-4 py-2 focus:outline-cyan-100 w-full rounded bg-[#121258] text-white' placeholder='Enter your email'/>
          <label className='text-white text-sm font-medium block mt-4 mb-1'>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className='mb-4 px-4 py-2 focus:outline-cyan-100 w-full rounded bg-[#121258] text-white' placeholder='Enter your password'/>
          <button disabled={isLoading} type="submit" className='text-white text-xl bg-cyan-600 px-3 py-1 rounded block mt-6'>{isLoading ? 'Signin In...' : 'Sign In'}</button>  
        </form>
        <div className="mt-4">
          <p className="text-white">New Customer ? <Link to={redirect ? `/register?redirect=${redirect}`: 'register'} className='text-cyan-600 hover:underline'>Register</Link> </p>
        </div>
      </div>
      <div className='p-10 w-full sm:w-1/2'>
        <img src={Banner} alt="banner" className="h-[120px] w-full sm:h-full object-cover"/>
      </div>
    </div>
  )
}

export default Login