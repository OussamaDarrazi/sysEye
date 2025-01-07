<?php

namespace App\Http\Controllers;

use App\Models\MetricsSample;
use App\Models\Node;
use Illuminate\Http\Request;

class MetricsSampleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Node $node)
    {
        // Return all metrics for the specified node
        return $node->metricSamples;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Node $node)
    {
        $request->validate([
            'sampleTime' => 'required|date',
            // add any other validations you need
        ]);

        $metricsSample = new MetricsSample($request->all());
        $metricsSample->node()->associate($node);
        $metricsSample->save();

        return $metricsSample;
    }

    /**
     * Display the specified resource.
     */
    public function show(Node $node, MetricsSample $metricsSample)
    {
        // Return a single metrics record (optionally verify it belongs to the node)
        return $metricsSample;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Node $node, MetricsSample $metricsSample)
    {
        $metricsSample->update($request->all());
        return $metricsSample;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Node $node, MetricsSample $metricsSample)
    {
        $metricsSample->delete();
        return response()->json(['message' => 'Metrics sample deleted']);
    }
}
