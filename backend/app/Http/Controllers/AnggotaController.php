<?php

namespace App\Http\Controllers;

use App\Models\anggota;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
    public function store (Request $request) {
        $validator = Validator::make ($request->all(),[
            'nama' => 'required|string',
            'jekel' => 'required|in:lakiLaki,perempuan',
            'prodi' => 'required|string',
            'noHP' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $anggota = anggota::create([
            'nama' => $request->nama,
            'jekel' => $request->jekel,
            'prodi' => $request->prodi,
            'noHP' => $request->noHP
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Resource added succes!',
            'data' => $anggota
        ], 201);
    }

    public function show (string $id) {
        $anggota = anggota::find($id);

        if (!$anggota) {
            return response()->json([
                'success'=>false,
                'message'=>'Resource not found!'
            ], 404);
        }

        return response()->json([
            'success'=>true,
            'message'=>'Get detail resource',
            'data'=>$anggota
        ], 200);
    }

    public function update (string $id, Request $request) {
        $anggota = anggota::find($id);

        if (!$anggota) {
            return response()->json([
                'success'=>false,
                'message'=>'Resource not found!'
            ], 404);
        }

        $validator = Validator::make ($request->all(),[
            'nama' => 'required|string',
            'jekel' => 'required|in:lakiLaki,perempuan',
            'prodi' => 'required|string',
            'noHP' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $data = [
            'nama' => $request->nama,
            'jekel' => $request->jekel,
            'prodi' => $request->prodi,
            'noHP' => $request->noHP
        ];

        $anggota->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Resource updated succes!',
            'data' => $anggota
        ], 200);
    }

    public function destroy (string $id) {
        $anggota = anggota::find($id);

        if (!$anggota) {
            return response()->json([
                'success'=>false,
                'message'=>'Resource not found!'
            ], 404);
        }

        $anggota->delete();

        return response()->json([
            'success'=>true,
            'message'=>'Delete resource successfully'
        ], 200);
    }
}
