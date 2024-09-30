<?php

namespace App\Console\Commands;

use App\Models\ChallengeProgress;
use App\Models\Notification;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;

class SendProgressReminders extends Command
{
    protected $signature = 'send:progress-reminders';
    protected $description = 'Send reminders to users to update their progress';

    public function handle()
    {
        $users = User::all();
        foreach ($users as $user) {
            // Check if the user hasn't updated their progress for the last 3 days
            $lastProgressUpdate = ChallengeProgress::select('progress_date')->where('user_id', $user->id)
                ->orderBy('progress_date', 'desc')
                ->first();

            if (!empty($lastProgressUpdate) && Carbon::now()->diffInDays($lastProgressUpdate->progress_date) >= 3) {
                Notification::create([
                    'user_id' => $user->id,
                    'message' => 'It\'s time to update your progress on challenges!',
                ]);
            }
        }

        $this->info('Progress reminders sent successfully!');
    }
}
