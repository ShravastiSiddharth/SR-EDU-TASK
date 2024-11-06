<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserRepositoryInterface
{
    public function create(array $data): User
    {
        $data['password'] = Hash::make($data['password']);
        return User::create($data);
    }

    public function findByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }

    public function getUsersCreatedBy(int $createdById)
    {
        // Fetch all users where created_by matches the authenticated user's ID
        return User::where('created_by', $createdById)
                   ->get(['id', 'name', 'email', 'created_by']);
    }
}
