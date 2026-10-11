import type { InertiaLinkProps } from '@inertiajs/react';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

/**
 * Strip the "//host" prefix Wayfinder puts on domain routes, leaving a path.
 *
 * During SSR Inertia resolves a protocol-relative href against
 * "http://localhost", so "//blog.example.com/post" is rendered as
 * "http://blog.example.com/post" and every crawler hits a redirect. A plain
 * path is kept relative and resolves to the current https host.
 */
export function toPath(url: string): string {
    return url.replace(/^\/\/[^/]+/, '') || '/';
}
