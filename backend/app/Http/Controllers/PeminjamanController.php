<?php

namespace App\Http\Controllers;

use App\Models\peminjaman;
use Illuminate\Http\Request;

class PeminjamanController extends Controller
{
     public function index() {
        $peminjaman = peminjaman::with('buku', 'anggota')->get();

        if ($peminjaman->isEmpty()) {
            return response()->json([
                "succes" => true,
                "message" => "Resource data not found!"
            ], 200);
        };

        return response()->json([
            "success" => true,
            "message" => "get all resources",
            "data" => $peminjaman
        ], 200);
    }
}
