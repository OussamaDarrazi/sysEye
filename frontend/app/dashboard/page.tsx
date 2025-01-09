"use client";
import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import grid from "../../public/Grid.png";
import { api } from "@/utils/auth";
import { Node } from "@/app/types/Node";
import NodeCard from "@/components/NodeCard";
import NodeMetricsDashboard from "@/components/NodeMetricsDashboard";
import { NodeMetrics } from "../types/NodeMetrics";

const Page = () => {
  const [nodes, setNodes] = useState<Node[] | null>(null); // Array of Node or null
  const [selectedNode, setSelectedNode] = useState<Node | null>(null); // Single Node or null
  const [metrics, setMetrics] = useState<NodeMetrics[]>([]); // Metrics or null

  useEffect(() => {
    if (selectedNode !== null) {
      api
        .get(`/nodes/${selectedNode.id}/metrics`)
        .then((res) => {
          console.log("fetching metrics");
          console.log(res.data);
          setMetrics(res.data as NodeMetrics[]);
        })
        .catch((error) => {
          console.error("Error fetching metrics:", error);
        });
    } else {
      setMetrics([]); // Clear metrics if no node is selected
    }
  }, [selectedNode]);

  useEffect(() => {
    api.get("/nodes").then((res) => {
      console.log(res.data);
      setNodes(res.data as Node[]);
    });
  }, []);

  useEffect(() => {
    if (nodes !== null && nodes.length > 0) {
      console.log(nodes[0].is_active);
    }
  }, [nodes]);

  useEffect(() => {
    if (selectedNode !== null) {
      console.log(selectedNode);
    }
  }, [selectedNode]);

  useEffect(() => {
    if (metrics !== null && metrics.length > 0) {
      console.log("the metrics changed");
      console.log(metrics[0].id);
    }
  }, [metrics]);

  return (
    <div className="min-h-screen bg-[#121212] text-white relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url(${grid.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1728"
        height="1180"
        viewBox="0 0 1728 1180"
        fill="currentColor"
        className="absolute w-full max-h-screen -top-72 pointer-events-none opacity-60"
      >
        {/* SVG content */}
      </svg>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        <main className="container mx-auto px-4 py-20 flex gap-6">
          {/* Sidebar */}
          <aside className="w-1/4 min-h-[80vh] bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-4 flex flex-col space-y-4">
            {/* Search Bar */}
            <div>
              <input
                type="text"
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
              ) : nodes.length === 0 ? (
                <div className="text-center text-white">No nodes available</div>
              ) : (
                nodes.map((node, index) => (
                  <NodeCard
                    key={index}
                    node={node}
                    onSelect={(node: Node) => {
                      setSelectedNode(node);
                    }}
                    isSelected={
                      selectedNode !== null && selectedNode.id === node.id
                    }
                  />
                ))
              )}
            </ul>
          </aside>

          {/* Main Content */}
          <section className="flex-grow bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg flex items-center justify-center">
            {selectedNode !== null ? (
              <NodeMetricsDashboard metricsArray={metrics} />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold">No Node Selected</h2>
                <p className="text-sm text-white/70">
                  Please select a node from the list.
                </p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Page;
