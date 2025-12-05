<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class buku extends Model
{
    protected $table = 'buku';

    protected $fillable = [
        'judulBuku', 'pengarang', 'penerbit', 'thTerbit', 'foto', 'stok', 'kategori_id'
    ];

    protected $appends = ['foto_url'];

    public function kategori() {
        return $this->belongsTo(kategori::class, 'kategori_id');
    }

    public function getFotoUrlAttribute()
    {
        if ($this->foto) {
            return asset('storage/buku/' . $this->foto);
        }
        return null;
    }
}
