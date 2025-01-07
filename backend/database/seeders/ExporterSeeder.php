<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Exporter;

class ExporterSeeder extends Seeder
{
    public function run()
    {
        $exporters = [
            ['name' => 'Glances'],
            ['name' => 'Node Exporter'],
            ['name' => 'Telegraf'],
        ];

        foreach ($exporters as $exporterData) {
            Exporter::create($exporterData);
        }
    }
}

