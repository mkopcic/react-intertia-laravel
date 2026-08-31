import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

import type { PostSummary } from '@/components/blog/post-card';
import PostGrid, { type Paginated } from '@/components/blog/post-grid';
import TagFilter, { type TagSummary } from '@/components/blog/tag-filter';
import BlogLayout, { type BlogSeo } from '@/layouts/blog-layout';
import { index as blogIndex } from '@/routes/blog';

interface Props {
    tag: { name: string; slug: string };
    posts: Paginated<PostSummary>;
    tags: TagSummary[];
    seo: BlogSeo;
}

export default function BlogTag({ tag, posts, tags, seo }: Props) {
    return (
        <BlogLayout seo={seo}>
            <section className="border-b border-[#2b4680]/20 py-20">
                <Link
                    href={blogIndex.url()}
                    className="mb-6 inline-flex items-center gap-2 text-sm text-[#91aaeb] transition-colors hover:text-[#06b77f]"
                >
                    <ArrowLeft size={15} />
                    All posts
                </Link>
                <h1 className="font-['Manrope'] text-5xl font-extrabold tracking-tight text-[#dee5ff]">
                    <span className="text-[#06b77f]">#</span>
                    {tag.name}
                </h1>
                <p className="mt-4 text-[#91aaeb]">
                    {posts.total} {posts.total === 1 ? 'post' : 'posts'} tagged {tag.name}.
                </p>
                <div className="mt-8">
                    <TagFilter tags={tags} activeSlug={tag.slug} />
                </div>
            </section>

            <section className="py-16">
                <PostGrid posts={posts} emptyMessage={`Nothing tagged ${tag.name} yet.`} />
            </section>
        </BlogLayout>
    );
}
