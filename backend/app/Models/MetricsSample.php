<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class MetricsSample extends Model
{
    //
    protected $fillable = [
        'sampleTime',
        'systemTime',
        'networkInterfaces',
        'processCount',
        'fileSystems',
        'memory',
        'systemInfo',
        'cpu',
        'gpu',
        'uptime',
        'swapMemory',
        'node_id',
    ];

    protected $casts = [
        'sampleTime' => 'datetime',
        'systemTime' => 'array',
        'networkInterfaces' => 'array',
        'processCount' => 'array',
        'fileSystems' => 'array',
        'memory' => 'array',
        'systemInfo' => 'array',
        'cpu' => 'array',
        'gpu' => 'array',
        'swapMemory' => 'array',
    ];

    public function node(){
        return $this->belongsTo(Node::class);
    }
}
