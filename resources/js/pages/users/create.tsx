import { Form, Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { store } from '@/actions/App/Http/Controllers/UserController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { create, index } from '@/routes/users';

export default function Create() {
    const { currentTeam, flash } = usePage<any>().props;

    console.log('[Users Create] Component rendered', { flash, currentTeam });

    useEffect(() => {
        console.log('[Users Create] useEffect triggered', { flash });

        if (flash?.success) {
            console.log('[Users Create] Showing success alert:', flash.success);
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
            <Head title="Novi korisnik" />

            <h1 className="sr-only">Novi korisnik</h1>

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Dodaj novog korisnika"
                    description="Unesite podatke za novog korisnika"
                />

                <Form
                    {...store.form({ current_team: currentTeam.slug })}
                    resetOnSuccess={['password', 'password_confirmation']}
                    disableWhileProcessing
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
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Lozinka</Label>
                                <PasswordInput
                                    id="password"
                                    required
                                    name="password"
                                    placeholder="Lozinka"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Potvrda lozinke
                                </Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    required
                                    name="password_confirmation"
                                    placeholder="Potvrda lozinke"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>

                            <Button type="submit" className="w-full">
                                {processing && <Spinner />}
                                Kreiraj korisnika
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </div>
        </>
    );
}

Create.layout = (props: { currentTeam: { slug: string } | null }) => ({
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
            title: 'Novi korisnik',
            href: props.currentTeam ? create.url({ current_team: props.currentTeam.slug }) : '#',
        },
    ],
});
