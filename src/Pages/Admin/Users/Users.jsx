import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../Components/Admin/Navbar';
import { getAllUsersForAdmin } from '../../../Services/AdminService';
import {
  UserDashboardHeader,
  UserTable,
} from './Components';
import TableHeader from '../../../Components/Admin/TableHeader';

const UsersPage = () => {
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
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

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
            <p className="p-4 text-cyan-400">Loading users...</p>
          ) : error ? (
            <p className="p-4 text-red-500">{error}</p>
          ) : users.length === 0 ? (
            <p className="p-4 text-gray-400">No Users Found.</p>
          ) : (
            <div className="overflow-x-auto rounded-2xl shadow-[0_0_25px_rgba(0,255,255,0.2)] border border-cyan-600/40 backdrop-blur-xl bg-[#0f022c]/70">
              <TableHeader title={"User Table"} />
              <UserTable users={users} onViewUser={(id) => navigate(`/admin/userDetails/${id}`)} />
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default UsersPage;
