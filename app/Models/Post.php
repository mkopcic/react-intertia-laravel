<?php

namespace App\Models;

use Database\Factories\PostFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

#[Fillable(['user_id', 'title', 'slug', 'excerpt', 'body', 'cover_path', 'meta_title', 'meta_description'])]
class Post extends Model
{
    /** @use HasFactory<PostFactory> */
    use HasFactory;

    /**
     * Get the author of the post.
     *
     * @return BelongsTo<User, $this>
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the tags attached to the post.
     *
     * @return BelongsToMany<Tag, $this>
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    /**
     * Render the markdown body to HTML whenever it is set, so the public
     * blog never has to parse markdown on a read request.
     *
     * @return Attribute<string, string>
     */
    protected function body(): Attribute
    {
        return Attribute::make(
            set: fn (string $value): array => [
                'body' => $value,
                'body_html' => Str::markdown($value),
            ],
        );
    }

    /**
     * Get the publicly accessible URL of the cover image, if any.
     */
    public function coverUrl(): ?string
    {
        return $this->cover_path ? Storage::disk('public')->url($this->cover_path) : null;
    }

    /**
     * Scope the query to posts carrying the given tag.
     *
     * @param  Builder<Post>  $query
     */
    public function scopeTagged(Builder $query, Tag $tag): void
    {
        $query->whereHas('tags', fn (Builder $tags) => $tags->whereKey($tag->getKey()));
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
