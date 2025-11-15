<?php

namespace App\Http\Controllers;

use App\Models\sirkulasi;
use Illuminate\Http\Request;

class SirkulasiController extends Controller
{
     public function index() {
        $sirkulasi = sirkulasi::with('buku', 'anggota', 'users')->get();

        if ($sirkulasi->isEmpty()) {
            return response()->json([
                "succes" => true,
                "message" => "Resource data not found!"
            ], 200);
        };

        return response()->json([
            "success" => true,
            "message" => "get all resources",
            "data" => $sirkulasi
        ], 200);
    }
}
