import { motion } from 'framer-motion';
import UserTableHeader from './UserTableHeader';
import UserTableRow from './UserTableRow';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const UserTable = ({ users, onViewUser }) => (
  <table className="min-w-full text-sm text-cyan-100">
    <UserTableHeader />
    <motion.tbody variants={containerVariants} initial="hidden" animate="show">
      {users.map((user, i) => (
        <UserTableRow key={user.id} user={user} index={i} onViewUser={onViewUser} />
      ))}
    </motion.tbody>
  </table>
);

export default UserTable;
