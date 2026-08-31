<?php

use App\Mail\ContactMail;
use Illuminate\Support\Facades\Mail;
use Inertia\Testing\AssertableInertia as Assert;

test('contact form sends mail and responds with the welcome page without redirecting', function () {
    Mail::fake();

    $response = $this->post(route('contact.store'), [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'message' => 'This is a test message for the contact form.',
    ]);

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page->component('welcome'));

    Mail::assertSent(ContactMail::class);
});

test('contact form validates required fields', function () {
    $response = $this->post(route('contact.store'), []);

    $response->assertSessionHasErrors(['name', 'email', 'message']);
});
