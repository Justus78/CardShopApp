import React from 'react'

const UserData = ( {user} ) => {
  console.log(user)
  return (
    <div>
        <h2 className="text-3xl font-bold mb-6 text-cyan-400 text-center drop-shadow-[0_0_10px_#00ffff]">
          User Details
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-3">
            <p><span className="text-purple-400 font-semibold">User ID:</span> {user.id}</p>
            <p><span className="text-purple-400 font-semibold">Customer:</span> {user.userName || "No username found"}</p>
          </div>              
        </div>
    </div>
  )
}

export default UserData