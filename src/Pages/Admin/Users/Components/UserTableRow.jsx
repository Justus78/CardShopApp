import { motion } from 'framer-motion';

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const UserTableRow = ({ user, index, onViewUser }) => (
  <motion.tr
    variants={rowVariants}
    className={`transition-all duration-300 ${
      index % 2 === 0 ? 'bg-[#090022]/40' : 'bg-[#0d0130]/40'
    } hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:bg-gradient-to-r
    hover:from-cyan-700/20 hover:to-fuchsia-700/20`}
  >
    <td className="py-3 px-4 font-mono text-cyan-300">{user.id}</td>
    <td className="py-2 px-4">{user.userName}</td>
    <td className="py-2 px-4">{user.email}</td>
    <td className="py-2 px-4">{user.orderCount}</td>
    <td className="py-2 px-4">
      <motion.button
        whileHover={{ scale: 1.1, textShadow: '0 0 8px #0ff' }}
        onClick={() => onViewUser(user.id)}
        className="relative inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-fuchsia-400 transition-all duration-300 group"
      >
        <span className="z-10">View / Edit</span>
        <span className="absolute inset-0 rounded-md bg-gradient-to-r from-cyan-500 to-fuchsia-600 opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-500"></span>
      </motion.button>
    </td>
  </motion.tr>
);

export default UserTableRow;
