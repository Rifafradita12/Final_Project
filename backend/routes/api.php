<?php


use App\Http\Controllers\AuthController;
use App\Http\Controllers\BukuController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DendaController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\SirkulasiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/dashboard', [DashboardController::class, 'index']);
Route::apiResource('/buku', BukuController::class);
Route::apiResource('/denda', DendaController::class);
Route::apiResource('/kategori', KategoriController::class);
Route::apiResource('/sirkulasi', SirkulasiController::class);
// PINJAM BUKU
Route::post('/sirkulasi/pinjam', [SirkulasiController::class, 'pinjamBuku']);

// KEMBALIKAN BUKU
Route::post('/sirkulasi/kembalikan/{id}', [SirkulasiController::class, 'kembalikanBuku']);

Route::apiResource('/user', AuthController::class);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);



Route::middleware(['auth:api'])->group(function() {

    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');

    Route::middleware(['role:admin'])->group(function () {

    });
});
