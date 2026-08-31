<?php

use App\Http\Controllers\BlogController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Blog Routes
|--------------------------------------------------------------------------
|
| The blog is served from its own subdomain but shares this application's
| document root. These routes are registered before the portfolio routes so
| that "/" resolves to the blog index on the blog host.
|
| Keep the "{post:slug}" catch-all last — it will swallow any path added
| after it.
|
*/

Route::domain(config('blog.domain'))
    ->name('blog.')
    ->group(function () {
        Route::get('/', [BlogController::class, 'index'])->name('index');
        Route::get('/sitemap.xml', [BlogController::class, 'sitemap'])->name('sitemap');
        Route::get('/docs/{document}', [BlogController::class, 'document'])->name('document');
        Route::get('/tags/{tag:slug}', [BlogController::class, 'tag'])->name('tag');
        Route::get('/{post:slug}', [BlogController::class, 'show'])->name('post');
    });
