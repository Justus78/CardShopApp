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

      <div className="bg-gray-800 border-neon border-2 p-6 rounded-lg shadow-neon max-w-md w-full animate-fadeIn">

        <h3 className="text-xl font-bold mb-4 neon-text">
          {title}
        </h3>

        <p className="mb-6">
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