<?php

namespace Database\Seeders;

use App\Models\anggota;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AnggotaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        anggota::create([
            'nama' => 'Maul',
            'jekel' => 'lakiLaki',
            'prodi' => 'Informatika',
            'noHP' => '0812345'
        ]);
    }
}
