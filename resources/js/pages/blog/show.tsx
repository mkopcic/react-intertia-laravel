import { Link } from '@inertiajs/react';
import { ArrowLeft, Clock } from 'lucide-react';

import BlogLayout, { type BlogSeo } from '@/layouts/blog-layout';
import { index as blogIndex, post as postRoute, tag as tagRoute } from '@/routes/blog';

interface Props {
    post: {
        title: string;
        slug: string;
        excerpt: string | null;
        bodyHtml: string;
        coverUrl: string | null;
        author: string;
        publishedAt: string | null;
        updatedAt: string | null;
        readingMinutes: number;
        tags: { name: string; slug: string }[];
    };
    related: { title: string; slug: string; excerpt: string | null; coverUrl: string | null }[];
    seo: BlogSeo;
}

function formatDate(iso: string | null): string {
    if (!iso) {
        return '';
    }

    return new Date(iso).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

export default function BlogShow({ post, related, seo }: Props) {
    return (
        <BlogLayout seo={seo} image={post.coverUrl}>
            <article className="py-16">
                <Link
                    href={blogIndex.url()}
                    className="inline-flex items-center gap-2 text-sm text-[#91aaeb] transition-colors hover:text-[#06b77f]"
                >
                    <ArrowLeft size={15} />
                    All posts
                </Link>

                <header className="mt-8 max-w-3xl space-y-6">
                    <h1 className="font-['Manrope'] text-4xl font-extrabold leading-tight tracking-tight text-[#dee5ff] md:text-5xl">
                        {post.title}
                    </h1>

                    {post.excerpt && <p className="text-xl leading-relaxed text-[#91aaeb]">{post.excerpt}</p>}

                    <div className="flex flex-wrap items-center gap-3 border-t border-[#2b4680]/20 pt-6 text-sm text-[#91aaeb]">
                        <span className="font-medium text-[#dee5ff]">{post.author}</span>
                        <span className="text-[#2b4680]">•</span>
                        <time dateTime={post.publishedAt ?? undefined}>{formatDate(post.publishedAt)}</time>
                        <span className="text-[#2b4680]">•</span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={14} />
                            {post.readingMinutes} min read
                        </span>
                    </div>
                </header>

                {post.coverUrl && (
                    <img
                        src={post.coverUrl}
                        alt={post.title}
                        className="mt-12 w-full rounded-2xl border border-[#2b4680]/20 object-cover shadow-2xl"
                    />
                )}

                <div
                    className="blog-prose mt-12 max-w-3xl"
                    dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
                />

                {post.tags.length > 0 && (
                    <div className="mt-16 flex flex-wrap gap-2 border-t border-[#2b4680]/20 pt-8">
                        {post.tags.map((tag) => (
                            <Link
                                key={tag.slug}
                                href={tagRoute.url({ tag: tag.slug })}
                                className="rounded-full border border-[#2b4680]/30 px-4 py-1.5 text-sm text-[#bdc2ff] transition-colors hover:border-[#06b77f]/50 hover:text-[#06b77f]"
                            >
                                #{tag.name}
                            </Link>
                        ))}
                    </div>
                )}
            </article>

            {related.length > 0 && (
                <section className="border-t border-[#2b4680]/20 py-16">
                    <h2 className="font-['Manrope'] text-2xl font-bold text-[#dee5ff]">Keep reading</h2>
                    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                        {related.map((item) => (
                            <Link
                                key={item.slug}
                                href={postRoute.url({ post: item.slug })}
                                className="group rounded-xl border border-[#2b4680]/20 bg-[#05183c] p-6 transition-colors hover:border-[#06b77f]/40"
                            >
                                <h3 className="font-['Manrope'] font-bold leading-snug text-[#dee5ff] transition-colors group-hover:text-[#06b77f]">
                                    {item.title}
                                </h3>
                                {item.excerpt && (
                                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#91aaeb]">
                                        {item.excerpt}
                                    </p>
                                )}
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </BlogLayout>
    );
}
