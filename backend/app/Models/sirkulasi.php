<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class sirkulasi extends Model
{
    protected $table = 'sirkulasi';

    protected $fillable = [
        'tglPinjam',
        'tglKembali',
        'status',
        'tglTempo',
        'buku_id',
        'denda_id',
        'user_id',
    ];

    public function buku()
    {
        return $this->belongsTo(buku::class, 'buku_id');
    }
    public function denda()
    {
        return $this->belongsTo(denda::class, 'denda_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
