import { Outlet } from 'react-router-dom'
import './App.css'
import SearchBar from './components/SearchBar'
import Sidebar from './components/Sidebar'

export default function App() {
  return (
    <div className="relative flex">
      <Sidebar />
      <div className='flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]'>
          <div className='px-6 h-screen overflow-y-scroll flex scrollbar-hidden xl:flex-row flex-col-reverse'>
            <div className="flex-1 h-fit pb-40">
              <Outlet />
            </div>
          </div>
      </div>
    </div>
  )
}
