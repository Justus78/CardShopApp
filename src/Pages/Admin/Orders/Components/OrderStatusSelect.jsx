

const OrderStatusSelect = ({ status, onChange }) => {
  const handleChange = (e) => onChange(parseInt(e.target.value));

  return (
    <div className="space-y-3">
      <label className="text-purple-400 font-semibold mr-2">Status:</label>
      <select
        value={status}
        onChange={handleChange}
        className="bg-black border border-cyan-500 text-cyan-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
      >
        <option value={0}>Pending</option>
        <option value={1}>Paid</option>
        <option value={2}>Failed</option>
        <option value={3}>Shipped</option>
        <option value={4}>Cancelled</option>
      </select>
    </div>
  );
};

export default OrderStatusSelect;