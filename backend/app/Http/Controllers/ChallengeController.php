<?php

namespace App\Http\Controllers;

use App\Models\Challenge;
use App\Models\Notification;
use Exception;
use Illuminate\Http\Request;

class ChallengeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request)
    {
        $challenges = Challenge::where('user_id', auth()->id());

        $challenges = $challenges->orderByRaw("
                        CASE 
                            WHEN status = 'active' THEN 1
                            WHEN status = 'completed' THEN 2
                            WHEN status = 'missed' THEN 3
                            ELSE 4 
                        END
                    ");

        if ($request->filter) {
            $challenges = $challenges->where('status', $request->filter);
        }

        $challenges = $challenges->get();

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

        return response()->json($challenge, 201);
    }

    public function edit($id)
    {
        if (empty($challenge = Challenge::where('id', $id)->first()))
            throw new Exception('Challenge Not Found', 404);

        return [
            'message' => 'Challenge Found Successfully',
            'data' => $challenge
        ];
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'frequency' => 'required|in:daily,weekly,monthly',
        ]);

        $challenge = Challenge::find($id);

        if (empty($challenge)) return new Exception('No Challenge Found', 404);

        $challenge->title = $request->title;
        $challenge->description = $request->description;
        $challenge->start_date = $request->start_date;
        $challenge->end_date = $request->end_date;
        $challenge->frequency = $request->frequency;

        $challenge->save();

        return [
            'message' => 'Challenge Updated Successfully',
            'data' => $challenge
        ];
    }

    public function delete($id)
    {
        if (empty($challenge = Challenge::where('id', $id)->first()))
            throw new Exception('Challenge Not Found', 404);
        $challenge->delete();
        return [
            'message' => 'Challenge deleted Successfully',
            'data' => $challenge
        ];
    }
}
