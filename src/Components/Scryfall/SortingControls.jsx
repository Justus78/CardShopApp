import React from "react";

const SortingControls = ({ sortOrder, setSortOrder, groupBy, setGroupBy }) => {
  return (
    <div className="max-w-2xl mx-auto flex gap-4 mb-6">
      <select
        className="flex-1 bg-gray-900 border border-purple-500 rounded-xl text-white p-2 
                   focus:ring-2 focus:ring-cyan-500"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="name">Sort by Name</option>
        <option value="set_name">Sort by Set</option>
        <option value="rarity">Sort by Rarity</option>
      </select>

      <select
        className="flex-1 bg-gray-900 border border-purple-500 rounded-xl text-white p-2 
                   focus:ring-2 focus:ring-cyan-500"
        value={groupBy}
        onChange={(e) => setGroupBy(e.target.value)}
      >
        <option value="">No Grouping</option>
        <option value="set_name">Group by Set</option>
        <option value="rarity">Group by Rarity</option>
      </select>
    </div>
  );
};

export default SortingControls;
