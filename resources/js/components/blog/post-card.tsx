import { Link } from '@inertiajs/react';
import { Clock } from 'lucide-react';

import { post as postRoute, tag as tagRoute } from '@/routes/blog';

export interface PostSummary {
    title: string;
    slug: string;
    excerpt: string | null;
    coverUrl: string | null;
    author: string;
    publishedAt: string | null;
    readingMinutes: number;
    tags: { name: string; slug: string }[];
}

function formatDate(iso: string | null): string {
    if (!iso) {
        return '';
    }

    return new Date(iso).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

export default function PostCard({ post }: { post: PostSummary }) {
    return (
        <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#2b4680]/20 bg-[#05183c] transition-colors hover:border-[#06b77f]/40">
            <Link href={postRoute.url({ post: post.slug })} className="block overflow-hidden bg-[#00225a]">
                {post.coverUrl ? (
                    <img
                        src={post.coverUrl}
                        alt={post.title}
                        loading="lazy"
                        className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex aspect-video w-full items-center justify-center bg-linear-to-br from-[#00225a] to-[#05183c]">
                        <span className="font-['Manrope'] text-4xl font-extrabold text-[#2b4680]">/</span>
                    </div>
                )}
            </Link>

            <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#91aaeb]">
                    <time dateTime={post.publishedAt ?? undefined}>{formatDate(post.publishedAt)}</time>
                    <span className="text-[#2b4680]">•</span>
                    <span className="flex items-center gap-1.5">
                        <Clock size={13} />
                        {post.readingMinutes} min read
                    </span>
                </div>

                <h2 className="font-['Manrope'] text-xl font-bold leading-snug text-[#dee5ff]">
                    <Link href={postRoute.url({ post: post.slug })} className="transition-colors hover:text-[#06b77f]">
                        {post.title}
                    </Link>
                </h2>

                {post.excerpt && <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-[#91aaeb]">{post.excerpt}</p>}

                {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                        {post.tags.map((tag) => (
                            <Link
                                key={tag.slug}
                                href={tagRoute.url({ tag: tag.slug })}
                                className="rounded-full border border-[#2b4680]/30 px-3 py-1 text-xs text-[#bdc2ff] transition-colors hover:border-[#06b77f]/50 hover:text-[#06b77f]"
                            >
                                {tag.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
}
