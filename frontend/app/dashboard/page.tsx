"use client";
import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import grid from "../../public/Grid.png";
import { api } from "@/utils/auth";
import { Node } from "@/app/types/Node";
import NodeMetricsDashboard from "@/components/NodeMetricsDashboard";
import { NodeMetrics } from "../types/NodeMetrics";
import Sidebar from "@/components/Sidebar";

const Page = () => {
  const [nodes, setNodes] = useState<Node[] | null>(null); // Array of Node or null
  const [selectedNode, setSelectedNode] = useState<Node | null>(null); // Single Node or null
  const [metrics, setMetrics] = useState<NodeMetrics[]>([]);

  const fetchNodes = async () => {
    try {
      const response = await api.get("/nodes");
      setNodes(response.data as Node[]);
    } catch (error) {
      console.error("Failed to fetch nodes:", error);
    }
  };

  const fetchMetrics = async (node: Node) => {
    try {
      const response = await api.get(`/nodes/${node.id}/metrics`);
      setMetrics(response.data as NodeMetrics[]);
    } catch (error) {
      console.error("Failed to fetch metrics:", error);
    }
  };

  const probe = async (node: Node) => {
    try {
      const response = await api.get(`/nodes/${node.id}/probe`);
      console.log("Probe response:", response.data);
      fetchMetrics(node);
    } catch (error) {
      console.error("Failed to probe node:", error);
    }
  };

  //fetch the metrics based on the selected node
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

  //fetch the nodes
  useEffect(() => {
    fetchNodes();
  }, []);

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
          <Sidebar
            nodes={nodes}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            onNodeSave={fetchNodes}
          />

          {/* Main Content */}
          <section className="flex-grow bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg flex items-center justify-center">
            {selectedNode !== null ? (
              metrics.length > 0 ? (
                <NodeMetricsDashboard
                  metricsArray={metrics}
                  onProbe={() => {
                    probe(selectedNode);
                  }}
                />
              ) : (
                <h2 className="text-2xl font-bold">No Metrics to show</h2>
              )
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
