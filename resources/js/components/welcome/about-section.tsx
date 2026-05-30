export default function AboutSection() {
    return (
        <section className="py-32 bg-[#000000]" id="about">
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="relative">
                    <div className="absolute -top-8 -left-8 w-32 h-32 bg-[#bdc2ff]/10 rounded-full blur-3xl"></div>
                    <h2 className="font-['Manrope'] text-5xl font-extrabold leading-tight relative text-[#dee5ff]">
                        Architectural <br />
                        <span className="text-[#00b47d]">Integrity.</span>
                    </h2>
                </div>
                <div className="space-y-8 border-l border-[#2b4680]/30 pl-12 py-4">
                    <p className="text-lg text-[#91aaeb] leading-relaxed">
                        I don't just write code; I design systems that endure. Over the last 15 years, I've learned that
                        the most expensive line of code is the one you have to rewrite because of poor planning.
                    </p>
                    <p className="text-lg text-[#91aaeb] leading-relaxed">
                        My philosophy centers on{' '}
                        <span className="text-[#dee5ff] font-semibold">MVC Purity, Security, and Scalability</span>.
                        I leverage Laravel's elegant patterns to solve complex business problems without introducing
                        unnecessary technical debt.
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-[#2b4680]/50 to-transparent"></div>
                        <span className="text-sm font-['Manrope'] font-bold text-[#06b77f]">Built to Last</span>
                    </div>
                    <div className="grid grid-cols-3 gap-6 pt-4">
                        <div className="space-y-2">
                            <div className="text-3xl font-['Manrope'] font-bold text-[#bdc2ff]">20+</div>
                            <div className="text-xs text-[#91aaeb] uppercase tracking-wider">Live Apps</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl font-['Manrope'] font-bold text-[#06b77f]">15+</div>
                            <div className="text-xs text-[#91aaeb] uppercase tracking-wider">Servers</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl font-['Manrope'] font-bold text-[#bdc2ff]">15+</div>
                            <div className="text-xs text-[#91aaeb] uppercase tracking-wider">Years</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
