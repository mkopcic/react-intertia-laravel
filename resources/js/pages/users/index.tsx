import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { create, index } from '@/routes/users';
import type { User } from '@/types';
import { createColumns } from './columns';

interface Props {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function Index({ users }: Props) {
    const { currentTeam, flash } = usePage<any>().props;
    const columns = createColumns(currentTeam);

    console.log('[Users Index] Component rendered', { flash, currentTeam });

    useEffect(() => {
        console.log('[Users Index] useEffect triggered', { flash });

        if (flash?.success) {
            console.log('[Users Index] Showing success alert:', flash.success);
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
            <Head title="Korisnici" />

            <h1 className="sr-only">Korisnici</h1>

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex flex-col space-y-6">
                    <div className="flex items-center justify-between">
                        <Heading
                            variant="small"
                            title="Korisnici"
                            description="Upravljanje korisnicima sustava"
                        />
                        <Link href={create({ current_team: currentTeam.slug })}>
                            <Button>Dodaj korisnika</Button>
                        </Link>
                    </div>

                    <DataTable columns={columns} data={users.data} searchKey="name" searchPlaceholder="Pretraži po imenu..." />
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
            title: 'Korisnici',
            href: props.currentTeam ? index.url({ current_team: props.currentTeam.slug }) : '#',
        },
    ],
});
