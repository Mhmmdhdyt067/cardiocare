<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CardioController extends Controller
{
    public function index()
    {
        return view('cardio.index');
    }

    public function predict(Request $request)
    {
        $validated = $request->validate([
            'Age'            => 'required|integer|min:18|max:100',
            'Sex'            => 'required|in:M,F',
            'ChestPainType'  => 'required|in:TA,ATA,NAP,ASY',
            'RestingBP'      => 'required|integer|min:60|max:240',
            'Cholesterol'    => 'required|integer|min:0|max:600',
            'FastingBS'      => 'required|in:0,1',
            'RestingECG'     => 'required|in:Normal,ST,LVH',
            'MaxHR'          => 'required|integer|min:60|max:220',
            'ExerciseAngina' => 'required|in:Y,N',
            'Oldpeak'        => 'required|numeric|min:-3|max:10',
            'ST_Slope'       => 'required|in:Up,Flat,Down',
        ]);

        $fastApiUrl = config('services.fastapi.url', 'http://127.0.0.1:8000') . '/predict';

        try {
            $response = Http::timeout(5)->post($fastApiUrl, [
                'Age'            => (int) $validated['Age'],
                'Sex'            => $validated['Sex'],
                'ChestPainType'  => $validated['ChestPainType'],
                'RestingBP'      => (int) $validated['RestingBP'],
                'Cholesterol'    => (int) $validated['Cholesterol'],
                'FastingBS'      => (int) $validated['FastingBS'],
                'RestingECG'     => $validated['RestingECG'],
                'MaxHR'          => (int) $validated['MaxHR'],
                'ExerciseAngina' => $validated['ExerciseAngina'],
                'Oldpeak'        => (float) $validated['Oldpeak'],
                'ST_Slope'       => $validated['ST_Slope'],
            ]);

            if ($response->successful()) {
                return view('cardio.index', [
                    'result' => $response->json(),
                    'input'  => $validated,
                ]);
            }

            return back()->withErrors(['api' => 'Gagal dari model AI: ' . $response->body()])->withInput();

        } catch (\Exception $e) {
            return back()->withErrors(['api' => 'Koneksi ke FastAPI gagal. Pastikan uvicorn berjalan di port 8000.'])->withInput();
        }
    }
}