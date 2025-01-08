export interface Node {
  id?: string;
  name: string;
  ip: string;
  exporter_port: number;
  is_active: boolean;
  probe_interval: number;
  deactivate_on_unreachable: boolean;
  notify_on_unreachable: boolean;
  retries: number;
}
