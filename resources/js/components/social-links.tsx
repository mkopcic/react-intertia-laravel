import { Facebook, Github, Linkedin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface SocialLink {
    name: string;
    url: string;
    icon: LucideIcon;
}

export const SOCIAL_LINKS: SocialLink[] = [
    { name: 'GitHub', url: 'https://github.com/mkopcic', icon: Github },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/marijan-kopcic/', icon: Linkedin },
    { name: 'Facebook', url: 'https://www.facebook.com/marijan.kopcic/', icon: Facebook },
];

/**
 * Icon links to the social profiles, shared by the portfolio and the blog so
 * both hosts always point at the same accounts.
 */
export default function SocialLinks({ withLabels = false, className }: { withLabels?: boolean; className?: string }) {
    return (
        <ul className={cn('flex items-center gap-2', className)}>
            {SOCIAL_LINKS.map(({ name, url, icon: Icon }) => (
                <li key={name}>
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer me"
                        aria-label={name}
                        title={name}
                        className={cn(
                            'flex items-center gap-2 rounded-lg border border-[#2b4680]/30 text-[#91aaeb] transition-colors hover:border-[#06b77f]/50 hover:text-[#06b77f]',
                            withLabels ? 'px-4 py-2 text-sm font-medium' : 'size-9 justify-center',
                        )}
                    >
                        <Icon size={withLabels ? 16 : 17} />
                        {withLabels && <span>{name}</span>}
                    </a>
                </li>
            ))}
        </ul>
    );
}
