<?php

namespace App\Http\Controllers;

use App\Models\denda;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DendaController extends Controller
{
     public function index() {
        $denda = denda::all();

        if ($denda->isEmpty()) {
            return response()->json([
                "succes" => true,
                "message" => "Resource data not found!"
            ], 200);
        };

        return response()->json([
            "success" => true,
            "message" => "get all resources",
            "data" => $denda
        ], 200);
    }
    public function store (Request $request) {
        $validator = Validator::make ($request->all(),[
            'jumlah' => 'required|string',
            'statusBayar' => 'required|in:lunas,belumBayar'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $denda = denda::create([
            'jumlah' => $request->jumlah,
            'statusBayar' => $request->statusBayar
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Resource added succes!',
            'data' => $denda
        ], 201);
    }

    public function show (string $id) {
        $denda = denda::find($id);

        if (!$denda) {
            return response()->json([
                'success'=>false,
                'message'=>'Resource not found!'
            ], 404);
        }

        return response()->json([
            'success'=>true,
            'message'=>'Get detail resource',
            'data'=>$denda
        ], 200);
    }

    public function update (string $id, Request $request) {
        $denda = denda::find($id);

        if (!$denda) {
            return response()->json([
                'success'=>false,
                'message'=>'Resource not found!'
            ], 404);
        }

        $validator = Validator::make ($request->all(),[
            'jumlah' => 'required|string',
            'statusBayar' => 'required|in:lunas,belumBayar'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $data = [
            'jumlah' => $request->jumlah,
            'statusBayar' => $request->statusBayar
        ];

        $denda->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Resource updated succes!',
            'data' => $denda
        ], 200);
    }

    public function destroy (string $id) {
        $denda = denda::find($id);

        if (!$denda) {
            return response()->json([
                'success'=>false,
                'message'=>'Resource not found!'
            ], 404);
        }

        $denda->delete();

        return response()->json([
            'success'=>true,
            'message'=>'Delete resource successfully'
        ], 200);
    }
}
