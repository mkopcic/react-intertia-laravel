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
     * success message is flashed for this request only (no redirect follows),
     * and the welcome page shows it as a toast.
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

        $request->session()->now('success', 'Your message has been sent. I will respond within 24 hours.');

        return $this->welcomeController->index();
    }
}
