import React from "react";

const ConfirmModal = ({
  isOpen,
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  confirmColor = "bg-green-600",
  cancelColor = "bg-gray-600",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white/10 backdrop-blur-sm border border-gray-800 border-t-2 border-t-purple-600 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 text-white">
          {title}
        </h3>

        <p className="mb-6 text-fuchsia-600 font-bold text-lg text-wrap">
          {message}
        </p>

        <div className="flex justify-end gap-4">

          <button
            onClick={onCancel}
            className={`px-4 py-2 rounded neon-button font-bold ${cancelColor}`}
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded neon-button font-bold ${confirmColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;