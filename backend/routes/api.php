<?php

use App\Http\Controllers\AnggotaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BukuController;
use App\Http\Controllers\PeminjamanController;
use App\Http\Controllers\SirkulasiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('/buku', BukuController::class);
Route::apiResource('/anggota', AnggotaController::class);
Route::apiResource('/peminjaman', PeminjamanController::class);
Route::apiResource('/sirkulasi', SirkulasiController::class);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);



Route::middleware(['auth:api'])->group(function() {

    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');

    Route::middleware(['role:admin'])->group(function () {

    });
});
