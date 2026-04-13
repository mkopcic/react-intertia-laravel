<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function store(ContactRequest $request): RedirectResponse
    {
        Log::info('Contact form submission', [
            'name' => $request->validated('name'),
            'email' => $request->validated('email'),
        ]);

        // TODO: Mail::to(config('mail.from.address'))->send(new ContactMail($request->validated()));

        return redirect()->back()->with('success', 'Your message has been sent. I will respond within 24 hours.');
    }
}
