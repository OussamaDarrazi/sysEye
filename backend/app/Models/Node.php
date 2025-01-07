<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Node extends Model
{
    //
    protected $fillable = [
        'name',
        'ip',
        'exporter_port',
        'is_active',
        'probe_interval',
        'deactivate_on_unreachable',
        'notify_on_unreachable',
        'retries',
        'user_id',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'probe_interval' => 'integer',
        'deactivate_on_unreachable' => 'boolean',
        'notify_on_unreachable' => 'boolean',
        'retries' => 'integer',
    ];

    public function exporter()
    {
        return $this->embedsOne(Exporter::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function metricSamples(){
        return $this->hasMany(MetricsSample::class);
    }

}
