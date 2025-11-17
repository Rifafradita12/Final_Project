<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class sirkulasi extends Model
{
    protected $table = 'sirkulasi';

    protected $fillable = [
        'tglPinjam', 'tglKembali', 'status', 'buku_id', 'anggota_id', 'users_id'
    ];

    public function buku() {
        return $this->belongsTo(buku::class, 'buku_id');
     }
     public function anggota() {
        return $this->belongsTo(anggota::class, 'anggota_id');
     }
     public function users() {
        return $this->belongsTo(anggota::class, 'users_id');
     }
}
