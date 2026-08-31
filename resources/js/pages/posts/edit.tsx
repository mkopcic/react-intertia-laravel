import { Head, useForm, usePage } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';
import { update } from '@/actions/App/Http/Controllers/PostController';
import Heading from '@/components/heading';
import { edit, index } from '@/routes/posts';
import PostForm, { type PostFormData } from './post-form';

interface Props {
    post: {
        id: number;
        title: string;
        slug: string;
        excerpt: string | null;
        body: string;
        coverUrl: string | null;
        metaTitle: string | null;
        metaDescription: string | null;
        tags: string[];
    };
    availableTags: string[];
    publicUrl: string;
}

export default function Edit({ post, availableTags, publicUrl }: Props) {
    const { currentTeam } = usePage<any>().props;

    const form = useForm<PostFormData & { _method: string }>({
        _method: 'put',
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt ?? '',
        body: post.body,
        cover: null,
        remove_cover: false,
        tags: post.tags,
        meta_title: post.metaTitle ?? '',
        meta_description: post.metaDescription ?? '',
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        /* A file upload cannot ride on PUT, so the update is spoofed over POST. */
        form.post(update.url({ current_team: currentTeam.slug, post: post.slug }), { forceFormData: true });
    };

    return (
        <>
            <Head title={`Uredi: ${post.title}`} />

            <h1 className="sr-only">Uredi post</h1>

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="space-y-6">
                    <div className="flex items-start justify-between gap-4">
                        <Heading variant="small" title="Uredi post" description={post.title} />
                        <a
                            href={publicUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                            <ExternalLink size={16} />
                            Otvori na blogu
                        </a>
                    </div>

                    <PostForm
                        data={form.data}
                        setData={form.setData as (key: string, value: unknown) => void}
                        errors={form.errors}
                        processing={form.processing}
                        submitLabel="Spremi promjene"
                        availableTags={availableTags}
                        currentCoverUrl={post.coverUrl}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
        </>
    );
}

Edit.layout = (props: { currentTeam: { slug: string } | null; post: { slug: string; title: string } }) => ({
    breadcrumbs: [
        { title: 'Dashboard', href: '/' },
        {
            title: 'Postovi',
            href: props.currentTeam ? index.url({ current_team: props.currentTeam.slug }) : '#',
        },
        {
            title: props.post.title,
            href: props.currentTeam
                ? edit.url({ current_team: props.currentTeam.slug, post: props.post.slug })
                : '#',
        },
    ],
});
