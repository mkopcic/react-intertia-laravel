import { createInertiaApp } from '@inertiajs/react';
import { TooltipProvider } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

/**
 * The server-side counterpart of app.tsx. @inertiajs/vite rewrites this
 * createInertiaApp call into a createServer bootstrap during `vite build --ssr`,
 * so the render function and the Node listener are not written by hand here.
 *
 * Kept deliberately identical to app.tsx apart from the browser-only bits:
 * initializeTheme() and the progress bar have no meaning on the server, and
 * any divergence in `layout` would produce a hydration mismatch.
 */
createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
            case name.startsWith('blog/'):
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
            case name.startsWith('teams/'):
                return [AppLayout, SettingsLayout];
            default:
                return AppLayout;
        }
    },
    withApp(app) {
        return <TooltipProvider delayDuration={0}>{app}</TooltipProvider>;
    },
});
