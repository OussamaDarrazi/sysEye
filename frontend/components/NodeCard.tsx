import React, { useState, useRef } from "react";
import { Node } from "@/app/types/Node";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/auth";

interface NodeCardProps {
  node: Node;
  isSelected?: boolean;
  isEditing?: boolean;
  onSelect?: (node: Node) => void;
  onSave?: (node: Node) => void;
  onEditCancel?: (node: Node) => void;
}

export default function NodeCard({
  node,
  isSelected,
  isEditing,
  onSelect,
  onSave,
  onEditCancel,
}: NodeCardProps) {
  const [isSelectedState, setIsSelected] = useState(isSelected);
  const [isEditingState, setIsEditing] = useState(isEditing);
  const [editForm, setEditForm] = useState(node);
  const [currentNode, setCurrentNode] = useState(node);
  const cardRef = useRef<HTMLLIElement>(null);

  const handleDelete = async () => {
    try {
      await api.delete(`/nodes/${node.id}`);
      onSave?.(node);
    } catch (error) {
      console.error("Failed to delete node:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedNode = await api.put(`/nodes/${node.id}`, editForm);
      setIsEditing(false);
      setCurrentNode(updatedNode.data);
      onSave?.(updatedNode.data);
    } catch (error) {
      console.error("Failed to update node:", error);
    }
  };

  const handleToggleActive = async () => {
    try {
      const updatedNode = await api.put(`/nodes/${node.id}`, {
        ...node,
        is_active: !node.is_active,
      });
      setCurrentNode(updatedNode.data);
      onSave?.(node);
    } catch (error) {
      console.error("Failed to toggle node status:", error);
    }
  };

  const handleCancel = () => {
    setEditForm(node);
    setIsEditing(false);
    onEditCancel?.(node);
  };

  const handleClick = (node: Node) => {
    setIsSelected(true);
    if (onSelect) {
      onSelect(node);
    }
  };

  return (
    <li
      ref={cardRef}
      className={`
        relative p-4 rounded-lg focus:border-2 focus:border-purple-500
        ${isSelectedState ? " bg-white/20" : ""}
        ${isEditingState ? "bg-white/20" : "bg-white/10 hover:bg-white/20"}
        transition-all
      `}
      onClick={() => handleClick(node)}
      onBlur={(e) => {
        if (!cardRef.current?.contains(e.relatedTarget)) {
          handleCancel();
        }
      }}
      tabIndex={0}
    >
      {isEditingState ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
          className="space-y-4"
        >
          <Input
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            placeholder="Node name"
            className="bg-white/5 border-white/10 text-white"
          />
          <Input
            value={editForm.ip}
            onChange={(e) => setEditForm({ ...editForm, ip: e.target.value })}
            placeholder="IP address"
            className="bg-white/5 border-white/10 text-white"
          />
          <Input
            value={editForm.exporter_port}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                exporter_port: parseInt(e.target.value),
              })
            }
            placeholder="Exporter Port"
            className="bg-white/5 border-white/10 text-white"
          />
          <Input
            value={editForm.probe_interval}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                probe_interval: parseInt(e.target.value),
              })
            }
            placeholder="Probe Interval"
            className="bg-white/5 border-white/10 text-white"
          />
          <Input
            value={editForm.retries}
            onChange={(e) =>
              setEditForm({ ...editForm, retries: parseInt(e.target.value) })
            }
            placeholder="Retries"
            className="bg-white/5 border-white/10 text-white"
          />
          <div className="flex items-center gap-2">
            <Switch
              checked={editForm.is_active}
              onCheckedChange={(checked) =>
                setEditForm({ ...editForm, is_active: checked })
              }
            />
            <span className="text-white text-sm">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={editForm.deactivate_on_unreachable}
              onCheckedChange={(checked) =>
                setEditForm({ ...editForm, deactivate_on_unreachable: checked })
              }
            />
            <span className="text-white text-sm">
              Deactivate on Unreachable
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={editForm.notify_on_unreachable}
              onCheckedChange={(checked) =>
                setEditForm({ ...editForm, notify_on_unreachable: checked })
              }
            />
            <span className="text-white text-sm">Notify on Unreachable</span>
          </div>
          <div className="flex justify-end gap-2 items-center">
            <Button type="submit">Save</Button>
            <Button variant="outline" type="button" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">{currentNode.name}</span>
            <span
              className={`h-2 w-2 rounded-full ${
                currentNode.is_active ? "bg-green-500" : "bg-red-500"
              }`}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <MoreVertical className="h-4 w-4 text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#121212]/95 border-white/10">
              <DropdownMenuItem
                onClick={() => setIsEditing(true)}
                className="text-white hover:bg-white/10"
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleToggleActive}
                className="text-white hover:bg-white/10"
              >
                {currentNode.is_active ? "Deactivate" : "Activate"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-red-500 hover:bg-white/10"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </li>
  );
}
