<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChallengeProgressController;
use App\Http\Controllers\NotificationController;
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
Route::middleware('auth:api')->group(function(){

    // Challenge Routes
    Route::post('challenges/{id}/progress', [ChallengeProgressController::class, 'store']);
    Route::get('challenges/{id}/progress', [ChallengeProgressController::class, 'index']);

    // Notification Routes
    Route::get('notifications', [NotificationController::class, 'index']);
    Route::post('notifications', [NotificationController::class, 'store']);
    Route::put('notifications/{id}/status', [NotificationController::class, 'updateStatus']);
});
