<?php

namespace App\Http\Controllers;

use App\Models\Challenge;
use App\Models\Notification;
use Illuminate\Http\Request;

class ChallengeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $challenges = Challenge::where('user_id', auth()->id())->get();
        return response()->json($challenges);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'frequency' => 'required|in:daily,weekly,monthly',
        ]);

        $challenge = Challenge::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'frequency' => $request->frequency,
        ]);

        // Send notification
        Notification::create([
            'user_id' => auth()->id(),
            'message' => 'Your challenge "' . $challenge->title . '" has been created.',
            'status' => 'sent',
        ]);
    
        return response()->json($challenge, 201);
    }
}
