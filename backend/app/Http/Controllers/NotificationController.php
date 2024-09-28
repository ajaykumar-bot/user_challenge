<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    // Store a new notification
    public function store(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $notification = Notification::create([
            'user_id' => auth()->id(),
            'message' => $request->message,
            'status' => 'pending',
        ]);

        return response()->json($notification, 201);
    }

    // Get all notifications for the authenticated user
    public function index()
    {
        $notifications = Notification::where('user_id', auth()->id())->get();
        return response()->json($notifications);
    }

    // Update notification status (e.g., mark as sent)
    public function updateStatus(Request $request, $id)
    {
        $notification = Notification::findOrFail($id);
        $notification->update([
            'status' => $request->status,
        ]);

        return response()->json($notification);
    }
}
