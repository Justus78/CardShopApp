const FolderCard = ({ children }) => (
  <div className="relative">
    {/* Tab */}
    <div className="w-2/5 h-5 bg-purple-900 rounded-t-md" />

    {/* Folder body — this is your "inside" */}
    <div className="relative bg-purple-950/40 border border-purple-900/50 rounded-tr-xl rounded-b-xl p-4">
      {children}
    </div>
  </div>
);

export default FolderCard;