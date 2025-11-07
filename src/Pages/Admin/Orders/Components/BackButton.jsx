
const BackButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="px-6 py-2 rounded-md bg-cyan-500 hover:bg-cyan-600 text-black font-semibold shadow-[0_0_15px_#00ffff] transition duration-300"
  >
    Back to Orders
  </button>
);

export default BackButton;
