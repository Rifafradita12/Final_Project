<?php

namespace App\Http\Controllers;

use App\Models\sirkulasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SirkulasiController extends Controller
{
    public function index() {
        $sirkulasi = sirkulasi::with('buku', 'denda')->get();

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
    public function store (Request $request) {
        $validator = Validator::make ($request->all(),[
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

        $sirkulasi = sirkulasi::create([
            'tglPinjam' => $request->tglPinjam,
            'tglKembali' => $request->tglKembali,
            'status' => $request->status,
            'tglTempo' => $request->tglTempo,
            'buku_id' => $request->buku_id,
            'denda_id' => $request->denda_id
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Resource added succes!',
            'data' => $sirkulasi
        ], 201);
    }

    public function show (string $id) {
        $sirkulasi = sirkulasi::with('buku', 'denda')->find($id);

        if (!$sirkulasi) {
            return response()->json([
                'success'=>false,
                'message'=>'Resource not found!'
            ], 404);
        }

        return response()->json([
            'success'=>true,
            'message'=>'Get detail resource',
            'data'=>$sirkulasi
        ], 200);
    }

    public function update (string $id, Request $request) {
        $sirkulasi = sirkulasi::find($id);

        if (!$sirkulasi) {
            return response()->json([
                'success'=>false,
                'message'=>'Resource not found!'
            ], 404);
        }

        $validator = Validator::make ($request->all(),[
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

        $data = [
            'tglPinjam' => $request->tglPinjam,
            'tglKembali' => $request->tglKembali,
            'status' => $request->status,
            'tglTempo' => $request->tglTempo,
            'buku_id' => $request->buku_id,
            'denda_id' => $request->denda_id
        ];

        $sirkulasi->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Resource updated succes!',
            'data' => $sirkulasi
        ], 200);
    }

    public function destroy (string $id) {
        $sirkulasi = sirkulasi::find($id);

        if (!$sirkulasi) {
            return response()->json([
                'success'=>false,
                'message'=>'Resource not found!'
            ], 404);
        }

        $sirkulasi->delete();

        return response()->json([
            'success'=>true,
            'message'=>'Delete resource successfully'
        ], 200);
    }
}
