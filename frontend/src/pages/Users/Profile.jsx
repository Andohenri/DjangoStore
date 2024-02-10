import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCredentials } from "../../redux/features/auth/authSlice"
import { Link } from "react-router-dom"
import Loader from "../../components/Loader"
import { useProfileMutation } from "../../redux/api/userApiSlice"

const Profile = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { userInfo } = useSelector(state => state.auth)
    const [updateProfile, {isLoading: loadingProfileUpdate}] = useProfileMutation()

    useEffect(() => {
        setUsername(userInfo.username)
        setEmail(userInfo.email)
    }, [userInfo.username, userInfo.email])

    const dispatch = useDispatch()
    
    const handleUpdate = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            console.log("Password do not match!")
        }else{
            try {
                const res = await updateProfile({ username, email, password }).unwrap()
                dispatch(setCredentials({...res}))
                console.log("Update succesfull")
            } catch (error) {
                console.log(error?.data?.message || error.message)
            }
        }
    }
  return (
    <div className="container mx-auto p-4">
        <div className="flex flex-col justify-center">
            <h2 className="text-white font-semibold text-2xl">Update Profile</h2>
            <form onSubmit={handleUpdate} className="max-w-[500px]">
                <label htmlFor="" className="block text-white">
                    <span className="text-white text-sm font-medium block mt-4 mb-1">Username</span>
                    <input type="text" className='w-full p-2 bg-cyan-100 text-[#0a0808c7] border rounded' value={username} onChange={e => setUsername(e.target.value)}/>
                </label>
                <label htmlFor="" className="block text-white">
                    <span className='text-white text-sm font-medium block mt-4 mb-1'>Email</span>
                    <input type="email" className='w-full p-2 bg-cyan-100 text-[#0a0808c7] border rounded' value={email} onChange={e => setEmail(e.target.value)}/>
                </label>
                <label htmlFor="" className="block text-white">
                    <span className='text-white text-sm font-medium block mt-4 mb-1'>Passowrd</span>
                    <input type="password" className='w-full p-2 bg-cyan-100 text-[#0a0808c7] border rounded' value={password} onChange={e => setPassword(e.target.value)}/>
                </label>
                <label htmlFor="" className="block text-white">
                    <span className='text-white text-sm font-medium block mt-4 mb-1'>Confirm Password</span>
                    <input type="password" className='w-full p-2 bg-cyan-100 text-[#0a0808c7] border rounded'value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                </label>
                <div className="flex justify-between">
                    <button disabled={loadingProfileUpdate} type="submit" className='text-white text-xl bg-cyan-600 px-3 py-1 rounded block mt-6'>{loadingProfileUpdate ? 'Updating...' : 'Update'}</button>
                    <Link to={`/orders`} className='text-white text-xl bg-cyan-600 px-3 py-1 rounded block mt-6'>My Orders</Link>
                </div>  
            </form>
            {loadingProfileUpdate && <Loader />}
        </div>
    </div>
  )
}

export default Profile