<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MetricsSampleController;
use App\Http\Controllers\NodeController;
use App\Models\MetricsSample;

use App\Models\Node;
// Authentication Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::apiResource("nodes", NodeController::class);
Route::apiResource("nodes.metrics", MetricsSampleController::class)->only([
    'index', 'show'
]);

Route::get("/nodes/{node}/probe", [NodeController::class, 'probe']);

Route::get("/test", function(){
    Node::create([
        'name' => 'Test Node',
        'ip' => '192.168.40.132',
        'exporter_port' => 61208,
        'is_active' => true,
        'probe_interval' => 1,
        'deactivate_on_unreachable' => true,
        'notify_on_unreachable' => true,
        'retries' => 3,
        'user_id' => 1
    ]);
    return Node::all();
});



