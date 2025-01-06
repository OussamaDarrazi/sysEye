<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model as Eloquent;  // Use MongoDB Eloquent model
use Laravel\Sanctum\HasApiTokens;  // Use Sanctum if you plan to use API tokens
use Illuminate\Notifications\Notifiable;

class User extends Eloquent  // Extend MongoDB Eloquent model
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
