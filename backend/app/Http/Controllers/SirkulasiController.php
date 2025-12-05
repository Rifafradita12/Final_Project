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
        $sirkulasi = Sirkulasi::with('buku', 'denda', 'user')->get();

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
                "namaUser"   => $item->user ? $item->user->nama : "-",
                "tglPinjam"  => $item->tglPinjam,
                "tglKembali" => $item->tglKembali,
                "tglTempo"   => $item->tglTempo,
                "status"     => $item->status == "pin" ? "PINJAM" : ($item->status == "pending_return" ? "MENUNGGU ACC" : "KEMBALI"),

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
                    "jumlah" => $item->denda->jumlah,
                    "statusBayar" => $item->denda->statusBayar
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
            'denda_id'   => null,
            'user_id'    => 2 // For now, hardcoded to user 2 for testing
        ]);

        return response()->json([
            "success" => true,
            "message" => "Buku berhasil dipinjam!",
            "data" => $sirkulasi
        ], 201);
    }

    // ========================================================
    // KEMBALIKAN BUKU (set status pending_return, menunggu ACC admin)
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

        // Update record sirkulasi ke pending_return (menunggu ACC admin)
        $sirkulasi->update([
            'tglKembali' => Carbon::today(),
            'status'     => 'pending_return'
        ]);

        return response()->json([
            "success" => true,
            "message" => "Permintaan pengembalian buku telah dikirim. Menunggu persetujuan admin!",
            "data" => $sirkulasi
        ], 200);
    }

    // ========================================================
    // ACC PENGEMBALIAN BUKU (Admin approves return)
    // ========================================================
    public function accKembali($id)
    {
        $sirkulasi = Sirkulasi::with('buku')->find($id);

        if (!$sirkulasi) {
            return response()->json([
                "success" => false,
                "message" => "Data sirkulasi tidak ditemukan"
            ], 404);
        }

        if ($sirkulasi->status != "pending_return") {
            return response()->json([
                "success" => false,
                "message" => "Hanya pengembalian yang menunggu ACC yang bisa disetujui!"
            ], 400);
        }

        // Hitung denda jika terlambat
        $denda_id = null;
        $tglTempo = Carbon::parse($sirkulasi->tglTempo);
        $tglKembali = Carbon::parse($sirkulasi->tglKembali);
        
        if ($tglKembali->gt($tglTempo)) {
            // Hitung jumlah hari keterlambatan
            $hariTerlambat = $tglKembali->diffInDays($tglTempo);
            $dendaPerHari = 5000; // Rp 5000 per hari
            $totalDenda = $hariTerlambat * $dendaPerHari;
            
            // Buat record denda
            $denda = \App\Models\denda::create([
                'jumlah' => $totalDenda,
                'statusBayar' => 'belumBayar'
            ]);
            
            $denda_id = $denda->id;
        }

        // Tambah stok buku
        $buku = Buku::find($sirkulasi->buku_id);
        $buku->stok += 1;
        $buku->save();

        // Update status menjadi kem (selesai dikembalikan) dan set denda_id
        $sirkulasi->update([
            'status' => 'kem',
            'denda_id' => $denda_id
        ]);

        $message = $denda_id 
            ? "Pengembalian buku disetujui. Terdapat denda keterlambatan!" 
            : "Pengembalian buku telah disetujui!";

        return response()->json([
            "success" => true,
            "message" => $message,
            "data" => $sirkulasi->load('denda')
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
