<?php

declare(strict_types=1);

namespace App\Support;

use Closure;
use Illuminate\Http\Request;
use Spatie\Honeypot\SpamResponder\SpamResponder;

class InertiaSpamResponder implements SpamResponder
{
    public function respond(Request $request, Closure $next): mixed
    {
        return redirect()->back()->with('error', 'Your submission was flagged as spam. Please try again.');
    }
}
