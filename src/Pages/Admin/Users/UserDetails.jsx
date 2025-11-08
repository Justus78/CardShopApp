import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../../Components/Admin/Navbar'
import { getUserById } from '../../../Services/AdminService'
import OrderTable from '../../../Components/Admin/OrderTable'

const UserDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getUserById(id);
                setUser(res);

            } catch (error) {
                console.error(error);
                toast.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    console.log(user)

    if(loading)
        return <p className="text-cyan-400 text-center mt-10 text-lg">Loading order...</p>;
    if (!user)
        return <p className="text-red-500 text-center mt-10 text-lg">User not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0022] to-[#010101] text-white font-sans">
        <Navbar />

        <h2 className="text-3xl font-bold mb-6 text-cyan-400 text-center drop-shadow-[0_0_10px_#00ffff]">
          User Details
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-3">
            <p><span className="text-purple-400 font-semibold">User ID:</span> {user.id}</p>
            <p><span className="text-purple-400 font-semibold">Customer:</span> {user.username || "No username found"}</p>
          </div>              
        </div>
        <OrderTable orders={user.orders}/>    
    </div>
  )
}

export default UserDetails