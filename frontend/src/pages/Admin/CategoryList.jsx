import { useState } from "react"
import { useCreateCategoryMutation, useDeleteCategoryMutation, useGetAllCategoriesQuery, useUpdateCategoryMutation } from "../../redux/api/categoryApi"
import {FaTimes} from 'react-icons/fa'

const CategoryList = () => {
   const [name, setName] = useState('')
   const [modalVisible, setModalVisible] = useState(false)
   const [updateName, setUpdateName] = useState('')
   const [updateCategoryId, setUpdateCategoryId] = useState(null)
   const { data: categories, refetch, isLoading, error } = useGetAllCategoriesQuery()

   const [createCategory, {isLoading: loadingCreate}] = useCreateCategoryMutation()
   const [updateCategory, {isLoading: loadingUpdate}] = useUpdateCategoryMutation()
   const [deleteCategory, {isLoading: loadingDelete}] = useDeleteCategoryMutation()

   const handleCreate = async (e) => {
      e.preventDefault()
      try {
         const {error} = await createCategory({name}).unwrap()
         if(error) throw new Error(error)
         setName('')
         console.log('Created.')
         refetch()
      } catch (error) {
         console.log(error)
      }
   }
   const handleModal = (id, name) => {
      setUpdateCategoryId(id)
      setUpdateName(name)
      setModalVisible(true)
   }
   const handleUpdate = async (id, name) => {
      try {
         const {error} = await updateCategory({id, name}).unwrap()
         if(error) throw new Error(error.data.error)
         setUpdateName('')
         refetch()
         setModalVisible(false)
         console.log('Category Updated.')
      } catch (error) {
         console.log(error)
      }
   }
   const handleDelete = (id) => {
      try {
         const {error} = deleteCategory(id).unwrap()
         if(error) throw new Error(error)
         setUpdateName('')
         refetch()
         setModalVisible(false)
         console.log('Category Deleted.')
      } catch (error) {
         console.log(error)
      }
   }
   return (
      <>
         <div className=" relative flex flex-col p-2 w-full">
            <h1 className="text-white text-2xl font-semibold">Manage Categories</h1>
            <form onSubmit={(e) => handleCreate(e)} className="w-full md:w-1/2 mt-4">
               <input className="px-4 py-2 outline-none w-full rounded bg-[#121258] block text-white" placeholder="Enter the category's name" type="text" value={name} onChange={e => setName(e.target.value)}/>
               <button type="submit" className="rounded bg-cyan-700 px-4 py-2 text-white font-bold text-xl mt-4">{loadingCreate ? "Creating..." : "Create"}</button>
            </form>
            <hr className="my-4"/>
            <div className="flex flex-row flex-wrap gap-4 sm:justify-center">
               {categories?.map(category => (
                  <button key={category._id} onClick={() => handleModal(category._id, category.name)} className="py-2 px-4 font-semibold border rounded border-cyan-600 text-cyan-600 hover:bg-cyan-500 hover:text-white transition-all">{category.name}</button>
               ))}
            </div>
         </div>
         {modalVisible && <div className="absolute top-[50%] flex flex-col w-full sm:w-[400px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm transition-all rounded-lg">
            <span className="flex justify-end text-white pb-4" onClick={() => setModalVisible(false)}><FaTimes/></span>
            <input className="px-4 py-2 outline-none w-full rounded bg-gray-300 block" placeholder="Enter the category's name" type="text" value={updateName} onChange={e => setUpdateName(e.target.value)}/>
            <div className="flex justify-between">
               <button onClick={() => handleUpdate(updateCategoryId, updateName)} className="rounded bg-cyan-700 px-4 py-2 text-white font-bold text-xl mt-4">{loadingUpdate ? "Updating..." : "Update"}</button>
               <button onClick={() => handleDelete(updateCategoryId)} className="rounded bg-red-500 px-4 py-2 text-white font-bold text-xl mt-4">{loadingDelete ? "Deleting..." : "Delete"}</button>
            </div>
         </div>}
      </>
   )
}

export default CategoryList