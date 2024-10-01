<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChallengeController;
use App\Http\Controllers\ChallengeProgressController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:api')->group(function () {

    // Challenge Routes
    Route::post('challenges', [ChallengeController::class, 'store']);
    Route::get('challenges', [ChallengeController::class, 'index']);
    Route::get('challenges/{id}', [ChallengeController::class, 'edit']);
    Route::put('challenges/{id}', [ChallengeController::class, 'update']);
    Route::delete('challenges/{id}', [ChallengeController::class, 'delete']);

    Route::get('challenges-progress', [ChallengeProgressController::class, 'index']);
    Route::post('challenges/{id}/progress', [ChallengeProgressController::class, 'store']);

    // Notification Routes
    Route::get('notifications', [NotificationController::class, 'index']);

    // User Route
    Route::resource('users', UserController::class);
});
