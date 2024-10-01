<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        // Ensure only admins can access this route
        if (auth()->user()->role !== 1) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $users = User::all(); // Fetch all users
        return response()->json($users);
    }

    public function destroy($id)
    {
        // Ensure only admins can delete users
        if (auth()->user()->role !== 1) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
}
