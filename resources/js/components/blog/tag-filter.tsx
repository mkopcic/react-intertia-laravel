import { Link } from '@inertiajs/react';

import { tag as tagRoute } from '@/routes/blog';

export interface TagSummary {
    name: string;
    slug: string;
    count: number;
}

export default function TagFilter({ tags, activeSlug }: { tags: TagSummary[]; activeSlug?: string }) {
    if (tags.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
                <Link
                    key={tag.slug}
                    href={tagRoute.url({ tag: tag.slug })}
                    className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                        tag.slug === activeSlug
                            ? 'border-[#06b77f] bg-[#06b77f]/10 text-[#06b77f]'
                            : 'border-[#2b4680]/30 text-[#91aaeb] hover:border-[#06b77f]/50 hover:text-[#06b77f]'
                    }`}
                >
                    {tag.name}
                    <span className="ml-2 text-xs text-[#2b4680]">{tag.count}</span>
                </Link>
            ))}
        </div>
    );
}
