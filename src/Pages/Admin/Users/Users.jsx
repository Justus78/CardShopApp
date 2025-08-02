import React, { useEffect, useState } from 'react'
import { getAllUsersForAdmin } from '../../../Services/AdminService';
import Navbar from '../../../Components/Admin/Navbar';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await getAllUsersForAdmin();
        setUsers(res);
      } catch {
        setError("Failed to fetch users.")
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, [])

  return (
    <div>
      <Navbar />
      {loading ? (
        <p className='p-4'>loading users....</p>
      ) : error ? (
        <p className='text-red-500 p-4'> {error}</p>
      ) : users.length === 0 ? (
        <p className='p-4'>No Users Found.</p>
      ) : (
        <div className="p-4 overflow-x-auto">
          <h2 className='text-2xl font-semibold mb-4'>Users</h2>
          <table className='min-w-full bg-white border border-gray-300'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='py-2 px-4 border-b text-left'>User</th>
                <th className='py-2 px-4 border-b text-left'>Email</th>
                <th className='py-2 px-4 border-b text-left'>Orders</th>
                <th className='py-2 px-4 border-b text-left'>Options</th>

              </tr>
            </thead>
            <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{user.userName}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.orderCount}</td>
                 
                  <td className="py-2 px-4 border-b">
                    <button className="text-blue-600 hover:underline">View</button>
                  </td>
                </tr>
            ))}
          </tbody>
          </table>
          
        </div>
      )}
    </div>
  )
}

export default Users