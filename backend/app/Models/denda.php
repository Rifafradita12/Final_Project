<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class denda extends Model
{
    protected $table = 'denda';

    protected $fillable = [
        'nama', 'statusBayar'
    ];
}
