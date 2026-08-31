import { Link } from '@inertiajs/react';

import PostCard, { type PostSummary } from '@/components/blog/post-card';

export interface Paginated<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    total: number;
}

interface Props {
    posts: Paginated<PostSummary>;
    emptyMessage?: string;
}

export default function PostGrid({ posts, emptyMessage = 'No posts published yet.' }: Props) {
    if (posts.data.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-[#2b4680]/40 py-20 text-center text-[#91aaeb]">
                {emptyMessage}
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {posts.data.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>

            {posts.links.length > 3 && (
                <nav className="mt-16 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
                    {posts.links.map((link, index) =>
                        link.url ? (
                            <Link
                                key={index}
                                href={link.url}
                                className={`rounded-lg px-4 py-2 text-sm transition-colors ${
                                    link.active
                                        ? 'bg-[#06b77f] font-semibold text-[#001a12]'
                                        : 'border border-[#2b4680]/30 text-[#91aaeb] hover:border-[#06b77f]/50 hover:text-[#06b77f]'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ) : (
                            <span
                                key={index}
                                className="px-4 py-2 text-sm text-[#2b4680]"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ),
                    )}
                </nav>
            )}
        </>
    );
}
