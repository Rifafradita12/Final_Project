<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class anggota extends Model
{
    protected $table = 'anggota';

    protected $fillable = [
        'nama', 'jekel', 'prodi', 'noHP'
    ];
}
