import { Form, Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { update } from '@/actions/App/Http/Controllers/UserController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { edit, index } from '@/routes/users';
import type { User } from '@/types';

interface Props {
    user: User;
}

export default function Edit({ user }: Props) {
    const { currentTeam, flash } = usePage<any>().props;

    console.log('[Users Edit] Component rendered', { flash, currentTeam, user });

    useEffect(() => {
        console.log('[Users Edit] useEffect triggered', { flash });

        if (flash?.success) {
            console.log('[Users Edit] Showing success alert:', flash.success);
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
            <Head title={`Uredi korisnika - ${user.name}`} />

            <h1 className="sr-only">Uredi korisnika</h1>

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Uredi korisnika"
                    description="Ažurirajte podatke korisnika"
                />

                <Form
                    {...update.form({ current_team: currentTeam.slug, user: user.id })}
                    options={{
                        preserveScroll: true,
                    }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Ime i prezime</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    name="name"
                                    defaultValue={user.name}
                                    placeholder="Ime i prezime"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email adresa</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    name="email"
                                    defaultValue={user.email}
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Nova lozinka (opciono)</Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    placeholder="Ostavite prazno za istu lozinku"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Potvrda nove lozinke
                                </Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    placeholder="Potvrda lozinke"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>

                            <Button type="submit" className="w-full">
                                {processing && <Spinner />}
                                Ažuriraj korisnika
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </div>
        </>
    );
}

Edit.layout = (props: { user: User; currentTeam: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: '/',
        },
        {
            title: 'Korisnici',
            href: props.currentTeam ? index.url({ current_team: props.currentTeam.slug }) : '#',
        },
        {
            title: 'Uredi korisnika',
            href: props.currentTeam ? edit.url({ current_team: props.currentTeam.slug, user: props.user.id }) : '#',
        },
    ],
});
