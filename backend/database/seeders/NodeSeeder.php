<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Node;
use App\Models\Exporter;

class NodeSeeder extends Seeder
{
    public function run()
    {
        $exporters = Exporter::all();

        $nodes = [
            [
                'name' => 'Node A',
                'ip' => '192.168.1.1',
                'exporter_port' => 9100,
                'is_active' => true,
                'probe_interval' => 15,
                'deactivate_on_unreachable' => false,
                'notify_on_unreachable' => true,
                'retries' => 3,
                'exporter' => $exporters->random(),
            ],
            [
                'name' => 'Node B',
                'ip' => '192.168.1.2',
                'exporter_port' => 9110,
                'is_active' => true,
                'probe_interval' => 30,
                'deactivate_on_unreachable' => true,
                'notify_on_unreachable' => true,
                'retries' => 5,
                'exporter' => $exporters->random(),
            ],
            [
                'name' => 'Node C',
                'ip' => '192.168.1.3',
                'exporter_port' => 9200,
                'is_active' => false,
                'probe_interval' => 60,
                'deactivate_on_unreachable' => true,
                'notify_on_unreachable' => false,
                'retries' => 2,
                'exporter' => $exporters->random(),
            ],
        ];

        foreach ($nodes as $nodeData) {
            $exporter = $nodeData['exporter'];
            unset($nodeData['exporter']);

            $node = Node::create($nodeData);
            $node->exporter()->create($exporter->toArray());
        }
    }
}
