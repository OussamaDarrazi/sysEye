<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model as Eloquent;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\Authenticatable as AuthenticatableTrait;

class User extends Eloquent implements Authenticatable
{
    use HasApiTokens, Notifiable, AuthenticatableTrait;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function nodes()
    {
        return $this->hasMany(Node::class);
    }
}