<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Mail\ContactMail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Response;

class ContactController extends Controller
{
    public function __construct(private readonly WelcomeController $welcomeController) {}

    /**
     * Handle the submission directly (no redirect). A redirect here forces
     * the browser to auto-follow with a plain GET that drops the X-Inertia
     * header, which makes Inertia treat the follow-up as a non-Inertia
     * response and render it in its raw-response fallback dialog — this is
     * what caused the page to visibly render twice after submitting. The
     * client shows its own success confirmation once this request resolves.
     */
    public function store(ContactRequest $request): Response
    {
        $validated = $request->validated();

        Log::info('Contact form submission', [
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        Mail::to(config('mail.from.address'))->send(
            new ContactMail($validated['name'], $validated['email'], $validated['message'])
        );

        return $this->welcomeController->index();
    }
}
