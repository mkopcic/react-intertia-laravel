import { Head, Link, usePage } from '@inertiajs/react';
import { Briefcase, Code2, User, Mail, LogIn, UserPlus, LayoutDashboard, Menu, X, CheckCircle, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

import AboutSection from '@/components/welcome/about-section';
import ContactSection from '@/components/welcome/contact-section';
import FeaturedProjects from '@/components/welcome/featured-projects';
import HeroSection from '@/components/welcome/hero-section';
import OpenSourceSection from '@/components/welcome/open-source-section';
import TechStackBento from '@/components/welcome/tech-stack-bento';
import { dashboard, login /*, register */ } from '@/routes';

interface HoneypotData {
    enabled: boolean;
    nameFieldName: string;
    validFromFieldName: string;
    encryptedValidFrom: string;
}

interface SeoData {
    title: string;
    description: string;
    url: string;
}

export default function Welcome({
    canRegister = true,
    honeypot,
    seo,
}: {
    canRegister?: boolean;
    honeypot: HoneypotData;
    seo: SeoData;
}) {
    const { auth, currentTeam } = usePage().props;
    const { flash } = usePage<{ flash: { success?: string; error?: string } }>().props;
    const dashboardUrl = currentTeam ? dashboard(currentTeam.slug) : '/';
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showFlash, setShowFlash] = useState(false);

    useEffect(() => {
        if (flash?.success || flash?.error) {
            setShowFlash(true);
            const timer = setTimeout(() => setShowFlash(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    return (
        <>
            {showFlash && flash?.success && (
                <div className="fixed top-4 left-1/2 z-[9999] -translate-x-1/2 flex items-center gap-3 rounded-xl border border-[#06b77f]/40 bg-[#05183c] px-6 py-4 text-[#06b77f] shadow-2xl shadow-black/40 animate-in fade-in slide-in-from-top-2 duration-300">
                    <CheckCircle size={20} />
                    <span className="font-medium">{flash.success}</span>
                    <button onClick={() => setShowFlash(false)} className="ml-2 text-[#06b77f]/60 hover:text-[#06b77f]"><X size={16} /></button>
                </div>
            )}
            {showFlash && flash?.error && (
                <div className="fixed top-4 left-1/2 z-[9999] -translate-x-1/2 flex items-center gap-3 rounded-xl border border-red-500/40 bg-[#05183c] px-6 py-4 text-red-400 shadow-2xl shadow-black/40 animate-in fade-in slide-in-from-top-2 duration-300">
                    <XCircle size={20} />
                    <span className="font-medium">{flash.error}</span>
                    <button onClick={() => setShowFlash(false)} className="ml-2 text-red-400/60 hover:text-red-400"><X size={16} /></button>
                </div>
            )}
            <Head title={seo.title}>
                <meta name="description" content={seo.description} />
                <meta property="og:title" content={seo.title} />
                <meta property="og:description" content={seo.description} />
                <meta property="og:url" content={seo.url} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={seo.title} />
                <meta name="twitter:description" content={seo.description} />
                <link rel="canonical" href={seo.url} />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <div className="bg-[#060e20] min-h-screen">
                {/* Fixed Navigation with Glassmorphism */}
                <header className="fixed top-0 w-full z-50 bg-[#060e20]/70 backdrop-blur-xl shadow-[0_40px_40px_rgba(222,229,255,0.04)]">
                    <nav className="flex justify-between items-center max-w-7xl mx-auto px-8 py-4 font-['Manrope'] tracking-tight text-sm font-medium">
                        <a href="/" className="text-xl font-bold tracking-tighter text-[#dee5ff] hover:text-[#06b77f] transition-colors">
                            The Architect
                        </a>
                        
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden text-[#dee5ff] hover:text-[#06b77f] transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <div className="hidden md:flex items-center gap-8">
                            <a className="text-[#bdc2ff] font-semibold border-b border-[#bdc2ff]/30 transition-colors duration-300 flex items-center gap-1.5" href="#work">
                                <Briefcase size={16} />
                                Work
                            </a>
                            <a className="text-[#91aaeb] hover:text-[#bdc2ff] transition-colors duration-300 flex items-center gap-1.5" href="#experience">
                                <Code2 size={16} />
                                Experience
                            </a>
                            <a className="text-[#91aaeb] hover:text-[#bdc2ff] transition-colors duration-300 flex items-center gap-1.5" href="#about">
                                <User size={16} />
                                About
                            </a>
                            <a className="text-[#91aaeb] hover:text-[#bdc2ff] transition-colors duration-300 flex items-center gap-1.5" href="#contact">
                                <Mail size={16} />
                                Contact
                            </a>
                        </div>
                        <div className="hidden md:flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={dashboardUrl}
                                    className="bg-[#06b77f] text-[#001a12] px-5 py-1.5 rounded-md font-medium text-sm hover:bg-[#05a36f] hover:scale-105 duration-200 ease-in-out transition-all flex items-center gap-1.5"
                                >
                                    <LayoutDashboard size={16} />
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="bg-[#06b77f] text-[#001a12] px-5 py-1.5 rounded-md font-medium text-sm hover:bg-[#05a36f] hover:scale-105 duration-200 ease-in-out transition-all flex items-center gap-1.5"
                                    >
                                        <LogIn size={16} />
                                        Log in
                                    </Link>
                                    {/* canRegister && (
                                        <Link
                                            href={register()}
                                            className="bg-[#06b77f] text-[#001a12] px-5 py-1.5 rounded-md font-medium text-sm hover:bg-[#05a36f] hover:scale-105 duration-200 ease-in-out transition-all flex items-center gap-1.5"
                                        >
                                            <UserPlus size={16} />
                                            Register
                                        </Link>
                                    ) */}
                                </>
                            )}
                        </div>
                    </nav>
                    
                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden bg-[#05183c] border-t border-[#2b4680]/20">
                            <div className="max-w-7xl mx-auto px-8 py-6 space-y-4">
                                <a 
                                    href="#work" 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-3 text-[#bdc2ff] font-semibold py-3 border-b border-[#2b4680]/20"
                                >
                                    <Briefcase size={20} />
                                    Work
                                </a>
                                <a 
                                    href="#experience" 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-3 text-[#91aaeb] hover:text-[#bdc2ff] py-3 border-b border-[#2b4680]/20"
                                >
                                    <Code2 size={20} />
                                    Experience
                                </a>
                                <a 
                                    href="#about" 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-3 text-[#91aaeb] hover:text-[#bdc2ff] py-3 border-b border-[#2b4680]/20"
                                >
                                    <User size={20} />
                                    About
                                </a>
                                <a 
                                    href="#contact" 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-3 text-[#91aaeb] hover:text-[#bdc2ff] py-3 border-b border-[#2b4680]/20"
                                >
                                    <Mail size={20} />
                                    Contact
                                </a>
                                
                                <div className="pt-4 space-y-2">
                                    {auth.user ? (
                                        <Link
                                            href={dashboardUrl}
                                            className="flex items-center justify-center gap-2 w-full bg-[#06b77f] text-[#001a12] px-4 py-2 rounded-lg font-medium text-sm"
                                        >
                                            <LayoutDashboard size={18} />
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={login()}
                                                className="flex items-center justify-center gap-2 w-full bg-[#06b77f] text-[#001a12] px-4 py-2 rounded-lg font-medium text-sm"
                                            >
                                                <LogIn size={18} />
                                                Log in
                                            </Link>
                                            {/* canRegister && (
                                                <Link
                                                    href={register()}
                                                    className="flex items-center justify-center gap-2 w-full bg-[#06b77f] text-[#001a12] px-4 py-2 rounded-lg font-medium text-sm"
                                                >
                                                    <UserPlus size={18} />
                                                    Register
                                                </Link>
                                            ) */}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </header>

                <main>
                    <HeroSection />
                    <TechStackBento />
                    <FeaturedProjects />
                    <OpenSourceSection />
                    <AboutSection />
                    <ContactSection honeypot={honeypot} />
                </main>
            </div>
        </>
    );
}
