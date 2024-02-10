import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Loader from "../components/Loader"
import { useRegisterMutation } from "../redux/api/userApiSlice"
import { setCredentials } from "../redux/features/auth/authSlice"

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate() 

  const [register, { isLoading }] = useRegisterMutation()
  const { userInfo } = useSelector(state => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if(userInfo){
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo]) 

  const registerHandler = async(e) =>{
    e.preventDefault()
    if(password !== confirmPassword){
      console.log('password don\'t match!')
    }else{
      try {
        const res = await register({username, email, password}).unwrap()
        dispatch(setCredentials({...res}))
        navigate(redirect)
        console.log('User created')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className='flex anima flex-wrap items-stretch w-full flex-col-reverse sm:flex-row sm:items-center h-screen bg-gradient-to-br from-black to-[#121286]'>
      <div className='flex-1 p-10 max-w-[500px]'>
        <h1 className='text-white text-2xl font-bold mb-4'>Sign Up</h1>
        <form onSubmit={registerHandler} className="container">
          <label className='text-white text-sm font-medium block mt-4 mb-1'>Username</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} className='w-full p-2 bg-gray-300 text-[#0a0808c7] border rounded' placeholder='Enter your username'/>
          <label className='text-white text-sm font-medium block mt-4 mb-1'>Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className='w-full p-2 bg-gray-300 text-[#0a0808c7] border rounded' placeholder='Enter your email'/>
          <label className='text-white text-sm font-medium block mt-4 mb-1'>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className='w-full p-2 bg-gray-300 text-[#0a0808c7] border rounded' placeholder='Enter your password'/>
          <label className='text-white text-sm font-medium block mt-4 mb-1'>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className='w-full p-2 bg-gray-300 text-[#0a0808c7] border rounded' placeholder='Confirm your password'/>
          <button disabled={isLoading} type="submit" className='text-white text-xl bg-cyan-600 px-3 py-1 rounded block mt-6'>{isLoading ? 'Signin Up...' : 'Sign Up'}</button>  
          {isLoading && <Loader />}
        </form>
        <div className="mt-4">
          <p className="text-white">Already have an account ? <Link to={redirect ? `/login?redirect=${redirect}`: 'login'} className='text-cyan-600 hover:underline'>LogIn</Link> </p>
        </div>
      </div>
    </div>
  )
}

export default Register