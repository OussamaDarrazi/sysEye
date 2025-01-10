import React, { useState } from "react";
import NodeCard from "./NodeCard";
import { Node } from "@/app/types/Node";
import AddConnection from "./AddConnection";

interface SidebarProps {
  nodes: Node[] | null;
  selectedNode: Node | null;
  setSelectedNode: (node: Node) => void;
  onNodeSave?: (node?: Node) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  nodes,
  selectedNode,
  setSelectedNode,
  onNodeSave,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  // Filter nodes based on search term
  const filteredNodes = nodes?.filter((node: { name: string }) =>
    node.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filteredNodes);
  const handleSearch = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  return (
    <aside className="w-1/4 min-h-[80vh] bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-4 flex flex-col space-y-4">
      {/* Search Bar */}
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
          className="w-full px-4 py-2 text-sm bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* List */}
      <ul className="flex-grow space-y-2 overflow-y-auto">
        {nodes === null ? (
          <div className="flex justify-center items-center h-full">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          </div>
        ) : filteredNodes?.length === 0 ? (
          <div className="text-center text-white">No matching nodes found</div>
        ) : (
          filteredNodes?.map((node: Node) => (
            <NodeCard
              key={node.id} // Use a unique identifier
              node={node}
              onSelect={(node) => {
                setSelectedNode(node);
              }}
              isSelected={selectedNode !== null && selectedNode.id === node.id}
              onSave={(node) => {
                onNodeSave?.(node);
              }}
            />
          ))
        )}
      </ul>
      {/* Add Connection Button */}
      <div className="flex justify-center pt-4 border-t border-white/10">
        <AddConnection onAdd={onNodeSave} />
      </div>
    </aside>
  );
};

export default Sidebar;
