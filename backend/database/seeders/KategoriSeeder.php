<?php

namespace Database\Seeders;

use App\Models\kategori;
use App\Models\peminjaman;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KategoriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        kategori::create([
            'nama' => 'fiksi'
        ]);
    }
}
