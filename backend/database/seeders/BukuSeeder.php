<?php

namespace Database\Seeders;

use App\Models\buku;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BukuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */  
    public function run(): void
    {
        buku::create([
            'judulBuku' => 'Ayah',
            'pengarang' => 'Mail',
            'penerbit' => 'Gramedia',
            'thTerbit' =>  '2025',
            'foto' => 'ayah.jpg',
            'stok' => '20',
            'kategori_id' => '1'
        ]);
    }
}
