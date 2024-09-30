<?php

namespace App\Http\Controllers;

use App\Models\Challenge;
use App\Models\ChallengeProgress;
use Illuminate\Http\Request;

class ChallengeProgressController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function store(Request $request, $id)
    {
        $request->validate([
            'progress_date' => 'required|date',
            'status' => 'required|in:completed,missed',
        ]);

        $challenge = Challenge::findOrFail($id);

        $progress = ChallengeProgress::updateOrCreate(
            [
                'challenge_id' => $challenge->id,
                'progress_date' => $request->progress_date
            ],
            [
                'challenge_id' => $challenge->id,
                'progress_date' => $request->progress_date,
                'status' => $request->status,
            ]
        );

        return response()->json($progress, 201);
    }

    public function index(Request $request)
    {
        $challenges = Challenge::with('progress')->get()->map(function ($challenge) {
            $challenge->total_parts = $challenge->totalParts(); // Add total_parts property
            return $challenge;
        });

        return response()->json($challenges);
    }
}
