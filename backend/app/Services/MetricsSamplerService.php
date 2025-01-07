<?php


namespace App\Services;
use GuzzleHttp\Client;
abstract class MetricsSamplerService
{
    protected $node;
    protected $client;

    public function __construct($node)
    {
        $this->node = $node;
        $this->client = new Client([
            'timeout' => env('METRICS_TIMEOUT', 5),
        ]);
    }

    abstract public function fetchRawMetrics(): array;

    abstract public function fetchMetrics(): array;

    abstract public function formatRawMetrics(array $rawMetrics): array;
}
