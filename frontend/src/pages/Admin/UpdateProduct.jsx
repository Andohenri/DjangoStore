import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApi"
import { useDaleteProductMutation, useGetProductByIdQuery, useUpdateProductMutation } from "../../redux/api/productApiSlice"

const UpdateProduct = () => {
   const params = useParams()
   const { data: product } = useGetProductByIdQuery(params.id)
   const { data: categories } = useGetAllCategoriesQuery()
   const [name, setName] = useState(product?.name || '')
   const [description, setDescription] = useState(product?.description || '')
   const [brand, setBrand] = useState(product?.brand || '')
   const [price, setPrice] = useState(product?.price || '')
   const [category, setCategory] = useState(product?.category || '')
   const [quantity, setQuantity] = useState(product?.quantity || '')
   const [image, setImage] = useState('')
   const navigate = useNavigate()
   const [action, setAction] = useState('')

   const [updateProduct, {isLoading: loadingUpdate}] = useUpdateProductMutation()
   const [deleteProduct, {isLoading: loadingDelete}] = useDaleteProductMutation()

   useEffect(() => {
     setName(product?.name)
     setDescription(product?.description)
     setBrand(product?.brand)
     setPrice(product?.price)
     setCategory(product?.category)
     setQuantity(product?.quantity)
   }, [product])
   
   const handleUpdate = async (e) => {
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
         const {error} = await updateProduct({productId: params.id ,formData: productData}).unwrap()
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
         console.log('Updated.')
         navigate('/admin/products')
      } catch (error) {
         console.log(error)
      }
   }

   const handleDelete = async (e) => {
      e.preventDefault()
      if(window.confirm("Are you sure?")){
         try {
            const {error} = await deleteProduct(params.id).unwrap()
            if(error) {
               throw new Error(error)
            }
            console.log("Deleted.")
            navigate("/admin/products")
         } catch (error) {
            console.log(error)
         }
      }
   }
  return (
   <>
      <div className="relative flex flex-col p-2 w-full">
         <h1 className="text-white text-2xl font-semibold">Update Product</h1>
         <form onSubmit={action === 'update' ? e => handleUpdate(e) : e => handleDelete(e)} className="w-full mt-4">
            <div className="flex gap-4 flex-col sm:flex-row">
               <input className="mb-4 px-4 py-2 focus:outline-cyan-100 w-full rounded bg-[#121258] block text-white" placeholder="Enter the product name" type="text" value={name} onChange={e => setName(e.target.value)}/>
               <input className="mb-4 px-4 py-2 focus:outline-cyan-100 w-full rounded bg-[#121258] block text-white" placeholder="Enter the product price" type="number" value={price} onChange={e => setPrice(e.target.value)}/>
            </div>
            <div className="flex gap-4 flex-col sm:flex-row">
               <input className="mb-4 px-4 py-2 focus:outline-cyan-100 w-full rounded bg-[#121258] block text-white" placeholder="Enter the product brand" type="text" value={brand} onChange={e => setBrand(e.target.value)}/>
               <input className="mb-4 px-4 py-2 focus:outline-cyan-100 w-full rounded bg-[#121258] block text-white" placeholder="Enter the product quantity" type="number" value={quantity} onChange={e => setQuantity(e.target.value)}/>
            </div>
            <div className="flex gap-4 flex-col sm:flex-row">
               <select className="mb-4 px-4 py-2 focus:outline-cyan-100 w-full rounded bg-[#121258] block text-white" placeholder="Choice category" value={category} onChange={e => setCategory(e.target.value)}>
                  {categories?.map(item => (
                     <option key={item._id} value={item._id}>{item.name}</option>
                  ))}
               </select>
               <input className="mb-4 px-4 py-2 focus:outline-cyan-100 w-full rounded bg-[#121258] block text-white" type="file" name='image' accept='image/*' onChange={e => setImage(e.target.files[0])}/>
            </div>
            <textarea className="mb-4 px-4 py-2 focus:outline-cyan-100 w-full rounded bg-[#121258] block text-white" placeholder="Enter the product description" type="text" value={description} onChange={e => setDescription(e.target.value)}></textarea>
            <div className="flex justify-between">
               <button type="submit" onClick={() => setAction('update')} className="rounded bg-cyan-700 px-4 py-2 text-white font-bold text-xl">{loadingUpdate ? "Updating..." : "Update"}</button>
               <button type="submit" onClick={() => setAction('delete')} className="rounded bg-red-700 px-4 py-2 text-white font-bold text-xl">{loadingDelete ? "Deleting..." : "Delete"}</button>
            </div>
         </form>
      </div>
   </>
  )
}

export default UpdateProduct