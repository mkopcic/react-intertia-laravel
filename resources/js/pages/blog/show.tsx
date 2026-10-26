import { Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';

import SocialLinks from '@/components/social-links';
import BlogLayout from '@/layouts/blog-layout';
import type {BlogSeo} from '@/layouts/blog-layout';
import { toPath } from '@/lib/utils';
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
        <BlogLayout seo={seo}>
            <article className="py-16">
                <Link
                    href={toPath(blogIndex.url())}
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

                {/*
                    Covers are 1200×630 title cards with one huge keyword, so
                    they stay narrower than the text column; full width they
                    dwarfed the h1 and pushed the text below the fold.
                */}
                {post.coverUrl && (
                    <img
                        src={post.coverUrl}
                        alt={post.title}
                        className="mt-10 w-full max-w-xl rounded-2xl border border-[#2b4680]/20 object-cover shadow-2xl"
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
                                href={toPath(tagRoute.url({ tag: tag.slug }))}
                                className="rounded-full border border-[#2b4680]/30 px-4 py-1.5 text-sm text-[#bdc2ff] transition-colors hover:border-[#06b77f]/50 hover:text-[#06b77f]"
                            >
                                #{tag.name}
                            </Link>
                        ))}
                    </div>
                )}

                <aside className="mt-12 flex max-w-3xl flex-col gap-6 rounded-2xl border border-[#2b4680]/30 bg-[#05183c] p-8 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#06b77f]">Written by</p>
                        <a
                            href="https://marijankopcic.from.hr"
                            rel="author"
                            className="block font-['Manrope'] text-xl font-bold text-[#dee5ff] transition-colors hover:text-[#06b77f]"
                        >
                            Marijan Kopčić
                        </a>
                        <p className="text-sm leading-relaxed text-[#91aaeb]">
                            Lead Laravel &amp; Backend Engineer. I design, ship, and operate production Laravel systems.
                        </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                        <a
                            href="https://marijankopcic.from.hr"
                            className="flex items-center gap-1.5 rounded-lg bg-[#06b77f] px-4 py-2 text-sm font-medium text-[#001a12] transition-colors hover:bg-[#05a36f]"
                        >
                            View portfolio
                            <ArrowRight size={16} />
                        </a>
                        <SocialLinks />
                    </div>
                </aside>
            </article>

            {related.length > 0 && (
                <section className="border-t border-[#2b4680]/20 py-16">
                    <h2 className="font-['Manrope'] text-2xl font-bold text-[#dee5ff]">Keep reading</h2>
                    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                        {related.map((item) => (
                            <Link
                                key={item.slug}
                                href={toPath(postRoute.url({ post: item.slug }))}
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
