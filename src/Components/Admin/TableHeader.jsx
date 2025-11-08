import React from 'react'

const TableHeader = ( {title} ) => {
  return (
    <div className="p-6 flex justify-between items-center border-b border-cyan-500/30">
        <h2 className="text-3xl font-extrabold tracking-widest bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_10px_#0ff]">
        ⚡ {title}
        </h2>
    </div>
  )
}

export default TableHeader