import { Github, Star } from 'lucide-react';

const repos = [
    {
        name: 'laravel-bot-protection',
        url: 'https://github.com/mkopcic/laravel-bot-protection',
        description:
            'Bot & AI crawler protection middleware for Laravel — configurable rules, request fingerprinting, and honeypot traps.',
        tags: ['PHP', 'Security', 'Middleware'],
        stars: 1,
        accent: '#ff6b6b',
    },
    {
        name: 'ai-agent-demo',
        url: 'https://github.com/mkopcic/ai-agent-demo',
        description:
            'Laravel AI SDK agent demo — tool use, multi-step reasoning, and LLM integration in a production-style Laravel app.',
        tags: ['Laravel', 'AI SDK', 'Agents'],
        stars: 1,
        accent: '#bdc2ff',
    },
    {
        name: 'laravel-demo-mcp',
        url: 'https://github.com/mkopcic/laravel-demo-mcp',
        description:
            'MCP server built in Laravel — exposes application data and actions to LLM agents via the Model Context Protocol standard.',
        tags: ['Laravel', 'MCP', 'AI'],
        stars: 0,
        accent: '#bdc2ff',
    },
    {
        name: 'react-intertia-laravel',
        url: 'https://github.com/mkopcic/react-intertia-laravel',
        description:
            'This portfolio. Laravel 13 + React 19 + Inertia.js SPA with Fortify 2FA, Wayfinder type-safe routes, and shadcn/ui.',
        tags: ['Laravel', 'React 19', 'TypeScript'],
        stars: 1,
        accent: '#06b77f',
    },
    {
        name: 'laravel-postgresql-demo',
        url: 'https://github.com/mkopcic/laravel-postgresql-demo',
        description:
            'Laravel 12 + PostgreSQL + Tabler admin starter with the full Spatie suite, Laravel Boost MCP server, and AI SDK docs.',
        tags: ['Laravel', 'PostgreSQL', 'Starter Kit'],
        stars: 1,
        accent: '#acb3ff',
    },
    {
        name: 'rp-mellon-dev.com',
        url: 'https://github.com/mkopcic/rp-mellon-dev.com',
        description:
            'Raspberry Pi 4 (2 GB) homelab — Docker Compose, Cloudflare Tunnel, nginx + Laravel + MariaDB + Redis. Full HTTPS without port forwarding.',
        tags: ['Docker', 'DevOps', 'Homelab'],
        stars: 1,
        accent: '#06b77f',
    },
];

export default function OpenSourceSection() {
    return (
        <section className="py-32 bg-[#000000]" id="open-source">
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#05183c] border border-[#2b4680]/20 text-[#06b77f] text-xs font-bold tracking-widest uppercase mb-6">
                            <Github size={12} />
                            Open Source
                        </div>
                        <h2 className="font-['Manrope'] text-5xl font-extrabold leading-tight text-[#dee5ff]">
                            Built in the <br />
                            <span className="text-[#acb3ff]">Open.</span>
                        </h2>
                    </div>
                    <p className="text-[#91aaeb] max-w-sm leading-relaxed md:text-right">
                        Packages, demos, and infrastructure configs I've published. Real code, not toy examples.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {repos.map((repo) => (
                        <a
                            key={repo.name}
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-[#05183c] p-7 rounded-2xl border border-[#2b4680]/10 hover:border-[#2b4680]/40 transition-all duration-300 flex flex-col gap-5 hover:-translate-y-1"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <Github size={20} className="text-[#91aaeb] group-hover:text-[#dee5ff] transition-colors flex-shrink-0" />
                                    <span className="font-['Manrope'] font-bold text-[#dee5ff] text-sm group-hover:text-white transition-colors break-all">
                                        {repo.name}
                                    </span>
                                </div>
                                {repo.stars > 0 && (
                                    <div className="flex items-center gap-1 text-xs text-[#91aaeb] flex-shrink-0">
                                        <Star size={12} className="fill-[#91aaeb]" />
                                        {repo.stars}
                                    </div>
                                )}
                            </div>

                            <p className="text-sm text-[#91aaeb] leading-relaxed flex-1">
                                {repo.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {repo.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2.5 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </a>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <a
                        href="https://github.com/mkopcic"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#91aaeb] hover:text-[#dee5ff] text-sm font-medium transition-colors"
                    >
                        <Github size={16} />
                        View all repositories on GitHub
                    </a>
                </div>
            </div>
        </section>
    );
}
