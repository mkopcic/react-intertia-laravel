import { FileText } from 'lucide-react';

import type { PostSummary } from '@/components/blog/post-card';
import PostGrid, { type Paginated } from '@/components/blog/post-grid';
import TagFilter, { type TagSummary } from '@/components/blog/tag-filter';
import BlogLayout, { type BlogSeo } from '@/layouts/blog-layout';

interface DocumentLink {
    name: string;
    type: string;
    url: string;
}

interface Props {
    posts: Paginated<PostSummary>;
    tags: TagSummary[];
    documents: DocumentLink[];
    seo: BlogSeo;
}

export default function BlogIndex({ posts, tags, documents, seo }: Props) {
    return (
        <BlogLayout seo={seo}>
            <section className="border-b border-[#2b4680]/20 py-20">
                <h1 className="font-['Manrope'] text-5xl font-extrabold leading-tight tracking-tight text-[#dee5ff] md:text-6xl">
                    Notes from the <span className="text-[#06b77f]">build.</span>
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#91aaeb]">
                    Laravel, PHP, React, DevOps and cloud infrastructure — what I learn shipping and running
                    production systems.
                </p>
                <div className="mt-8">
                    <TagFilter tags={tags} />
                </div>
            </section>

            <section className="py-16">
                <PostGrid posts={posts} />
            </section>

            <section className="border-t border-[#2b4680]/20 py-12">
                <h2 className="font-['Manrope'] text-sm font-bold tracking-widest text-[#06b77f] uppercase">
                    Documents
                </h2>
                <ul className="mt-6 space-y-3">
                    {documents.map((document) => (
                        <li key={document.url}>
                            <a
                                href={document.url}
                                className="inline-flex items-center gap-3 text-[#dee5ff] transition-colors hover:text-[#06b77f]"
                            >
                                <FileText size={18} className="text-[#91aaeb]" />
                                <span>{document.name}</span>
                                <span className="rounded-full border border-[#2b4680]/40 px-2 py-0.5 text-xs text-[#91aaeb]">
                                    {document.type}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </section>
        </BlogLayout>
    );
}
