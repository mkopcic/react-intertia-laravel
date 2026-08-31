<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = rtrim(fake()->unique()->sentence(6), '.');

        return [
            'user_id' => User::factory(),
            'title' => $title,
            'slug' => Str::slug($title),
            'excerpt' => fake()->sentence(20),
            'body' => collect(fake()->paragraphs(5))
                ->map(fn (string $paragraph, int $index): string => $index === 2
                    ? "## ".rtrim(fake()->sentence(4), '.')."\n\n".$paragraph
                    : $paragraph)
                ->implode("\n\n"),
            'cover_path' => null,
            'meta_title' => null,
            'meta_description' => null,
        ];
    }

    /**
     * Indicate that the post has a cover image.
     */
    public function withCover(): static
    {
        return $this->state(fn (array $attributes) => [
            'cover_path' => 'posts/covers/'.Str::random(20).'.jpg',
        ]);
    }
}
