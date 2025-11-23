<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'nama' => 'Admin',
            'jekel' => 'lakiLaki',
            'prodi' => 'Informatika',
            'email' => 'admin@example.com',
            'noHP' => '0812345',
            'password' => 'admin123',
            'role' => 'admin'
        ]);

        User::create([
            'nama' => 'Anggota',
            'jekel' => 'lakiLaki',
            'prodi' => 'Informatika',
            'email' => 'anggota@example.com',
            'noHP' => '0812345',
            'password' => 'anggota123',
            'role' => 'anggota'
        ]);
    }
}
