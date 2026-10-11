import { Code2, Database, Server, Shield, Network, Palette } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Competency {
    title: string;
    description: string;
    tags: string[];
    icon: LucideIcon;
    accent: string;
    isAdditional?: boolean;
}

const COMPETENCIES: Competency[] = [
    {
        title: 'Backend Architecture',
        description:
            'Laravel and PHP systems built to stay changeable: SaaS platforms, APIs and modular domains, plus careful modernization of legacy codebases without putting production at risk.',
        tags: ['Laravel', 'PHP 8.4', 'REST APIs', 'SOLID', 'DDD', 'Pest', 'Legacy modernization'],
        icon: Code2,
        accent: 'text-[#00b47d]',
    },
    {
        title: 'Data & Distributed Systems',
        description:
            'Data models and background processing that hold up under load: queues and workers, transactions, locking, idempotent jobs, caching and third-party integrations.',
        tags: ['PostgreSQL', 'MySQL', 'Redis', 'Queues', 'Webhooks', 'OAuth'],
        icon: Database,
        accent: 'text-[#bdc2ff]',
    },
    {
        title: 'Production Engineering',
        description:
            'I run what I build: Linux servers, Nginx and PHP-FPM tuning, cloud and bare-metal hosting, observability, backups and recovery.',
        tags: ['Linux', 'Nginx', 'PHP-FPM', 'Hetzner', 'Proxmox', 'Grafana', 'Prometheus'],
        icon: Server,
        accent: 'text-[#acb3ff]',
    },
    {
        title: 'DevOps & Security',
        description:
            'Repeatable delivery and hardened environments: CI/CD pipelines, containers, network isolation and OWASP-driven security practices in production.',
        tags: ['GitHub Actions', 'Docker', 'LXC / KVM', 'Forge', 'OWASP', 'Hardening', 'WireGuard'],
        icon: Shield,
        accent: 'text-[#ff6b6b]',
    },
    {
        title: 'System Architecture',
        description:
            'Platforms that connect: multi-tenancy, role-based access, external services, IoT devices and AI/MCP features wired into real products.',
        tags: ['Multi-tenancy', 'RBAC', 'Integrations', 'IoT', 'MCP', 'LLM'],
        icon: Network,
        accent: 'text-[#06b77f]',
    },
    {
        title: 'Product Interfaces',
        description:
            'When the product needs it, I deliver the front end too: React and Inertia SPAs, Livewire and Tailwind interfaces, and NativePHP mobile apps.',
        tags: ['React 19', 'TypeScript', 'Inertia', 'Livewire', 'Tailwind', 'NativePHP'],
        icon: Palette,
        accent: 'text-[#91aaeb]',
        isAdditional: true,
    },
];

export default function TechStackBento() {
    return (
        <section className="py-32 bg-[#06122d]" id="experience">
            <div className="max-w-7xl mx-auto px-8">
                <h2 className="font-['Manrope'] text-4xl font-bold mb-6 text-[#dee5ff]">Core Competencies</h2>
                <p className="max-w-3xl text-lg text-[#91aaeb] leading-relaxed mb-16">
                    One engineer across the whole production path: application → data → runtime → infrastructure →
                    deployment → monitoring.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {COMPETENCIES.map((competency) => {
                        const Icon = competency.icon;

                        return (
                            <article
                                key={competency.title}
                                className="bg-[#05183c] p-8 rounded-2xl flex flex-col justify-between gap-8 border border-[#2b4680]/10 hover:border-[#06b77f]/30 transition-all min-h-[280px]"
                            >
                                <div className="flex items-start justify-between">
                                    <Icon className={`${competency.accent} h-10 w-10`} />
                                    {competency.isAdditional && (
                                        <span className="text-xs font-bold uppercase tracking-widest text-[#91aaeb]">
                                            Additional
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold font-['Manrope'] mb-3 text-[#dee5ff]">{competency.title}</h3>
                                    <p className="text-sm text-[#91aaeb] leading-relaxed mb-4">{competency.description}</p>
                                    <ul className="flex flex-wrap gap-2">
                                        {competency.tags.map((tag) => (
                                            <li key={tag} className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">
                                                {tag}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
