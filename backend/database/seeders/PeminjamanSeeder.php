<?php

namespace Database\Seeders;

use App\Models\peminjaman;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PeminjamanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        peminjaman::create([
            'tglPeminjaman' => '2025-08-21',
            'buku_id' => '1',
            'anggota_id' => '1'
        ]);
    }
}
