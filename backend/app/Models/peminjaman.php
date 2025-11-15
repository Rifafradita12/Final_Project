<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class peminjaman extends Model
{
    protected $table = 'peminjaman';

    protected $fillable = [
        'tglPeminjaman', 'buku_id', 'anggota_id'
    ];

    public function buku() {
        return $this->belongsTo(buku::class, 'buku_id');
     }
     public function anggota() {
        return $this->belongsTo(anggota::class, 'anggota_id');
     }
}
