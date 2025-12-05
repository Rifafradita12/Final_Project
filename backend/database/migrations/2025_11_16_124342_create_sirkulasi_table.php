<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sirkulasi', function (Blueprint $table) {
            $table->id();
            $table->date('tglPinjam');
            $table->date('tglKembali')->nullable();
            $table->enum('status', ['pin', 'kem', 'pending_return']);
            $table->date('tglTempo');
            $table->foreignId('buku_id')->constrained('buku')->onDelete('cascade');
            $table->foreignId('denda_id')->nullable()->constrained('denda')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sirkulasi');
    }
};
