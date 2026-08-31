import { Head, useForm, usePage } from '@inertiajs/react';
import { store } from '@/actions/App/Http/Controllers/PostController';
import Heading from '@/components/heading';
import { create, index } from '@/routes/posts';
import PostForm, { type PostFormData } from './post-form';

interface Props {
    availableTags: string[];
}

export default function Create({ availableTags }: Props) {
    const { currentTeam } = usePage<any>().props;

    const { data, setData, post, processing, errors } = useForm<PostFormData>({
        title: '',
        slug: '',
        excerpt: '',
        body: '',
        cover: null,
        remove_cover: false,
        tags: [],
        meta_title: '',
        meta_description: '',
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        post(store.url({ current_team: currentTeam.slug }), { forceFormData: true });
    };

    return (
        <>
            <Head title="Novi post" />

            <h1 className="sr-only">Novi post</h1>

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="space-y-6">
                    <Heading variant="small" title="Novi post" description="Napiši i objavi post na blogu" />

                    <PostForm
                        data={data}
                        setData={setData as (key: string, value: unknown) => void}
                        errors={errors}
                        processing={processing}
                        submitLabel="Objavi post"
                        availableTags={availableTags}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
        </>
    );
}

Create.layout = (props: { currentTeam: { slug: string } | null }) => ({
    breadcrumbs: [
        { title: 'Dashboard', href: '/' },
        {
            title: 'Postovi',
            href: props.currentTeam ? index.url({ current_team: props.currentTeam.slug }) : '#',
        },
        {
            title: 'Novi post',
            href: props.currentTeam ? create.url({ current_team: props.currentTeam.slug }) : '#',
        },
    ],
});
