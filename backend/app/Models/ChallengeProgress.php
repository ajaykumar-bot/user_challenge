<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChallengeProgress extends Model
{
    use HasFactory;

    protected $fillable = [
        'challenge_id',
        'user_id',
        'progress_date',
        'status',
    ];

    public function challenge()
    {
        return $this->belongsTo(Challenge::class);
    }
}
