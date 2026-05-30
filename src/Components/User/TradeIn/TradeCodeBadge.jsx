
// const TradeCodeBadge = ({ code }) => (
//   <span className="inline-flex items-center gap-1.5 font-mono text-xs text-purple-400 bg-purple-950/40 border border-purple-900/60 rounded-md px-2.5 py-1">
//     <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//       <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
//     </svg>
//     {code}
//   </span>
// );

import { FileText } from "lucide-react";

const TradeCodeBadge = ({ code }) => (
  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-purple-400 bg-purple-950/40 border border-purple-900/60 rounded-md px-2.5 py-1">
    <FileText size={20} strokeWidth={2} />
    {code}
  </span>
);


export default TradeCodeBadge