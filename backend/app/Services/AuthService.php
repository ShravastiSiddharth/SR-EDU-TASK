<?php

namespace App\Services;

use App\Repositories\UserRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthService
{
    protected $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function register(array $data)
    {
        // Create the user
        $user = $this->userRepository->create($data);
        
        // Create a personal access token for the user
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return the user details along with the token
        return [
            'token' => $token,
            'user' => [
                'name'  => $user->name,
                'email' => $user->email,
                'role'  => $user->role,  // Include role in the response
            ]
        ];
    }

    public function login(array $credentials)
    {
        // Attempt to authenticate the user
        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Get the authenticated user
        $user = Auth::user();

        // Create a personal access token for the user
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return the user details along with the token
        return response()->json([
            'token' => $token,
            'user' => [
                'name'  => $user->name,
                'email' => $user->email,
                'role'  => $user->role,  // Include role in the response
            ]
        ], 200);
    }

    public function createUser(array $data)
    {
        // Get the currently authenticated user
        $user = Auth::user();
        
        // Check if the user has the correct role (assuming '0' is the admin role)
        if ($user->role !== '0') {
            throw ValidationException::withMessages([
                'role' => ['You are not authorized to create users.'],
            ]);
        }
    
        // Add the 'created_by' field with the current user's ID
        $data['created_by'] = $user->id;
    
        // Create the new user with the 'created_by' field
        return $this->userRepository->create($data);
    }


    public function getUsersCreatedByAuthenticatedUser()
    {
        $user = Auth::user();  // Get the currently authenticated user
        return $this->userRepository->getUsersCreatedBy($user->id); // Fetch users created by this user
    }
    
}
