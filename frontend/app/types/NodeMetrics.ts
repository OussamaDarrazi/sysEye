export interface NodeMetrics {
  node_id: string;
  sampleTime: string;
  systemTime: {
    iso: string;
    custom: string;
  };
  networkInterfaces: {
    speed: number;
    interface_name: string;
  }[];
  processCount: {
    total: number;
    running: number;
    sleeping: number;
    thread: number;
  };
  fileSystems: {
    device_name: string;
    fs_type: string;
    mnt_point: string;
    size: number;
    used: number;
    free: number;
  }[];
  memory: {
    total: number;
    used: number;
    free: number;
  };
  systemInfo: {
    os_name: string;
    hostname: string;
    platform: string;
    os_version: string;
    linux_distro: string;
    hr_name: string;
  };
  cpu: {
    min1: number;
    min5: number;
    min15: number;
    total: number;
    user: number;
    system: number;
    idle: number;
    cpucore: number;
  };
  gpu: any[];
  uptime: string;
  swapMemory: {
    total: number;
    used: number;
    free: number;
  };
  updated_at: string;
  created_at: string;
  id: string;
}
