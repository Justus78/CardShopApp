import React from 'react'
import { Eye } from 'lucide-react';

const ReviewButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="mt-1 self-start inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-400 border border-purple-900/50 rounded-md hover:bg-purple-950/40 transition-colors"
  >
    <Eye size={12} />
    Review
  </button>
);


export default ReviewButton