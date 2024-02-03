import './App.css'
import Discover from './components/Discover'
import SearchBar from './components/SearchBar'
import Sidebar from './components/Sidebar'
import TopPLay from './components/TopPLay'

export default function App() {
  return (
    <div className="relative flex">
      <Sidebar />
      <div className='flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]'>
        <SearchBar />
          <div className='px-6 h-[calc(100vh-72px)] overflow-y-scroll flex transition-all scrollbar-hidden xl:flex-row flex-col-reverse'>
            <div className="flex-1 h-fit pb-40">
              <Discover />
            </div>
            <div className="xl:sticky relative top-0 h-fit">
              <TopPLay />
            </div>
          </div>
      </div>
    </div>
  )
}
