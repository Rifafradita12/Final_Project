<?php

namespace App\Http\Controllers;

use App\Models\Sirkulasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SirkulasiController extends Controller
{
    public function index()
    {
        $sirkulasi = Sirkulasi::with('buku', 'denda')->get();

        if ($sirkulasi->isEmpty()) {
            return response()->json([
                "success" => true,
                "message" => "Resource data not found!",
                "data" => []
            ], 200);
        }

        // Tambahkan nomor urut manual
        $formatted = $sirkulasi->map(function ($item, $index) {
            return [
                "no"             => $index + 1,
                "tglPinjam"      => $item->tglPinjam,
                "tglKembali"     => $item->tglKembali,
                "tglTempo"       => $item->tglTempo,
                "status"         => strtoupper($item->status) == "PIN" ? "PINJAM" : "KEMBALI",
                "buku"           => $item->buku ? $item->buku->judul : "-",
                "denda"          => $item->denda ? $item->denda->jenis : "-",
            ];
        });

        return response()->json([
            "success" => true,
            "message" => "get all resources",
            "data" => $formatted
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tglPinjam' => 'required|date',
            'tglKembali' => 'required|date',
            'status' => 'required|in:pin,kem',
            'tglTempo' => 'required|date',
            'buku_id' => 'required|exists:buku,id',
            'denda_id' => 'required|exists:denda,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $sirkulasi = Sirkulasi::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Resource added succes!',
            'data' => $sirkulasi
        ], 201);
    }

    public function show(string $id)
    {
        $sirkulasi = Sirkulasi::with('buku', 'denda')->find($id);

        if (!$sirkulasi) {
            return response()->json([
                'success' => false,
                'message' => 'Resource not found!'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Get detail resource',
            'data' => $sirkulasi
        ], 200);
    }

    public function update(string $id, Request $request)
    {
        $sirkulasi = Sirkulasi::find($id);

        if (!$sirkulasi) {
            return response()->json([
                'success' => false,
                'message' => 'Resource not found!'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'tglPinjam' => 'required|date',
            'tglKembali' => 'required|date',
            'status' => 'required|in:pin,kem',
            'tglTempo' => 'required|date',
            'buku_id' => 'required|exists:buku,id',
            'denda_id' => 'required|exists:denda,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $sirkulasi->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Resource updated succes!',
            'data' => $sirkulasi
        ], 200);
    }

    public function destroy(string $id)
    {
        $sirkulasi = Sirkulasi::find($id);

        if (!$sirkulasi) {
            return response()->json([
                'success' => false,
                'message' => 'Resource not found!'
            ], 404);
        }

        $sirkulasi->delete();

        return response()->json([
            'success' => true,
            'message' => 'Delete resource successfully'
        ], 200);
    }
}
