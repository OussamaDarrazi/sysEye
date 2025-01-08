"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Cpu, 
  HardDrive, 
  Activity, 
  Network, 
  Server, 
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const cpuData = [
  { time: '5m', value: 45 },
  { time: '10m', value: 30 },
  { time: '15m', value: 60 },
  { time: '20m', value: 35 },
  { time: '25m', value: 50 },
  { time: '30m', value: 45 }
];
const networkData = [
  { name: 'Rx', value: 65 },
  { name: 'Tx', value: 45 }
];

const NodeMetricsDashboard = () => {
  return (
    <ScrollArea className="h-full w-full bg-black/40">
      <div className="grid grid-cols-12 gap-4 p-4">
        {/* System Info Card */}
        <Card className="col-span-12 bg-white/5 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:border-purple-500/40 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-purple-400 flex items-center gap-2 text-shadow-neon">
              <Server className="h-5 w-5" />
              System Information
            </CardTitle>
            <span className="text-sm text-purple-400/70">hostname.example.com</span>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {["OS", "Platform", "Kernel", "Uptime"].map((label, index) => (
              <div key={label} className="p-3 bg-white/5 rounded-lg border border-purple-500/10 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <p className="text-white/60">{label}</p>
                <p className="text-purple-400">{
                  index === 0 ? "Ubuntu 22.04 LTS" :
                  index === 1 ? "x86_64" :
                  index === 2 ? "5.15.0-88-generic" :
                  "5 days, 2 hours"
                }</p>
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
                <LineChart data={cpuData}>
                  <XAxis dataKey="time" stroke="#d8b4fe" />
                  <YAxis stroke="#d8b4fe" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(168,85,247,0.4)',
                      backdropFilter: 'blur(10px)'
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
              {["Cores", "Load", "User", "System"].map((label, index) => (
                <div key={label} className="text-center p-2 bg-white/5 rounded-lg border border-purple-500/10 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  <p className="text-white/60 text-xs">{label}</p>
                  <p className="text-purple-400 font-bold">{
                    index === 0 ? "8" :
                    index === 1 ? "45%" :
                    index === 2 ? "32%" :
                    "13%"
                  }</p>
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
                { label: "RAM Usage", value: "8.2 GB / 16 GB", progress: 52 },
                { label: "Swap Usage", value: "1.5 GB / 4 GB", progress: 37 }
              ].map((item) => (
                <div key={item.label} className="transition-all duration-300 hover:scale-[1.02]">
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
              <div className="grid grid-cols-2 gap-4 mt-4">
                {["Cache", "Buffers"].map((label) => (
                  <div key={label} className="bg-white/5 p-3 rounded-lg border border-purple-500/10 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    <p className="text-white/60 text-xs">{label}</p>
                    <p className="text-purple-400 font-bold">{label === "Cache" ? "2.4 GB" : "1.1 GB"}</p>
                  </div>
                ))}
              </div>
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
              {[
                { label: "/", value: "75 GB / 256 GB", progress: 29 },
                { label: "/home", value: "120 GB / 512 GB", progress: 23 }
              ].map((item) => (
                <div key={item.label} className="transition-all duration-300 hover:scale-[1.02]">
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
                <BarChart data={networkData}>
                  <XAxis dataKey="name" stroke="#d8b4fe" />
                  <YAxis stroke="#d8b4fe" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(168,85,247,0.4)',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Bar dataKey="value" fill="#d8b4fe" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="bg-white/5 p-3 rounded-lg text-center border border-purple-500/10 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <p className="text-white/60 text-xs">Speed</p>
                <p className="text-purple-400 font-bold">3.7 MB/s</p>
            </div>
            </div>

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
                { label: "Total", value: "234" },
                { label: "Running", value: "42" },
                { label: "Sleeping", value: "186" },
                { label: "Threads", value: "1.2k" }
              ].map((item) => (
                <div key={item.label} className="text-center p-4 bg-white/5 rounded-lg border border-purple-500/10 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  <p className="text-white/60 text-xs">{item.label}</p>
                  <p className="text-2xl font-bold text-purple-400">{item.value}</p>
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