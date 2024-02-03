export default function SearchBar() {
  return (
    <div className='p-4 flex flex-row items-center justify-between'>
      <input className='rounded-lg py-2 px-4' type="text" placeholder='Search...'/>
      <h2 className="relative text-gray-500 hover:text-gray-300 font-bold text-3xl mr-10 md:mr-0 cursor-pointer">
        S
        <span className="absolute flex items-center justify-center bg-red-500 text-white text-lg w-6 h-6 rounded-full top-[-15px] right-[-10px]">
          1
        </span>
      </h2>
    </div>
  )
}
