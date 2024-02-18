import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa"
const Rating = ({value, text, color}) => {
  const fullStar = Math.floor(value)
  const halfStar = value - fullStar > 0.5 ? 1 : 0
  const emptyStar = 5 - fullStar - halfStar


   return (
    <div className="flex items-center"> 
      {[...Array(fullStar)].map((_, index) => (
         <FaStar key={index} className={`text-${color} ml-1`}/>
      ))}
      {halfStar === 1 && <FaStarHalfAlt className={`text-${color} ml-1`} />}
      {[...Array(emptyStar)].map((_, index) => (
         <FaRegStar key={index} className={`text-${color} ml-1`}/>
      ))}
      <span className={`text-${color} ml-4`}>
         {text && text}
      </span>
    </div>
  )
}

export default Rating