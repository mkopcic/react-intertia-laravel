import { ArrowRight, FolderOpen, Code2, Database, Cpu, Server, Rocket, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const OWNERSHIP_CHAIN = [
    { name: 'Application', detail: 'Laravel architecture & APIs', icon: Code2 },
    { name: 'Data', detail: 'Models, queues, caching', icon: Database },
    { name: 'Runtime', detail: 'PHP-FPM, Nginx, Linux', icon: Cpu },
    { name: 'Infrastructure', detail: 'Cloud, VPS, bare metal', icon: Server },
    { name: 'Deployment', detail: 'CI/CD, zero downtime', icon: Rocket },
    { name: 'Monitoring', detail: 'Alerts, backups, recovery', icon: Activity },
];

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#2f3aa3]/10 via-transparent to-[#00452d]/5 pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
                <div className="lg:col-span-8 space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#05183c] border border-[#2b4680]/20 text-[#06b77f] text-xs font-bold tracking-widest uppercase">
                        <span className="w-2 h-2 rounded-full bg-[#06b77f] animate-pulse"></span>
                        Available for Lead Roles
                    </div>
                    <h1 className="font-['Manrope'] font-extrabold tracking-tighter text-[#dee5ff]">
                        <span className="block text-6xl md:text-8xl leading-[0.9]">Marijan Kopčić</span>
                        <span className="mt-6 block text-3xl md:text-5xl leading-tight text-[#acb3ff]">
                            Lead Laravel &amp; Backend Engineer
                        </span>
                        <span className="mt-3 block text-lg md:text-2xl font-bold tracking-tight text-[#06b77f]">
                            Production Engineering &amp; DevOps
                        </span>
                    </h1>
                    <p className="max-w-xl text-lg md:text-xl text-[#91aaeb] leading-relaxed">
                        I design, ship, and operate production{' '}
                        <span className="text-[#dee5ff] font-semibold">Laravel systems</span>, from application
                        architecture and data to deployment, security, and infrastructure. 15+ years of taking
                        ownership of new products and legacy systems alike.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-4">
                        <a href="#contact">
                            <Button className="bg-[#06b77f] text-[#001a12] px-6 py-2.5 rounded-lg font-semibold text-base shadow-lg shadow-[#06b77f]/20 hover:bg-[#05a36f] hover:scale-105 transition-all h-auto">
                                <ArrowRight className="mr-2" size={18} />
                                Start a Project
                            </Button>
                        </a>
                        <a href="#work">
                            <Button
                                variant="outline"
                                className="border border-[#5b74b1]/30 text-[#dee5ff] px-6 py-2.5 rounded-lg font-semibold text-base hover:bg-[#05183c] hover:text-[#dee5ff] hover:border-[#06b77f]/40 transition-all h-auto"
                            >
                                <FolderOpen className="mr-2" size={18} />
                                View Projects
                            </Button>
                        </a>
                    </div>
                </div>
                <div className="lg:col-span-4 hidden lg:flex flex-col justify-end pb-12">
                    <Card className="gap-5 border-[#2b4680]/30 bg-[#06122d]/80 text-[#dee5ff] shadow-2xl shadow-black/40 backdrop-blur">
                        <CardHeader>
                            <CardTitle className="font-['Manrope'] text-lg tracking-tight">End-to-end ownership</CardTitle>
                            <CardDescription className="text-[#91aaeb]">From the first line of code to the pager.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ol className="relative">
                                <span aria-hidden className="absolute left-[17px] top-5 bottom-5 w-px bg-gradient-to-b from-[#06b77f]/60 via-[#2b4680]/50 to-[#acb3ff]/60" />
                                {OWNERSHIP_CHAIN.map((layer) => {
                                    const Icon = layer.icon;

                                    return (
                                        <li key={layer.name} className="relative flex items-center gap-4 py-2">
                                            <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#2b4680]/40 bg-[#05183c] text-[#06b77f]">
                                                <Icon size={16} />
                                            </span>
                                            <div className="min-w-0">
                                                <div className="font-['Manrope'] text-sm font-bold leading-tight">{layer.name}</div>
                                                <div className="text-xs text-[#91aaeb]">{layer.detail}</div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ol>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
