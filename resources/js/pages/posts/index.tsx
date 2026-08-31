import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { create, index } from '@/routes/posts';
import { createColumns, type PostRow } from './columns';

interface Props {
    posts: {
        data: PostRow[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    blogUrl: string;
}

export default function Index({ posts, blogUrl }: Props) {
    const { currentTeam, flash } = usePage<any>().props;
    const columns = createColumns(currentTeam, blogUrl);

    useEffect(() => {
        if (flash?.success) {
            Swal.fire({
                title: 'Uspjeh!',
                text: flash.success,
                icon: 'success',
                confirmButtonText: 'U redu',
            });
        }
    }, [flash]);

    return (
        <>
            <Head title="Blog" />

            <h1 className="sr-only">Blog</h1>

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex flex-col space-y-6">
                    <div className="flex items-center justify-between">
                        <Heading variant="small" title="Blog" description="Objave na blog.marijankopcic.from.hr" />
                        <div className="flex items-center gap-2">
                            <a href={blogUrl} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline">Otvori blog</Button>
                            </a>
                            <Link href={create({ current_team: currentTeam.slug })}>
                                <Button>Novi post</Button>
                            </Link>
                        </div>
                    </div>

                    <DataTable
                        columns={columns}
                        data={posts.data}
                        searchKey="title"
                        searchPlaceholder="Pretraži po naslovu..."
                    />
                </div>
            </div>
        </>
    );
}

Index.layout = (props: { currentTeam: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: '/',
        },
        {
            title: 'Blog',
            href: props.currentTeam ? index.url({ current_team: props.currentTeam.slug }) : '#',
        },
    ],
});
