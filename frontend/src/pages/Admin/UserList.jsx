import { useEffect, useState } from "react"
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa"
import Loader from "../../components/Loader"
import { useGetUsersQuery, useDaleteUserMutation, useUpdateUserMutation } from "../../redux/api/userApiSlice"

const UserList = () => {
  const {data, refetch, isLoading, error} = useGetUsersQuery()
  const [deleteUser] = useDaleteUserMutation()
  const [updateUser] = useUpdateUserMutation()

  const [editableUser, setEditableUser] = useState(null)
  const [editableUserName, setEditableUserName] = useState('')
  const [editableUserEmail, setEditableUserEmail] = useState('')

  useEffect(() => {
    refetch()
  }, [refetch])

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail
      })
      refetch()
      setEditableUser(null)
      setEditableUserEmail('')
      setEditableUserName('')
      console.log("Updated!")
    } catch (error) {
      console.log(error.data.message || error.message || error)
    }
  }
  const toggleEdit = (id, username, email) => {
    setEditableUser(id)
    setEditableUserName(username)
    setEditableUserEmail(email)
  }
  const deleteHandler = async (id) => {
    if(window.confirm("Are you sure ?")){
      try {
        await deleteUser(id)
        refetch()
        console.log("user deleted!")
      } catch (error) {
        console.log(error.data.mesage || error.error)
      }
    }
  }

  return <>
    <div className="flex flex-col p-2">
      <h1 className="text-white text-2xl font-bold">Users</h1>
      {isLoading 
        ? <div className="text-center"><Loader /></div> 
        : error 
          ? <div className="text-center">{error.data.message}</div> 
          : (<div className="flex flex-col md:flex-row mt-4">
              <table className="w-full md:w-4/5 mx-auto text-white">
                <thead>
                  <tr>
                    <th className="px-5 py-2 text-left">ID</th>
                    <th className="px-5 py-2 text-left">Username</th>
                    <th className="px-5 py-2 text-left">Email</th>
                    <th className="px-5 py-2 text-center">Admin</th>
                    <th className="px-5 py-2 text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(user => (
                    <tr key={user._id} className="border border-b-gray-500 border-x-0 border-t-0">
                      <td className="px-4 py-2">{user._id}</td>
                      <td className="px-4 py-2">
                        { editableUser === user._id 
                          ? <div className="flex items-center justify-between">
                              <input className="px-4 py-1 outline-none rounded bg-[#121258]" type="text" value={editableUserName} onChange={e => setEditableUserName(e.target.value)}/>
                              <button onClick={() => updateHandler(user._id)} className="rounded bg-cyan-700 px-4 py-2 ml-4"><FaCheck /></button>
                            </div>
                          : <div className="flex items-center justify-between">
                              <p>{user.username}</p>
                              <button onClick={() => toggleEdit(user._id, user.username, user.email)} className="rounded bg-cyan-700 px-4 py-2 ml-4"><FaEdit /></button>
                            </div>
                        }
                      </td>
                      <td className="px-4 py-2">
                        {editableUser === user._id
                          ? <div className="flex items-center justify-between">
                              <input className="px-4 py-1 outline-none rounded bg-[#121258]" type="text" value={editableUserEmail} onChange={e => setEditableUserEmail(e.target.value)}/>
                              <button onClick={() => updateHandler(user._id)} className="rounded bg-cyan-700 px-4 py-2 ml-4"><FaCheck /></button>
                            </div>
                          : <div className="flex items-center justify-between">
                              <p>{user.email}</p>
                              <button onClick={() => toggleEdit(user._id, user.username, user.email)} className="rounded bg-cyan-700 px-4 py-2 ml-4"><FaEdit/></button>
                            </div>
                        }
                      </td>
                      <td className="px-4 py-2 flex justify-center">{user.isAdmin ? <FaCheck style={{color: "green"}} /> : <FaTimes style={{color: "red"}} />}</td>
                      <td className="px-4 py-2">{!user.isAdmin ? <button onClick={() => deleteHandler(user._id)} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"><FaTrash /></button> : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>)
      }
    </div>
  </>
}

export default UserList