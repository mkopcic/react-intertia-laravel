import { Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import Swal from 'sweetalert2';
import { destroy } from '@/actions/App/Http/Controllers/PostController';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { edit } from '@/routes/posts';

export interface PostRow {
    id: number;
    title: string;
    slug: string;
    author: string;
    tags: string[];
    created_at: string | null;
}

export const createColumns = (currentTeam: { slug: string }, blogUrl: string): ColumnDef<PostRow>[] => [
    {
        accessorKey: 'title',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Naslov
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>
                <div className="font-medium">{row.original.title}</div>
                <div className="text-xs text-muted-foreground">/{row.original.slug}</div>
            </div>
        ),
    },
    {
        accessorKey: 'tags',
        header: 'Tagovi',
        cell: ({ row }) => (
            <div className="flex flex-wrap gap-1">
                {row.original.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                    </Badge>
                ))}
            </div>
        ),
    },
    {
        accessorKey: 'author',
        header: 'Autor',
        cell: ({ row }) => <div className="text-sm">{row.original.author}</div>,
    },
    {
        accessorKey: 'created_at',
        header: 'Objavljeno',
        cell: ({ row }) => <div className="text-sm text-muted-foreground">{row.original.created_at}</div>,
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const post = row.original;

            const handleDelete = () => {
                Swal.fire({
                    title: 'Jeste li sigurni?',
                    text: `Želite obrisati post "${post.title}"?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Da, obriši',
                    cancelButtonText: 'Odustani',
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.delete(destroy({ current_team: currentTeam.slug, post: post.slug }), {
                            preserveScroll: true,
                            preserveState: false,
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
                        <DropdownMenuItem asChild>
                            <a href={`${blogUrl}/${post.slug}`} target="_blank" rel="noopener noreferrer">
                                Otvori na blogu
                            </a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={edit.url({ current_team: currentTeam.slug, post: post.slug })}>
                                Uredi post
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                            Obriši post
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
