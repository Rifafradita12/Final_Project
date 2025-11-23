<?php

namespace Database\Seeders;

use App\Models\denda;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DendaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        denda::create([
            'jumlah' => '5000',
            'statusBayar' => 'lunas'
        ]);
    }
}
