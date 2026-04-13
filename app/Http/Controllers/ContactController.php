<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Mail\ContactMail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(ContactRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        Log::info('Contact form submission', [
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        Mail::to(config('mail.from.address'))->send(
            new ContactMail($validated['name'], $validated['email'], $validated['message'])
        );

        return redirect()->back()->with('success', 'Your message has been sent. I will respond within 24 hours.');
    }
}
