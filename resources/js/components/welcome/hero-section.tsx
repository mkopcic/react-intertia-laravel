import { Terminal, Database, Cloud, ArrowRight, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
                    <h1 className="font-['Manrope'] text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] text-[#dee5ff]">
                        Structural <br />
                        <span className="text-[#acb3ff]">Excellence.</span>
                    </h1>
                    <p className="max-w-xl text-lg md:text-xl text-[#91aaeb] leading-relaxed">
                        Lead Full-Stack Developer & DevOps Engineer specializing in high-scale{' '}
                        <span className="text-[#dee5ff] font-semibold">Laravel ecosystems</span>. 
                        8+ years of crafting resilient backend architectures and fluid React interfaces.
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
                    <div className="p-6 bg-[#06122d] rounded-xl border-l-4 border-[#06b77f] shadow-2xl">
                        <div className="flex items-center gap-4 mb-4">
                            <Terminal className="text-[#06b77f]" size={24} />
                            <span className="font-['Manrope'] font-bold text-sm tracking-widest uppercase text-[#91aaeb]">
                                Expertise Metrics
                            </span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#91aaeb]">Laravel / PHP</span>
                                <span className="font-bold text-[#dee5ff]">8+ Years</span>
                            </div>
                            <div className="w-full bg-[#05183c] rounded-full h-1">
                                <div className="bg-[#06b77f] h-1 rounded-full w-full"></div>
                            </div>
                            <div className="flex justify-between items-center text-sm pt-2">
                                <span className="text-[#91aaeb]">System Design</span>
                                <span className="font-bold text-[#dee5ff]">Mastery</span>
                            </div>
                            <div className="w-full bg-[#05183c] rounded-full h-1">
                                <div className="bg-[#bdc2ff] h-1 rounded-full w-[95%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
