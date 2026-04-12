import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { destroy } from '@/actions/App/Http/Controllers/UserController';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { index, create, edit } from '@/routes/users';
import type { User } from '@/types';

interface Props {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
    };
}

export default function Index({ users, filters }: Props) {
    const { currentTeam, flash } = usePage<any>().props;
    const [search, setSearch] = useState(filters.search || '');

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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(index({ current_team: currentTeam.slug }), { search });
    };

    const handleDelete = (user: User) => {
        console.log('[Users Index] handleDelete called', { user });
        Swal.fire({
            title: 'Jeste li sigurni?',
            text: `Želite obrisati korisnika ${user.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Da, obriši',
            cancelButtonText: 'Odustani',
        }).then((result) => {
            console.log('[Users Index] Delete confirmation result:', result);

            if (result.isConfirmed) {
                console.log('[Users Index] Deleting user...', { user_id: user.id, current_team: currentTeam.slug });
                router.delete(destroy({ current_team: currentTeam.slug, user: user.id }), {
                    preserveScroll: true,
                    preserveState: false,
                    onSuccess: () => {
                        console.log('[Users Index] Delete onSuccess callback triggered');
                    },
                    onError: (errors) => {
                        console.error('[Users Index] Delete onError:', errors);
                    },
                    onFinish: () => {
                        console.log('[Users Index] Delete onFinish callback triggered');
                    },
                });
            }
        });
    };

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

                <div className="space-y-6">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <Input
                            type="search"
                            placeholder="Pretraži korisnike..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1"
                        />
                        <Button type="submit">Pretraži</Button>
                    </form>

                    <div className="space-y-3">
                        {users.data.map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center justify-between rounded-lg border p-4"
                            >
                                <div>
                                    <span className="font-medium">{user.name}</span>
                                    <br />
                                    <span className="text-sm text-muted-foreground">{user.email}</span>
                                </div>
                                <div className="flex gap-2">
                                    <Link href={edit({ current_team: currentTeam.slug, user: user.id })}>
                                        <Button variant="outline" size="sm">
                                            Uredi
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(user)}
                                    >
                                        Obriši
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {users.last_page > 1 && (
                        <div className="flex justify-center gap-2">
                            {Array.from({ length: users.last_page }, (_, i) => i + 1).map((page) => (
                                <Link
                                    key={page}
                                    href={index({ current_team: currentTeam.slug })}
                                    data={{ page, search }}
                                >
                                    <Button
                                        variant={page === users.current_page ? 'default' : 'outline'}
                                        size="sm"
                                    >
                                        {page}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: '/',
        },
        {
            title: 'Korisnici',
            href: index.url(),
        },
    ],
};
