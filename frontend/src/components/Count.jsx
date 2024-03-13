const Count = ({count}) => {
  return (
    <>
      {count > 0 && <div className="bg-pink-500 h-7 w-7 flex items-center justify-center rounded-full text-sm text-white ml-4">{count}</div>}
    </>
  )
}

export default Count