<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PredictionController extends Controller
{
    /**
     * Menampilkan Halaman Utama (Landing Page)
     */
    public function index()
    {
        return view('landing');
    }

    /**
     * Memproses Prediksi dengan Memanggil Vercel API
     */
    public function predict(Request $request)
    {
        // 1. Validasi Input dari Form Web Laravel
        $validated = $request->validate([
            'age'            => 'required|numeric|min:1|max:120',
            'sex'            => 'required|in:M,F',
            'chestPainType'  => 'required|in:TA,ATA,NAP,ASY',
            'restingBP'      => 'required|numeric|min:50|max:250',
            'cholesterol'    => 'required|numeric|min:0|max:600',
            'fastingBS'      => 'required|in:0,1',
            'restingECG'     => 'required|in:Normal,ST,LVH',
            'maxHR'          => 'required|numeric|min:60|max:220',
            'exerciseAngina' => 'required|in:Y,N',
            'oldpeak'        => 'required|numeric|min:-3|max:7',
            'stSlope'        => 'required|in:Up,Flat,Down',
        ]);

        try {
            // 2. Ambil URL Vercel dari Config/Env
            $apiUrl = config('services.vercel.url');

            // 3. Kirim Request HTTP POST ke Vercel API menggunakan Guzzle Client Laravel
            $response = Http::timeout(15)->post($apiUrl, [
                'age'            => (int) $validated['age'],
                'sex'            => $validated['sex'],
                'chestPainType'  => $validated['chestPainType'],
                'restingBP'      => (int) $validated['restingBP'],
                'cholesterol'    => (int) $validated['cholesterol'],
                'fastingBS'      => (int) $validated['fastingBS'],
                'restingECG'     => $validated['restingECG'],
                'maxHR'          => (int) $validated['maxHR'],
                'exerciseAngina' => $validated['exerciseAngina'],
                'oldpeak'        => (float) $validated['oldpeak'],
                'stSlope'        => $validated['stSlope'],
            ]);

            // 4. Jika Vercel Merespons Sukses
            if ($response->successful()) {
                return response()->json($response->json());
            }

            // Jika Respon Gagal
            return response()->json([
                'status'  => 'error',
                'message' => 'Gagal mendapatkan respon valid dari server Vercel AI.'
            ], 500);

        } catch (\Exception $e) {
            // Catat Error ke Storage/Logs/laravel.log
            Log::error('Koneksi Vercel API Error: ' . $e->getMessage());

            return response()->json([
                'status'  => 'error',
                'message' => 'Terjadi kesalahan koneksi atau timeout saat menghubungi server Vercel.'
            ], 500);
        }
    }
}