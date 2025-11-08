import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../../Components/Admin/Navbar'
import { getUserById } from '../../../Services/AdminService'
import OrderTable from '../../../Components/Admin/OrderTable'
import TableHeader from '../../../Components/Admin/TableHeader'
import { UserData } from './Components'

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
        <UserData user={user} />
        <TableHeader title={"User Orders"} />
        <OrderTable orders={user.orders}/>    
    </div>
  )
}

export default UserDetails