import { ArrowRight, ArrowUpRight, BookOpen } from 'lucide-react';

export interface LatestPost {
    title: string;
    excerpt: string | null;
    url: string;
    publishedAt: string | null;
}

const BLOG_URL = 'https://blog.marijankopcic.from.hr';

/**
 * Format a date the same way on the server and in the browser, so the SSR
 * markup and the hydrated markup never disagree.
 */
function formatDate(value: string | null): string {
    if (!value) {
        return '';
    }

    return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
        new Date(value),
    );
}

export default function LatestPostsSection({ posts }: { posts: LatestPost[] }) {
    if (posts.length === 0) {
        return null;
    }

    return (
        <section className="py-32 bg-[#06122d]" id="blog">
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#05183c] border border-[#2b4680]/20 text-[#06b77f] text-xs font-bold tracking-widest uppercase mb-6">
                            <BookOpen size={12} />
                            Blog
                        </div>
                        <h2 className="font-['Manrope'] text-5xl font-extrabold leading-tight text-[#dee5ff]">
                            Notes from <br />
                            <span className="text-[#acb3ff]">the build.</span>
                        </h2>
                    </div>
                    <p className="text-[#91aaeb] max-w-sm leading-relaxed md:text-right">
                        What I learn designing, shipping and running production Laravel systems.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <a
                            key={post.url}
                            href={post.url}
                            className="group flex flex-col justify-between gap-8 rounded-2xl border border-[#2b4680]/20 bg-[#05183c] p-8 transition-all hover:border-[#06b77f]/40"
                        >
                            <div className="space-y-4">
                                <time dateTime={post.publishedAt ?? undefined} className="text-xs font-medium text-[#91aaeb]">
                                    {formatDate(post.publishedAt)}
                                </time>
                                <h3 className="font-['Manrope'] text-xl font-bold leading-snug text-[#dee5ff] transition-colors group-hover:text-[#06b77f]">
                                    {post.title}
                                </h3>
                                {post.excerpt && <p className="line-clamp-3 text-sm leading-relaxed text-[#91aaeb]">{post.excerpt}</p>}
                            </div>
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-[#bdc2ff] group-hover:text-[#06b77f]">
                                Read post
                                <ArrowUpRight size={16} />
                            </span>
                        </a>
                    ))}
                </div>

                <div className="mt-12 flex justify-center">
                    <a
                        href={BLOG_URL}
                        className="flex items-center gap-2 rounded-lg border border-[#5b74b1]/30 px-6 py-2.5 font-semibold text-[#dee5ff] transition-all hover:border-[#06b77f]/40 hover:bg-[#05183c]"
                    >
                        All posts on the blog
                        <ArrowRight size={18} />
                    </a>
                </div>
            </div>
        </section>
    );
}
