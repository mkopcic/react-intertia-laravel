import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function FeaturedProjects() {
    return (
        <section className="py-32 overflow-hidden" id="work">
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 gap-4">
                    <h2 className="font-['Manrope'] text-5xl font-bold text-[#dee5ff]">Featured Architecture</h2>
                    <p className="text-[#91aaeb] max-w-sm">
                        A selection of production-grade systems built for scalability and maintainable growth.
                    </p>
                </div>
                <div className="space-y-32">
                    {/* Project 1: WDR Cloud Platform */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-2xl bg-[#00225a] group">
                            <div className="w-full h-full aspect-video bg-gradient-to-br from-[#2f3aa3]/20 to-[#05183c] flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                                <div className="text-center space-y-4 p-8">
                                    <div className="text-6xl font-['Manrope'] font-bold text-[#acb3ff]/30">WDR</div>
                                    <div className="text-sm text-[#91aaeb]/50">Fleet Management Platform</div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-5 space-y-6">
                            <span className="text-[#06b77f] font-mono text-sm tracking-widest uppercase">
                                01 / SaaS Platform
                            </span>
                            <h3 className="font-['Manrope'] text-3xl font-bold text-[#dee5ff]">WDR Cloud Platform</h3>
                            <p className="text-[#91aaeb] leading-relaxed">
                                Full-stack SaaS for mobility and fleet management. Features comprehensive vehicle tracking, 
                                maintenance scheduling, and advanced analytics for enterprise clients. 
                                Built with Laravel, Livewire, and multi-tenant architecture.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="bg-[#05183c] px-3 py-1 text-xs border-[#2b4680]/20 text-[#dee5ff]">
                                    Laravel
                                </Badge>
                                <Badge variant="outline" className="bg-[#05183c] px-3 py-1 text-xs border-[#2b4680]/20 text-[#dee5ff]">
                                    Livewire
                                </Badge>
                                <Badge variant="outline" className="bg-[#05183c] px-3 py-1 text-xs border-[#2b4680]/20 text-[#dee5ff]">
                                    Multi-Tenant
                                </Badge>
                            </div>
                            <a 
                                href="https://willdienstrad.app" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[#bdc2ff] hover:gap-4 transition-all font-semibold"
                            >
                                View Case Study <ArrowRight size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Project 2: FitApp SAAS */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5 lg:order-1 order-2 space-y-6 lg:text-right flex flex-col lg:items-end">
                            <span className="text-[#06b77f] font-mono text-sm tracking-widest uppercase">
                                02 / Multi-Tenant SaaS
                            </span>
                            <h3 className="font-['Manrope'] text-3xl font-bold text-[#dee5ff]">FitApp SAAS</h3>
                            <p className="text-[#91aaeb] leading-relaxed max-w-md">
                                Multi-tenant fitness tracking platform with subdomain architecture. 
                                Features workout planning, nutrition tracking, and client management for fitness professionals. 
                                Complex RBAC with real-time updates.
                            </p>
                            <div className="flex flex-wrap gap-2 lg:justify-end">
                                <Badge variant="outline" className="bg-[#05183c] px-3 py-1 text-xs border-[#2b4680]/20 text-[#dee5ff]">
                                    Laravel
                                </Badge>
                                <Badge variant="outline" className="bg-[#05183c] px-3 py-1 text-xs border-[#2b4680]/20 text-[#dee5ff]">
                                    Alpine.js
                                </Badge>
                                <Badge variant="outline" className="bg-[#05183c] px-3 py-1 text-xs border-[#2b4680]/20 text-[#dee5ff]">
                                    PostgreSQL
                                </Badge>
                            </div>
                            <a 
                                href="https://fitapp.cloud" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[#bdc2ff] hover:gap-4 transition-all font-semibold"
                            >
                                View Case Study <ArrowRight size={20} />
                            </a>
                        </div>
                        <div className="lg:col-span-7 lg:order-2 order-1 rounded-2xl overflow-hidden shadow-2xl bg-[#00225a] group">
                            <div className="w-full h-full aspect-video bg-gradient-to-br from-[#00452d]/20 to-[#05183c] flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                                <div className="text-center space-y-4 p-8">
                                    <div className="text-6xl font-['Manrope'] font-bold text-[#06b77f]/30">FitApp</div>
                                    <div className="text-sm text-[#91aaeb]/50">Fitness Management SaaS</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Project 3: Housespilot */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-2xl bg-[#00225a] group">
                            <div className="w-full h-full aspect-video bg-gradient-to-br from-[#2b4680]/20 to-[#05183c] flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                                <div className="text-center space-y-4 p-8">
                                    <div className="text-5xl font-['Manrope'] font-bold text-[#bdc2ff]/30">Housespilot</div>
                                    <div className="text-sm text-[#91aaeb]/50">Property Management</div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-5 space-y-6">
                            <span className="text-[#06b77f] font-mono text-sm tracking-widest uppercase">
                                03 / Web Application
                            </span>
                            <h3 className="font-['Manrope'] text-3xl font-bold text-[#dee5ff]">Housespilot</h3>
                            <p className="text-[#91aaeb] leading-relaxed">
                                Comprehensive property management web application for landlords and property managers. 
                                Features tenant portals, maintenance requests, financial tracking, and automated rent collection. 
                                Built with modern Laravel stack.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="bg-[#05183c] px-3 py-1 text-xs border-[#2b4680]/20 text-[#dee5ff]">
                                    Laravel
                                </Badge>
                                <Badge variant="outline" className="bg-[#05183c] px-3 py-1 text-xs border-[#2b4680]/20 text-[#dee5ff]">
                                    Vue.js
                                </Badge>
                                <Badge variant="outline" className="bg-[#05183c] px-3 py-1 text-xs border-[#2b4680]/20 text-[#dee5ff]">
                                    MySQL
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
