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
        $user = $this->userRepository->create($data);
        return $user->createToken('auth_token')->plainTextToken;
    }

   

    public function login(array $credentials)
{
   
    if (!Auth::attempt($credentials)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

  
    $user = Auth::user();

   
    $token = $user->createToken('auth_token')->plainTextToken;

    
    return response()->json([
        'token' => $token,
        'user' => [
            'name' => $user->name,
            'email' => $user->email,
        ]
    ], 200);
}

}
