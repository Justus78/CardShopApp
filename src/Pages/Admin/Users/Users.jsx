import React, { useEffect, useState } from 'react'
import { getAllUsersForAdmin } from '../../../Services/AdminService';
import Navbar from '../../../Components/Admin/Navbar';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

   // Framer Motion animation settings
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  // Page entrance animation
  const pageVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#0a0024] via-[#10002b] to-[#001f2d] text-white relative overflow-hidden">
       
       {/* Neon grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,0,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,0,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <motion.div
          className="relative z-10 p-6"
          variants={pageVariants}
          initial="hidden"
          animate="visible"
        >
        {loading ? (
          <p className='p-4'>loading users....</p>
        ) : error ? (
          <p className='text-red-500 p-4'> {error}</p>
        ) : users.length === 0 ? (
          <p className='p-4'>No Users Found.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl shadow-[0_0_25px_rgba(0,255,255,0.2)] border border-cyan-600/40 backdrop-blur-xl bg-[#0f022c]/70">

            <div className="overflow-x-auto rounded-2xl shadow-[0_0_25px_rgba(0,255,255,0.2)] border border-cyan-600/40 backdrop-blur-xl bg-[#0f022c]/70">

              <div className="p-6 flex justify-between items-center border-b border-cyan-500/30">
                <h2 className="text-3xl font-extrabold tracking-widest bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_10px_#0ff]">
                  ⚡ User Dashboard
                </h2>
              </div>    

              <table className="min-w-full text-sm text-cyan-100">
                <thead className="bg-gradient-to-r from-[#1a0033] to-[#002a3f] border-b border-cyan-500/40 text-cyan-300 uppercase tracking-wider text-xs">
                  <tr>
                    <th className="py-3 px-4 text-left">User ID</th>
                    <th className="py-3 px-4 text-left">User</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Orders</th>
                    <th className="py-3 px-4 text-left">Options</th>

                  </tr>
                </thead>
                <motion.tbody
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {users.map((user, i) => (
                    <motion.tr 
                      key={user.id} 
                      variants={rowVariants}
                      className={`transition-all duration-300 ${
                        i % 2 === 0 ? 'bg-[#090022]/40' : 'bg-[#0d0130]/40'
                      } hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:bg-gradient-to-r
                       hover:from-cyan-700/20 hover:to-fuchsia-700/20`}
                    >
                        <td className="py-3 px-4 font-mono text-cyan-300">{user.id}</td>

                        <td className="py-2 px-4 ">{user.userName}</td>
                        <td className="py-2 px-4 ">{user.email}</td>
                        <td className="py-2 px-4 ">{user.orderCount}</td>
                      
                        <td className="py-2 px-4">
                          <button className="text-blue-600 hover:underline">View</button>
                        </td>
                      </motion.tr>
                  ))}
              </motion.tbody>
              </table>
              
            </div>
          </div>
        )}
        
        </motion.div>
      </div>
    </>
  )
}

export default Users