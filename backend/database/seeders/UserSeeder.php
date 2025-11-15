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
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => 'admin123',
            'role' => 'admin'
        ]);

        User::create([
            'name' => 'Anggota',
            'email' => 'anggota@example.com',
            'password' => 'anggota123',
            'role' => 'anggota'
        ]);
    }
}
