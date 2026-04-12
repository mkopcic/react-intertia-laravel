import { ColumnDef } from '@tanstack/react-table';
import { Link, router } from '@inertiajs/react';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import Swal from 'sweetalert2';
import { destroy } from '@/actions/App/Http/Controllers/UserController';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { edit } from '@/routes/users';
import type { User } from '@/types';

export const createColumns = (currentTeam: { slug: string }): ColumnDef<User>[] => [
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Ime
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
    },
    {
        accessorKey: 'email',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
    },
    {
        accessorKey: 'created_at',
        header: 'Kreirano',
        cell: ({ row }) => {
            const date = new Date(row.getValue('created_at'));
            return <div className="text-sm text-muted-foreground">{date.toLocaleDateString('hr-HR')}</div>;
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const user = row.original;

            const handleDelete = () => {
                console.log('[Users Table] handleDelete called', { user });
                Swal.fire({
                    title: 'Jeste li sigurni?',
                    text: `Želite obrisati korisnika ${user.name}?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Da, obriši',
                    cancelButtonText: 'Odustani',
                }).then((result) => {
                    console.log('[Users Table] Delete confirmation result:', result);

                    if (result.isConfirmed) {
                        console.log('[Users Table] Deleting user...', {
                            user_id: user.id,
                            current_team: currentTeam.slug,
                        });
                        router.delete(destroy({ current_team: currentTeam.slug, user: user.id }), {
                            preserveScroll: true,
                            preserveState: false,
                            onSuccess: () => {
                                console.log('[Users Table] Delete onSuccess callback triggered');
                            },
                            onError: (errors) => {
                                console.error('[Users Table] Delete onError:', errors);
                            },
                            onFinish: () => {
                                console.log('[Users Table] Delete onFinish callback triggered');
                            },
                        });
                    }
                });
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Otvori meni</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Akcije</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(user.email)}
                        >
                            Kopiraj email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={edit.url({ current_team: currentTeam.slug, user: user.id })}>
                                Uredi korisnika
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                            Obriši korisnika
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
