<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WelcomeController;
use App\Mail\DocsMail;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Spatie\Honeypot\ProtectAgainstSpam;

// Blog routes are domain-constrained and must win "/" on the blog subdomain,
// so they are registered before the portfolio routes below.
require __DIR__.'/blog.php';

Route::get('/', [WelcomeController::class, 'index'])->name('home');

Route::redirect('/register', '/login');

Route::get('/docs/{document}', [WelcomeController::class, 'document'])->name('docs.document');

Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');
Route::redirect('/sitemap', '/sitemap.xml');

// Test ruta — samo local/dev
Route::get('/email-docs', function () {
    $to = config('mail.from.address');
    Mail::to($to)->send(new DocsMail());

    return 'Docs mail poslan na ' . $to;
})->middleware('auth');

Route::post('/contact', [ContactController::class, 'store'])
    ->middleware(ProtectAgainstSpam::class)
    ->name('contact.store');

Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->scopeBindings()
    ->group(function () {
        Route::inertia('dashboard', 'dashboard')->name('dashboard');
        Route::resource('users', UserController::class);
        Route::resource('posts', PostController::class)->except('show');
    });

Route::middleware(['auth'])->group(function () {
    Route::get('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
});

require __DIR__.'/settings.php';
