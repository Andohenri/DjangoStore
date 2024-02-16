import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateProductMutation } from '../../redux/api/productApiSlice'
import { useGetAllCategoriesQuery } from '../../redux/api/categoryApi'


const ProductList = () => {
   const [name, setName] = useState('')
   const [description, setDescription] = useState('')
   const [brand, setBrand] = useState('')
   const [price, setPrice] = useState('')
   const [category, setCategory] = useState('')
   const [quantity, setQuantity] = useState('')
   const [image, setImage] = useState(null)
   const navigate = useNavigate()

   const { data: categories } = useGetAllCategoriesQuery()
   const [createProduct, {isLoading: loadingCreate}] = useCreateProductMutation()

   const handleCreate = async (e) => {
      e.preventDefault()
      const productData = new FormData()
      productData.append('name', name)
      productData.append('description', description)
      productData.append('image', image)
      productData.append('brand', brand)
      productData.append('price', price)
      productData.append('category', category)
      productData.append('quantity', quantity)
      productData.append('countInStock', quantity)
      try {
         const {error} = await createProduct(productData).unwrap()
         if(error) {
            throw new Error(error)
         }
         setName('')
         setBrand('')
         setDescription('')
         setPrice('')
         setQuantity('')
         setImage(null)
         setCategory('')
         console.log('Created.')
      } catch (error) {
         console.log(error)
      }
   }

  return (
   <>
      <div className="relative flex flex-col p-2 w-full">
         <h1 className="text-white text-2xl font-semibold">Manages Products</h1>
         <form onSubmit={(e) => handleCreate(e)} className="w-full mt-4">
            <div className="flex gap-4">
               <input className="mb-4 px-4 py-2 focus:outline-cyan-100 w-full rounded bg-[#121258] block text-white" placeholder="Enter the product name" type="text" value={name} onChange={e => setName(e.target.value)}/>
               <input className="mb-4 px-4 py-2 focus:outline-cyan-100 w-full rounded bg-[#121258] block text-white" placeholder="Enter the product price" type="number" value={price} onChange={e => setPrice(e.target.value)}/>
            </div>
            <div className="flex gap-4">
               <input className="mb-4 px-4 py-2 focus:outline-cyan-100 w-full rounded bg-[#121258] block text-white" placeholder="Enter the product brand" type="text" value={brand} onChange={e => setBrand(e.target.value)}/>
               <input className="mb-4 px-4 py-2 focus:outline-cyan-100 w-full rounded bg-[#121258] block text-white" placeholder="Enter the product quantity" type="number" value={quantity} onChange={e => setQuantity(e.target.value)}/>
            </div>
            <div className="flex gap-4">
               <select className="mb-4 px-4 py-2 focus:outline-cyan-100 w-full rounded bg-[#121258] block text-white" placeholder="Choice category" value={category} onChange={e => setCategory(e.target.value)}>
                  {categories?.map(item => (
                     <option key={item._id} value={item._id}>{item.name}</option>
                  ))}
               </select>
               <input className="mb-4 px-4 py-2 focus:outline-cyan-100 w-full rounded bg-[#121258] block text-white" placeholder="Enter the product description" type="file" name='image' accept='image/*' onChange={e => setImage(e.target.files[0])}/>
            </div>
            <textarea className="mb-4 px-4 py-2 focus:outline-cyan-100 w-full rounded bg-[#121258] block text-white" placeholder="Enter the product description" type="text" value={description} onChange={e => setDescription(e.target.value)}></textarea>
            <button type="submit" className="rounded bg-cyan-700 px-4 py-2 text-white font-bold text-xl">{loadingCreate ? "Creating..." : "Create"}</button>
         </form>
      </div>
   </>
  )
}

export default ProductList