import { Code2, Cloud, Smartphone, Database, Palette, Activity, Shield, Brain, Network } from 'lucide-react';

export default function TechStackBento() {
    return (
        <section className="py-32 bg-[#06122d]" id="experience">
            <div className="max-w-7xl mx-auto px-8">
                <h2 className="font-['Manrope'] text-4xl font-bold mb-16 text-[#dee5ff]">The Technical Stack</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Modern MVC Architecture */}
                    <div className="bg-[#05183c] p-8 rounded-2xl flex flex-col justify-between group border border-[#2b4680]/5 hover:border-[#00b47d]/30 transition-all min-h-[280px]">
                        <Code2 className="text-[#00b47d] h-10 w-10" />
                        <div>
                            <div className="text-2xl font-bold font-['Manrope'] mb-3 text-[#dee5ff]">Modern MVC</div>
                            <p className="text-sm text-[#91aaeb] leading-relaxed mb-4">
                                Enterprise-grade Laravel architecture with SOLID principles and Domain-Driven Design.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">PHP 8.4</span>
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">SOLID</span>
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">TDD</span>
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">KISS</span>
                            </div>
                        </div>
                    </div>

                    {/* Hybrid Cloud */}
                    <div className="bg-[#05183c] p-8 rounded-2xl flex flex-col justify-between border border-transparent hover:border-[#acb3ff]/20 transition-all min-h-[280px]">
                        <Cloud className="text-[#acb3ff] h-10 w-10" />
                        <div>
                            <div className="text-2xl font-bold font-['Manrope'] mb-3 text-[#dee5ff]">Hybrid Cloud</div>
                            <p className="text-sm text-[#91aaeb] leading-relaxed mb-4">
                                Cost-efficient infrastructures with Docker, LXC containers, and Hetzner bare metal.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">Docker</span>
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">LXC</span>
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">KVM</span>
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">Proxmox</span>
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">Hetzner</span>
                            </div>
                        </div>
                    </div>

                    {/* Native Mobile */}
                    <div className="bg-[#05183c] p-8 rounded-2xl flex flex-col justify-between border border-transparent hover:border-[#06b77f]/20 transition-all min-h-[280px]">
                        <Smartphone className="text-[#06b77f] h-10 w-10" />
                        <div>
                            <div className="text-2xl font-bold font-['Manrope'] mb-3 text-[#dee5ff]">Native Mobile</div>
                            <p className="text-sm text-[#91aaeb] leading-relaxed mb-4">
                                High-performance iOS and Android apps with Laravel Native framework.
                            </p>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-xs font-bold text-[#dee5ff]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#06b77f]"></span> Swift / iOS
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold text-[#dee5ff]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#06b77f]"></span> Kotlin
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold text-[#dee5ff]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#06b77f]"></span> NativePHP
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Databases */}
                    <div className="bg-[#05183c] p-8 rounded-2xl flex flex-col justify-between min-h-[280px]">
                        <Database className="text-[#bdc2ff] h-10 w-10" />
                        <div>
                            <div className="text-2xl font-bold font-['Manrope'] mb-3 text-[#dee5ff]">Databases</div>
                            <p className="text-sm text-[#91aaeb] leading-relaxed mb-4">
                                Expert-level PostgreSQL optimization, MySQL scalability, and Redis caching strategies.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">PostgreSQL</span>
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">MySQL</span>
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">SQLite</span>
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">Redis</span>
                            </div>
                        </div>
                    </div>

                    {/* Modern UI */}
                    <div className="bg-[#05183c] p-8 rounded-2xl flex flex-col justify-between hover:border hover:border-[#06b77f]/20 transition-all min-h-[280px]">
                        <Palette className="text-[#06b77f] h-10 w-10" />
                        <div>
                            <div className="text-2xl font-bold font-['Manrope'] mb-3 text-[#dee5ff]">Modern UI</div>
                            <p className="text-sm text-[#91aaeb] leading-relaxed mb-4">
                                Pixel-perfect interfaces with React 19, Vue 3, and Tailwind CSS component systems.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">React 19</span>
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">Vue</span>
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">Alpine.js</span>
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">Livewire</span>
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">Tailwind</span>
                            </div>
                        </div>
                    </div>

                    {/* Security */}
                    <div className="bg-[#05183c] p-8 rounded-2xl flex flex-col justify-between border border-transparent hover:border-[#ff6b6b]/20 transition-all min-h-[280px]">
                        <Shield className="text-[#ff6b6b] h-10 w-10" />
                        <div>
                            <div className="text-2xl font-bold font-['Manrope'] mb-3 text-[#dee5ff]">Security</div>
                            <p className="text-sm text-[#91aaeb] leading-relaxed mb-4">
                                OWASP best practices, security hardening, and penetration testing protocols.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">OWASP</span>
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">Hardening</span>
                            </div>
                        </div>
                    </div>

                    {/* System Health */}
                    <div className="bg-[#05183c] p-8 rounded-2xl flex flex-col justify-between border-t-2 border-[#acb3ff] min-h-[280px]">
                        <div className="text-xs font-bold uppercase tracking-widest text-[#91aaeb] mb-2">System Health</div>
                        <div>
                            <div className="text-2xl font-bold font-['Manrope'] mb-3 text-[#dee5ff]">99.99% Uptime</div>
                            <p className="text-sm text-[#91aaeb] leading-relaxed mb-4">
                                Production-grade monitoring, alerting, and zero-downtime deployment strategies.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">Grafana</span>
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">Prometheus</span>
                            </div>
                            <div className="h-1.5 w-full bg-[#00225a] rounded-full overflow-hidden">
                                <div className="h-full bg-[#acb3ff] w-[98%]"></div>
                            </div>
                        </div>
                    </div>

                    {/* DevOps */}
                    <div className="bg-[#05183c] p-8 rounded-2xl flex flex-col justify-between hover:border hover:border-[#acb3ff]/20 transition-all min-h-[280px]">
                        <Activity className="text-[#acb3ff] h-10 w-10" />
                        <div>
                            <div className="text-2xl font-bold font-['Manrope'] mb-3 text-[#dee5ff]">DevOps</div>
                            <p className="text-sm text-[#91aaeb] leading-relaxed mb-4">
                                Automated CI/CD pipelines, infrastructure monitoring, and deployment automation.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">GitHub Actions</span>
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">Laravel Cloud</span>
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">Forge</span>
                            </div>
                        </div>
                    </div>

                    {/* AI & MCP */}
                    <div className="bg-[#05183c] p-8 rounded-2xl flex flex-col justify-between border border-transparent hover:border-[#bdc2ff]/20 transition-all min-h-[280px]">
                        <Brain className="text-[#bdc2ff] h-10 w-10" />
                        <div>
                            <div className="text-2xl font-bold font-['Manrope'] mb-3 text-[#dee5ff]">AI & MCP</div>
                            <p className="text-sm text-[#91aaeb] leading-relaxed mb-4">
                                Building intelligent agents and LLM-powered features using Model Context Protocol directly into production apps.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">MCP</span>
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">LLM</span>
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">AI Integration</span>
                            </div>
                        </div>
                    </div>

                    {/* Networking */}
                    <div className="bg-[#05183c] p-8 rounded-2xl flex flex-col justify-between border border-transparent hover:border-[#06b77f]/20 transition-all min-h-[280px]">
                        <Network className="text-[#06b77f] h-10 w-10" />
                        <div>
                            <div className="text-2xl font-bold font-['Manrope'] mb-3 text-[#dee5ff]">Networking</div>
                            <p className="text-sm text-[#91aaeb] leading-relaxed mb-4">
                                VLANs, firewalls, reverse proxies, and VPN setup across enterprise and cloud environments.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">Nginx</span>
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">WireGuard</span>
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">iptables</span>
                                <span className="px-3 py-1 bg-[#031d4b] rounded-lg text-xs font-medium text-[#dee5ff]">VPN</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
