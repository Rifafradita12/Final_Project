<?php

namespace App\Http\Controllers;

use App\Models\anggota;
use Illuminate\Http\Request;

class AnggotaController extends Controller
{
     public function index() {
        $anggota = anggota::all();

        if ($anggota->isEmpty()) {
            return response()->json([
                "succes" => true,
                "message" => "Resource data not found!"
            ], 200);
        };

        return response()->json([
            "success" => true,
            "message" => "get all resources",
            "data" => $anggota
        ], 200);
    }
}
