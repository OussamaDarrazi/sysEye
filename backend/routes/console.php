<?php

use Illuminate\Support\Facades\Schedule;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use App\Mail\UnreachableNodeMail;
use Illuminate\Support\Facades\Mail;
use \App\Models\Node;
use \App\Services\GlancesMetricsSampler;
use \App\Exceptions\UnreachableNodeException;
use App\Models\MetricsSample;
use GuzzleHttp\Exception\RequestException;
Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();


$nodes = Node::all();
foreach($nodes as $node){
    // Add your code here
    Schedule::call(
        function () use ($node) {
            $sampler = new GlancesMetricsSampler($node);
            try {
                $metrics = $sampler->fetchMetrics();
                echo( "Metrics fetched for node: " . $metrics["node_id"] . PHP_EOL);
                MetricsSample::create($metrics);
            } catch (UnreachableNodeException $e) {
                echo( "Node unreachable: " . $e->getMessage() . PHP_EOL);
                if($node->deactivate_on_unreachable){
                    $node->update(['is_active' => false]);
                }
            }
        }
    )->cron("*/". $node->probe_interval . " * * * *");
}