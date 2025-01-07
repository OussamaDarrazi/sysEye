<?php

namespace App\Services;
use App\Services\MetricsSamplerService;
use App\Exceptions\UnreachableNodeException;
use GuzzleHttp\Exception\ConnectException;


class GlancesMetricsSampler extends MetricsSamplerService
{
    public function fetchMetrics(): array
    {
        return $this->formatRawMetrics($this->fetchRawMetrics());
    }

    public function formatRawMetrics(array $rawMetrics): array
    {
        return [
            'node_id' => $rawMetrics['node_id'] ?? null,
            'sampleTime' => $rawMetrics['sampleTime'] ?? date('Y-m-d H:i:s'),
            'systemTime' => $rawMetrics['now'] ?? [
                'iso' => date('c'),
                'custom' => date('Y-m-d H:i:s O')
            ],
            'networkInterfaces' => array_map(function ($interface) {
                return [
                    'speed' => $interface['speed'] ?? 0,
                    'interface_name' => $interface['interface_name'] ?? ''
                ];
            }, $rawMetrics['network'] ?? []),
            
            'processCount' => [
                'total' => $rawMetrics['processcount']['total'] ?? 0,
                'running' => $rawMetrics['processcount']['running'] ?? 0,
                'sleeping' => $rawMetrics['processcount']['sleeping'] ?? 0,
                'thread' => $rawMetrics['processcount']['thread'] ?? 0
            ],
            
            'fileSystems' => array_map(function ($fs) {
                return [
                    'device_name' => $fs['device_name'] ?? '',
                    'fs_type' => $fs['fs_type'] ?? '',
                    'mnt_point' => $fs['mnt_point'] ?? '',
                    'size' => $fs['size'] ?? 0,
                    'used' => $fs['used'] ?? 0,
                    'free' => $fs['free'] ?? 0
                ];
            }, $rawMetrics['fs'] ?? []),
            
            'memory' => [
                'total' => $rawMetrics['mem']['total'] ?? 0,
                'used' => $rawMetrics['mem']['used'] ?? 0,
                'free' => $rawMetrics['mem']['free'] ?? 0
            ],
            
            'systemInfo' => [
                'os_name' => $rawMetrics['system']['os_name'] ?? '',
                'hostname' => $rawMetrics['system']['hostname'] ?? '',
                'platform' => $rawMetrics['system']['platform'] ?? '',
                'os_version' => $rawMetrics['system']['os_version'] ?? '',
                'linux_distro' => $rawMetrics['system']['linux_distro'] ?? '',
                'hr_name' => $rawMetrics['system']['hr_name'] ?? ''
            ],
            
            'cpu' => [
                'min1' => $rawMetrics['load']['min1'] ?? 0,
                'min5' => $rawMetrics['load']['min5'] ?? 0,
                'min15' => $rawMetrics['load']['min15'] ?? 0,
                'total' => $rawMetrics['cpu']['total'] ?? 0,
                'user' => $rawMetrics['cpu']['user'] ?? 0,
                'system' => $rawMetrics['cpu']['system'] ?? 0,
                'idle' => $rawMetrics['cpu']['idle'] ?? 0,
                'cpucore' => $rawMetrics['cpu']['cpucore'] ?? 0
            ],
            
            'gpu' => array_map(function ($gpu) {
                return [
                    'gpu_id' => $gpu['gpu_id'] ?? 'id',
                    'gpu_name' => $gpu['gpu_name'] ?? 'name',
                    'mem' => $gpu['mem'] ?? 0,
                    'proc' => $gpu['proc'] ?? 0,
                    'temperature' => $gpu['temperature'] ?? 0,
                    'fan_speed' => $gpu['fan_speed'] ?? 0
                ];
            }, $rawMetrics['gpu'] ?? []),
            
            'uptime' => $rawMetrics['uptime'] ?? '0:00:00',
            
            'swapMemory' => [
                'total' => $rawMetrics['memswap']['total'] ?? 0,
                'used' => $rawMetrics['memswap']['used'] ?? 0,
                'free' => $rawMetrics['memswap']['free'] ?? 0
            ]
        ];
    }

    public function fetchRawMetrics(): array
    {
        $current_attempt = 0;
        $max_attempts = $this->node->retries;
        while($current_attempt < $max_attempts){
            try {
                $response = $this->client->get("http://".$this->node->ip.":". $this->node->exporter_port . '/api/4/all');
                $metricsArray = json_decode($response->getBody(), true);
                $metricsArray['node_id'] = $this->node->id;
                $metricsArray['sampleTime'] = date('Y-m-d H:i:s');
                return $metricsArray;
            } catch (ConnectException $e) {
                $current_attempt++;
            }
        }
        throw new UnreachableNodeException($this->node);

    }
}
