const UserTableHeader = () => (
  <thead className="bg-gradient-to-r from-[#1a0033] to-[#002a3f] border-b border-cyan-500/40 text-cyan-300 uppercase tracking-wider text-xs">
    <tr>
      <th className="py-3 px-4 text-left">User ID</th>
      <th className="py-3 px-4 text-left">User</th>
      <th className="py-3 px-4 text-left">Email</th>
      <th className="py-3 px-4 text-left">Orders</th>
      <th className="py-3 px-4 text-left">Options</th>
    </tr>
  </thead>
);

export default UserTableHeader;
