<?php

namespace App\Http\Controllers;

use App\Models\peminjaman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
    public function store (Request $request) {
        $validator = Validator::make ($request->all(),[
            'tglPeminjaman' => 'required|string',
            'buku_id' => 'required|exists:buku,id',
            'anggota_id' => 'required|exists:anggota,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $peminjaman = peminjaman::create([
            'tglPeminjaman' => $request->tglPeminjaman,
            'buku_id' => $request->buku_id,
            'anggota_id' => $request->anggota_id
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Resource added succes!',
            'data' => $peminjaman
        ], 201);
    }

    public function show (string $id) {
        $peminjaman = peminjaman::with('buku', 'anggota')->find($id);

        if (!$peminjaman) {
            return response()->json([
                'success'=>false,
                'message'=>'Resource not found!'
            ], 404);
        }

        return response()->json([
            'success'=>true,
            'message'=>'Get detail resource',
            'data'=>$peminjaman
        ], 200);
    }

    public function update (string $id, Request $request) {
        $peminjaman = peminjaman::find($id);

        if (!$peminjaman) {
            return response()->json([
                'success'=>false,
                'message'=>'Resource not found!'
            ], 404);
        }

        $validator = Validator::make ($request->all(),[
            'tglPeminjaman' => 'required|string',
            'buku_id' => 'required|exists:buku,id',
            'anggota_id' => 'required|exists:anggota,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $data = [
            'tglPeminjaman' => $request->tglPeminjaman,
            'buku_id' => $request->buku_id,
            'anggota_id' => $request->anggota_id
        ];

        $peminjaman->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Resource updated succes!',
            'data' => $peminjaman
        ], 200);
    }

    public function destroy (string $id) {
        $peminjaman = peminjaman::find($id);

        if (!$peminjaman) {
            return response()->json([
                'success'=>false,
                'message'=>'Resource not found!'
            ], 404);
        }

        $peminjaman->delete();

        return response()->json([
            'success'=>true,
            'message'=>'Delete resource successfully'
        ], 200);
    }
}
