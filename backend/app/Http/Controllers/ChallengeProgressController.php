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

        $progress = ChallengeProgress::create([
            'challenge_id' => $challenge->id,
            'progress_date' => $request->progress_date,
            'status' => $request->status,
        ]);

        return response()->json($progress, 201);
    }

    public function index($id)
    {
        $progress = ChallengeProgress::where('challenge_id', $id)->get();
        return response()->json($progress);
    }
}
