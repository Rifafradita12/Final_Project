<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use App\Models\Sirkulasi;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            "success" => true,
            "message" => "Dashboard stats loaded",
            "data" => [
                "total_user"          => User::count(),
                "total_buku"          => Buku::count(),
                "total_dipinjam"      => Sirkulasi::where('status', 'pin')->count(),
                "total_dikembalikan"  => Sirkulasi::where('status', 'kem')->count(),
            ]
        ]);
    }
}
