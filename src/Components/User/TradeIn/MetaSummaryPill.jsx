import React from 'react'

const MetaSummaryPill = ({ color, label }) => (
  <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 bg-gray-800/60 border border-gray-700/50 rounded-full px-3 py-1">
    <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
    {label}
  </span>
);

export default MetaSummaryPill