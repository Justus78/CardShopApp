const OrderItemsTable = ({ items = [] }) => (
  <>
    <h3 className="text-2xl text-cyan-400 mb-4 font-semibold border-b border-cyan-500/30 pb-2">
      Items
    </h3>

    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-cyan-600/40">
        <thead className="bg-[#0f002a] text-cyan-300">
          <tr>
            <th className="py-3 px-4 border-b border-cyan-600/40 text-left">Product</th>
            <th className="py-3 px-4 border-b border-cyan-600/40 text-left">Qty</th>
            <th className="py-3 px-4 border-b border-cyan-600/40 text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.productId} className="hover:bg-[#0a0022] transition duration-300">
              <td className="py-3 px-4 border-b border-cyan-600/40">{item.productName}</td>
              <td className="py-3 px-4 border-b border-cyan-600/40">{item.quantity}</td>
              <td className="py-3 px-4 border-b border-cyan-600/40">${item.unitPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

export default OrderItemsTable;
