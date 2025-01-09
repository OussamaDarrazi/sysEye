"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Cpu, HardDrive, Activity, Network, Server } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { NodeMetrics } from "@/app/types/NodeMetrics";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

interface NodeMetricsDashboardProps {
  metricsArray: NodeMetrics[];
}

const NodeMetricsDashboard = ({ metricsArray }: NodeMetricsDashboardProps) => {
  const [metrics, setMetrics] = useState<NodeMetrics[]>([]);

  const [selectedMetrics, setSelectedMetrics] = useState<NodeMetrics>();
  useEffect(() => {
    setMetrics(metricsArray);
  }, [metricsArray]);
  useEffect(() => {
    setSelectedMetrics(metrics[0]);
  }, [metrics]);
  return (
    <ScrollArea className="h-full w-full">
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-12">
          <Select
            value={selectedMetrics?.id}
            onValueChange={(selectedMetrics_id) => {
              setSelectedMetrics(
                metrics.find((metric) => metric.id === selectedMetrics_id)
              );
            }}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {metrics.map((metric) => (
                <SelectItem
                  value={metric.id}
                  key={metric.sampleTime}
                  onSelect={() => setSelectedMetrics(metric)}
                >
                  {metric.sampleTime}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* System Info Card */}
        <Card className="col-span-12 bg-white/5 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:border-purple-500/40 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-purple-400 flex items-center gap-2 text-shadow-neon">
              <Server className="h-5 w-5" />
              System Information
            </CardTitle>
            <span className="text-sm text-purple-400/70">
              hostname.example.com
            </span>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {["OS", "Platform", "Kernel", "Uptime"].map((label, index) => (
              <div
                key={label}
                className="p-3 bg-white/5 rounded-lg border border-purple-500/10 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
              >
                <p className="text-white/60">{label}</p>
                <p className="text-purple-400">
                  {index === 0
                    ? selectedMetrics?.systemInfo.os_name
                    : index === 1
                    ? selectedMetrics?.systemInfo.platform
                    : index === 2
                    ? selectedMetrics?.systemInfo.linux_distro
                    : selectedMetrics?.uptime}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* CPU Usage Card */}
        <Card className="col-span-12 md:col-span-6 bg-white/5 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:border-purple-500/40 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-purple-400 flex items-center gap-2 text-shadow-neon">
              <Cpu className="h-5 w-5" />
              CPU Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full transition-all duration-300 hover:scale-[1.02]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={metrics.map((metric) => {
                    return { time: metric.sampleTime, value: metric.cpu.total };
                  })}
                >
                  <XAxis dataKey="time" stroke="#d8b4fe" />
                  <YAxis stroke="#d8b4fe" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(168,85,247,0.4)",
                      backdropFilter: "blur(10px)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#d8b4fe"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {["Cores", "Idle", "User", "System"].map((label, index) => (
                <div
                  key={label}
                  className="text-center p-2 bg-white/5 rounded-lg border border-purple-500/10 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                >
                  <p className="text-white/60 text-xs">{label}</p>
                  <p className="text-purple-400 font-bold">
                    {index === 0
                      ? selectedMetrics?.cpu.cpucore
                      : index === 1
                      ? selectedMetrics?.cpu.idle + "%"
                      : index === 2
                      ? selectedMetrics?.cpu.user + "%"
                      : selectedMetrics?.cpu.system + "%"}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Memory Usage Card */}
        <Card className="col-span-12 md:col-span-6 bg-white/5 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:border-purple-500/40 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-purple-400 flex items-center gap-2 text-shadow-neon">
              <HardDrive className="h-5 w-5" />
              Memory Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  label: "RAM Usage",
                  value:
                    (
                      (selectedMetrics?.memory.used ?? 0) /
                      1024 /
                      1024 /
                      1024
                    ).toFixed(2) +
                    " GB" +
                    " / " +
                    (
                      (selectedMetrics?.memory.total ?? 0) /
                      1024 /
                      1024 /
                      1024
                    ).toFixed(2) +
                    " GB",
                  progress:
                    ((selectedMetrics?.memory.used ?? 0) /
                      (selectedMetrics?.memory.total ?? 1)) *
                    100,
                },
                {
                  label: "Swap Usage",
                  value:
                    (
                      (selectedMetrics?.swapMemory.used ?? 0) /
                      1024 /
                      1024 /
                      1024
                    ).toFixed(2) +
                    " GB" +
                    " / " +
                    (
                      (selectedMetrics?.swapMemory.total ?? 0) /
                      1024 /
                      1024 /
                      1024
                    ).toFixed(2) +
                    " GB",

                  progress:
                    ((selectedMetrics?.swapMemory.used ?? 0) /
                      (selectedMetrics?.swapMemory.total ?? 1)) *
                    100,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/60">{item.label}</span>
                    <span className="text-purple-400">{item.value}</span>
                  </div>
                  <Progress
                    value={item.progress}
                    className="bg-white/10 [&>div]:bg-purple-400 [&>div]:transition-all [&>div]:duration-300 hover:[&>div]:bg-purple-300"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Previous code remains the same until the Memory Usage Card... */}

        {/* Disk Usage Card */}
        <Card className="col-span-12 md:col-span-4 bg-white/5 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:border-purple-500/40 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-purple-400 flex items-center gap-2 text-shadow-neon">
              <HardDrive className="h-5 w-5" />
              Disk Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedMetrics?.fileSystems.map((item) => (
                <div
                  key={item.device_name}
                  className="transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/60">{item.mnt_point}</span>
                    <span className="text-purple-400">
                      {((item.used / item.size) * 100).toFixed(2)}%
                    </span>
                  </div>
                  <Progress
                    value={(item.used / item.size) * 100}
                    className="bg-white/10 [&>div]:bg-purple-400 [&>div]:transition-all [&>div]:duration-300 hover:[&>div]:bg-purple-300"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Network Usage Card */}
        <Card className="col-span-12 md:col-span-4 bg-white/5 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:border-purple-500/40 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-purple-400 flex items-center gap-2 text-shadow-neon">
              <Network className="h-5 w-5" />
              Network
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[150px] transition-all duration-300 hover:scale-[1.02]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={selectedMetrics?.networkInterfaces.map(
                    (networkInterface) => {
                      return {
                        interface_name: networkInterface.interface_name,
                        value: networkInterface.speed / 1024 / 1024 / 1024,
                      };
                    }
                  )}
                >
                  <XAxis dataKey="interface_name" stroke="#d8b4fe" />
                  <YAxis stroke="#d8b4fe" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(168,85,247,0.4)",
                      backdropFilter: "blur(10px)",
                    }}
                  />
                  <Bar dataKey="value" fill="#d8b4fe" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4"></div>
          </CardContent>
        </Card>

        {/* Process Card */}
        <Card className="col-span-12 md:col-span-4 bg-white/5 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:border-purple-500/40 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-purple-400 flex items-center gap-2 text-shadow-neon">
              <Activity className="h-5 w-5" />
              Processes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Total", value: selectedMetrics?.processCount.total },
                {
                  label: "Running",
                  value: selectedMetrics?.processCount.running,
                },
                {
                  label: "Sleeping",
                  value: selectedMetrics?.processCount.sleeping,
                },
                {
                  label: "Threads",
                  value: selectedMetrics?.processCount.thread,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="text-center p-4 bg-white/5 rounded-lg border border-purple-500/10 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                >
                  <p className="text-white/60 text-xs">{item.label}</p>
                  <p className="text-2xl font-bold text-purple-400">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};

export default NodeMetricsDashboard;
