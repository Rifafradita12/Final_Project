<?php

namespace App\Http\Controllers;

use App\Models\buku;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BukuController extends Controller
{
    public function index() {
        $buku = buku::all();

        if ($buku->isEmpty()) {
            return response()->json([
                "succes" => true,
                "message" => "Resource data not found!"
            ], 200);
        };

        return response()->json([
            "success" => true,
            "message" => "get all resources",
            "data" => $buku
        ], 200);
    }
    public function store (Request $request) {
        $validator = Validator::make ($request->all(),[
            'judulBuku' => 'required|string',
            'pengarang' => 'required|string',
            'penerbit' => 'required|string',
            'thTerbit' => 'required|digits:4'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $buku = buku::create([
            'judulBuku' => $request->judulBuku,
            'pengarang' => $request->pengarang,
            'penerbit' => $request->penerbit,
            'thTerbit' => $request->thTerbit
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Resource added succes!',
            'data' => $buku
        ], 201);
    }

    public function show (string $id) {
        $buku = buku::find($id);

        if (!$buku) {
            return response()->json([
                'success'=>false,
                'message'=>'Resource not found!'
            ], 404);
        }

        return response()->json([
            'success'=>true,
            'message'=>'Get detail resource',
            'data'=>$buku
        ], 200);
    }

    public function update (string $id, Request $request) {
        $buku = buku::find($id);

        if (!$buku) {
            return response()->json([
                'success'=>false,
                'message'=>'Resource not found!'
            ], 404);
        }

        $validator = Validator::make ($request->all(),[
            'judulBuku' => 'required|string',
            'pengarang' => 'required|string',
            'penerbit' => 'required|string',
            'thTerbit' => 'required|digits:4'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $data = [
            'judulBuku' => $request->judulBuku,
            'pengarang' => $request->pengarang,
            'penerbit' => $request->penerbit,
            'thTerbit' => $request->thTerbit
        ];

        $buku->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Resource updated succes!',
            'data' => $buku
        ], 200);
    }

    public function destroy (string $id) {
        $buku = buku::find($id);

        if (!$buku) {
            return response()->json([
                'success'=>false,
                'message'=>'Resource not found!'
            ], 404);
        }

        $buku->delete();

        return response()->json([
            'success'=>true,
            'message'=>'Delete resource successfully'
        ], 200);
    }
}
