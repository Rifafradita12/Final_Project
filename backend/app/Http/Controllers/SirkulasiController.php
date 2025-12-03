<?php

namespace App\Http\Controllers;

use App\Models\Sirkulasi;
use App\Models\Buku; // <-- WAJIB! agar tidak error
use Carbon\Carbon;   // <-- WAJIB! untuk tglPinjam & tglTempo
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
                "message" => "Data sirkulasi tidak ditemukan",
                "data" => []
            ], 200);
        }

        // Mapping data untuk frontend
        $formatted = $sirkulasi->map(function ($item, $index) {
            return [
                "no"         => $index + 1,
                "id"         => $item->id,
                "tglPinjam"  => $item->tglPinjam,
                "tglKembali" => $item->tglKembali,
                "tglTempo"   => $item->tglTempo,
                "status"     => $item->status == "pin" ? "PINJAM" : "KEMBALI",

                // Detail buku
                "buku" => $item->buku ? [
                    "id"         => $item->buku->id,
                    "judulBuku"  => $item->buku->judulBuku,
                    "pengarang"  => $item->buku->pengarang,
                    "penerbit"   => $item->buku->penerbit,
                    "thTerbit"   => $item->buku->thTerbit,
                ] : "-",

                // Detail denda
                "denda" => $item->denda ? [
                    "jenis" => $item->denda->jenis,
                    "harga" => $item->denda->harga
                ] : null,
            ];
        });

        return response()->json([
            "success" => true,
            "message" => "Semua data sirkulasi",
            "data" => $formatted
        ], 200);
    }

    // ========================================================
    // PINJAM BUKU (kurangi stok, buat record sirkulasi)
    // ========================================================
    public function pinjamBuku(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'buku_id' => 'required|exists:buku,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak valid',
                'errors' => $validator->errors()
            ], 422);
        }

        $buku = Buku::find($request->buku_id);

        // Cek stok
        if ($buku->stok <= 0) {
            return response()->json([
                "success" => false,
                "message" => "Stok buku habis!"
            ], 400);
        }

        // Kurangi stok
        $buku->stok -= 1;
        $buku->save();

        // Tanggal pinjam & tempo (7 hari)
        $tglPinjam = Carbon::today();
        $tglTempo = Carbon::today()->addDays(7);

        // Buat record sirkulasi
        $sirkulasi = Sirkulasi::create([
            'tglPinjam'  => $tglPinjam,
            'tglKembali' => null,
            'status'     => 'pin',
            'tglTempo'   => $tglTempo,
            'buku_id'    => $buku->id,
            'denda_id'   => null
        ]);

        return response()->json([
            "success" => true,
            "message" => "Buku berhasil dipinjam!",
            "data" => $sirkulasi
        ], 201);
    }

    // ========================================================
    // KEMBALIKAN BUKU (tambah stok, update status)
    // ========================================================
    public function kembalikanBuku($id)
    {
        $sirkulasi = Sirkulasi::with('buku')->find($id);

        if (!$sirkulasi) {
            return response()->json([
                "success" => false,
                "message" => "Data sirkulasi tidak ditemukan"
            ], 404);
        }

        if ($sirkulasi->status == "kem") {
            return response()->json([
                "success" => false,
                "message" => "Buku sudah dikembalikan sebelumnya!"
            ], 400);
        }

        // Tambah stok buku
        $buku = Buku::find($sirkulasi->buku_id);
        $buku->stok += 1;
        $buku->save();

        // Update record sirkulasi
        $sirkulasi->update([
            'tglKembali' => Carbon::today(),
            'status'     => 'kem'
        ]);

        return response()->json([
            "success" => true,
            "message" => "Buku berhasil dikembalikan!",
            "data" => $sirkulasi
        ], 200);
    }

    // ========================================================
    // CRUD STANDAR
    // ========================================================

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tglPinjam' => 'required|date',
            'tglKembali' => 'nullable|date',
            'status' => 'required|in:pin,kem',
            'tglTempo' => 'required|date',
            'buku_id' => 'required|exists:buku,id',
            'denda_id' => 'nullable|exists:denda,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak valid',
                'errors' => $validator->errors()
            ], 422);
        }

        $sirkulasi = Sirkulasi::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Data sirkulasi berhasil ditambahkan',
            'data' => $sirkulasi
        ], 201);
    }

    public function show(string $id)
    {
        $sirkulasi = Sirkulasi::with('buku', 'denda')->find($id);

        if (!$sirkulasi) {
            return response()->json([
                'success' => false,
                'message' => 'Data sirkulasi tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Detail data sirkulasi',
            'data' => $sirkulasi
        ], 200);
    }

    public function update(string $id, Request $request)
    {
        $sirkulasi = Sirkulasi::find($id);

        if (!$sirkulasi) {
            return response()->json([
                'success' => false,
                'message' => 'Data sirkulasi tidak ditemukan'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'tglPinjam' => 'required|date',
            'tglKembali' => 'nullable|date',
            'status' => 'required|in:pin,kem',
            'tglTempo' => 'required|date',
            'buku_id' => 'required|exists:buku,id',
            'denda_id' => 'nullable|exists:denda,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak valid',
                'errors' => $validator->errors()
            ], 422);
        }

        $sirkulasi->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Data sirkulasi berhasil diupdate',
            'data' => $sirkulasi
        ], 200);
    }

    public function destroy(string $id)
    {
        $sirkulasi = Sirkulasi::find($id);

        if (!$sirkulasi) {
            return response()->json([
                'success' => false,
                'message' => 'Data sirkulasi tidak ditemukan'
            ], 404);
        }

        $sirkulasi->delete();

        return response()->json([
            'success' => true,
            'message' => 'Data sirkulasi berhasil dihapus'
        ], 200);
    }
}
