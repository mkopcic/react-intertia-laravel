<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function index($current_team, Request $request)
    {
        $search = $request->input('search');
        
        $users = User::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return inertia('users/index', [
            'users' => $users,
            'filters' => ['search' => $search],
        ]);
    }

    public function create($current_team)
    {
        return inertia('users/create');
    }

    public function store($current_team, Request $request)
    {
        Log::info('UserController::store - START', [
            'current_team' => $current_team,
            'request_data' => $request->except(['password', 'password_confirmation'])
        ]);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $validated['email_verified_at'] = now();

        $user = User::create($validated);

        Log::info('UserController::store - User created', [
            'user_id' => $user->id,
            'user_email' => $user->email
        ]);

        return redirect()->route('users.index', ['current_team' => $current_team])->with('success', 'Korisnik uspješno kreiran!');
    }

    public function edit($current_team, User $user)
    {
        return inertia('users/edit', [
            'user' => $user,
        ]);
    }

    public function update($current_team, Request $request, User $user)
    {
        Log::info('UserController::update - START', [
            'current_team' => $current_team,
            'user_id' => $user->id,
            'request_data' => $request->except(['password', 'password_confirmation'])
        ]);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        Log::info('UserController::update - User updated', [
            'user_id' => $user->id,
            'user_email' => $user->email
        ]);

        return redirect()->route('users.index', ['current_team' => $current_team])->with('success', 'Korisnik uspješno ažuriran!');
    }

    public function destroy($current_team, User $user)
    {
        Log::info('UserController::destroy - START', [
            'current_team' => $current_team,
            'user_id' => $user->id,
            'user_email' => $user->email
        ]);

        $user->delete();

        Log::info('UserController::destroy - User deleted', [
            'user_id' => $user->id
        ]);

        return redirect()->route('users.index', ['current_team' => $current_team])->with('success', 'Korisnik uspješno obrisan!');
    }
}
