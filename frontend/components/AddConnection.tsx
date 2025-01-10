"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { api } from "@/utils/auth";
import { useRouter } from "next/navigation";

interface AddConnectionProps {
  onAdd?: () => void;
}

const AddConnection: React.FC<AddConnectionProps> = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    ip: "",
    exporter_port: "",
    is_active: true,
    probe_interval: "10", // Default 10 minutes
    deactivate_on_unreachable: true,
    notify_on_unreachable: true,
    retries: "3", // Default 3 retries
  });

  const handleSubmit = async () => {
    try {
      const response = await api.post("/nodes", formData);
      console.log(formData);
      if (response.status === 201) {
        console.log("Connection added successfully");
        onAdd?.();
      }
    } catch (error) {
      console.error("Failed to add connection:", error);
    }
  };

  return (
    <Dialog>
      <div className="relative grow flex justify-center w-fit lg:max-w-2xl px-16 py-4 rounded-lg bg-gray-800/10 border border-gray-800/20 mx-auto lg:w-full z-40 shadow-[0_0px_20px_0px_rgba(121,137,236,0.25)]">
        <DialogTrigger asChild>
          <div className="relative grow flex justify-center w-fit px-8 py-2 rounded-lg bg-[#121212] border border-white/10 mx-auto hover:bg-white/10 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-600/30">
            <div className="w-full flex justify-center relative">
              <div className="text-white/70 text-sm font-medium flex items-center justify-between px-4 py-1">
                Add your server
              </div>
            </div>
          </div>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-[525px] bg-[#121212]/95 backdrop-blur-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">Add Connection</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Basic Info */}
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-white">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Connection name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-white/5 border-white/10 text-white focus:border-white/20"
            />
          </div>

          {/* Connection Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="ip" className="text-white">
                IP Address
              </Label>
              <Input
                id="ip"
                placeholder="192.168.1.1"
                value={formData.ip}
                onChange={(e) =>
                  setFormData({ ...formData, ip: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white focus:border-white/20"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="exporter_port" className="text-white">
                Exporter Port
              </Label>
              <Input
                id="exporter_port"
                placeholder="8080"
                pattern="[0-9]*"
                value={formData.exporter_port}
                onChange={(e) =>
                  setFormData({ ...formData, exporter_port: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white focus:border-white/20"
              />
            </div>
          </div>

          {/* Monitoring Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="probe_interval" className="text-white">
                Probe Interval (minutes)
              </Label>
              <Input
                id="probe_interval"
                type="number"
                placeholder="60"
                value={formData.probe_interval}
                onChange={(e) =>
                  setFormData({ ...formData, probe_interval: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white focus:border-white/20"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="retries" className="text-white">
                Retries
              </Label>
              <Input
                id="retries"
                type="number"
                placeholder="3"
                value={formData.retries}
                onChange={(e) =>
                  setFormData({ ...formData, retries: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white focus:border-white/20"
              />
            </div>
          </div>

          {/* Toggle Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="deactivate_on_unreachable" className="text-white">
                Deactivate When Unreachable
              </Label>
              <Switch
                id="deactivate_on_unreachable"
                checked={formData.deactivate_on_unreachable}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    deactivate_on_unreachable: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="notify_on_unreachable" className="text-white">
                Notify When Unreachable
              </Label>
              <Switch
                id="notify_on_unreachable"
                checked={formData.notify_on_unreachable}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, notify_on_unreachable: checked })
                }
              />
            </div>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full bg-purple-500 hover:bg-white/20 text-white"
        >
          Add Node
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddConnection;
