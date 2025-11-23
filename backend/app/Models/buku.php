<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class buku extends Model
{
    protected $table = 'buku';

    protected $fillable = [
        'judulBuku', 'pengarang', 'penerbit', 'thTerbit', 'foto', 'stok', 'kategori_id'
    ];
    public function kategori() {
        return $this->belongsTo(kategori::class, 'kategori_id');
    }
}
