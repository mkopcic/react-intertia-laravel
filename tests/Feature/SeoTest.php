<?php

use Inertia\Testing\AssertableInertia as Assert;

test('portfolio describes its primary entity with profile page structured data', function () {
    $response = $this->get('/');

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('welcome')
            ->where('schemaJson', fn (string $schemaJson): bool => str_contains($schemaJson, '"@type":"ProfilePage"')
                && str_contains($schemaJson, '"mainEntity":{"@type":"Person","name":"Marijan Kopčić"')));
});

test('portfolio sitemap does not claim a new modification date on every request', function () {
    $this->get('/sitemap.xml')
        ->assertOk()
        ->assertHeader('Content-Type', 'application/xml')
        ->assertDontSee('<lastmod>', false);
});
