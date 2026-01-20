<?php

namespace App\Http\Controllers;

use App\Models\User;
use GuzzleHttp\Promise\Create;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|min:5',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'phoneno' => 'required|digits:10|regex:/^98[0-9]{8}$/',
            'image_url' => 'nullable|mimes:jpeg,png,jpg,gif,webp|max:20480',
            'role' => 'in:admin,user',
        ]);
        try {
            $response = DB::transaction(function () use ($request) {
                $requestedRole = $request->input('role', 'user');

                if ($requestedRole === 'admin') {
                    $authUser = Auth::user();

                    if (!$authUser || $authUser->role !== 'admin') {
                        return response()->json([
                            'status' => 0,
                            'message' => 'Unauthorized to create admin account!',
                        ], 403);
                    }
                }

                User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => $request->password,
                    'phoneno' => $request->phoneno,
                    'image_url' => $request->image_url,
                    'role' => $requestedRole,
                    'created_at' => now()
                ]);

                return response()->json([
                    'status' => 1,
                    'message' => 'Account created sucessfully'
                ], 200);
            });

            return $response;

        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);

        try {
            $credentials = $request->only('email', 'password');
            $user = User::where('email', $credentials['email'])->first();

            if (!$user) {
                return response()->json([
                    'status' => 0,
                    'message' => "No user found for '$credentials[email]'. Please register first!",
                ], 404);
            }

            if (!Auth::attempt($credentials)) {
                return response()->json([
                    'status' => 0,
                    'message' => 'Invalid credentials!'
                ], 401);
            }

            $authedUser = Auth::user();

            foreach ($authedUser->tokens as $token) {
                $token->revoke();
            }

            $accessToken = $authedUser->createToken('authToken')->accessToken;

            return response()->json([
                'message' => 'Login Successful!',
                'data' => [
                    'status' => 1,
                    'user' => Auth::user(),
                    'token_type' => 'Bearer',
                    'access_token' => $accessToken,
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Login error' . $e->getMessage());
            return response()->json([
                'status' => '0',
                'message' => 'Login failed!'
            ]);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json([
            'status' => 1,
            'message' => 'Logged out sucessfully!'
        ]);

    }
}
