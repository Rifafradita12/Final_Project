<?php

namespace Database\Seeders;

use App\Models\sirkulasi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SirkulasiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        sirkulasi::create([
            'tglPinjam' => '2025-09-22',
            'tglKembali' => '2025-09-30',
            'status' => 'kem',
            'tglTempo' => '2025-09-29',
            'buku_id' => '1',
            'denda_id' => null,
            'user_id' => 2
        ]);

        sirkulasi::create([
            'tglPinjam' => '2025-12-03',
            'tglKembali' => null,
            'status' => 'pin',
            'tglTempo' => '2025-12-10',
            'buku_id' => '1',
            'denda_id' => null,
            'user_id' => 2
        ]);
    }
}
