<?php

namespace App\Http\Controllers;

use App\Models\MetricsSample;
use App\Models\Node;
use App\Services\GlancesMetricsSampler;
use Illuminate\Http\Request;

class NodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         $user = auth('sanctum')->user();
         $nodes = Node::where('user_id', $user->id)->get();
         return $nodes;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'name' => 'required',
            'ip' => 'required',
            'exporter_port' => 'required',
            'is_active' => 'required',
            'deactivate_on_unreachable' => 'required',
            'notify_on_unreachable' => 'required',
            'retries' => 'required',
        ]);

        $node = Node::create($request->all());
        $node->user()->associate(auth('sanctum')->user());
        $node->save();

        return $node;
    }

    /**
     * Display the specified resource.
     */
    public function show(Node $node)
    {
        //
        return $node;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Node $node)
    {
        //
        $request->validate([
            'name' => 'required|unique:nodes,name,'.$node->id,
            'ip' => 'required',
            'exporter_port' => 'required',
            'is_active' => 'required',
            'deactivate_on_unreachable' => 'required',
            'notify_on_unreachable' => 'required',
            'retries' => 'required',
        ]);

        $node->update($request->all());

        return $node;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Node $node)
    {
        //
        if($node->delete()){
            return response()->json(["message" => "Node deleted successfully"], 200);
        }else{
            return response()->json(["message" => "Error deleting node"], 500);
        }
    }

    public function probe(Node $node)
    {
        $sampler = new GlancesMetricsSampler($node);
        $metrics = $sampler->fetchMetrics();
        MetricsSample::create($metrics);
        return $metrics;
    }
}
