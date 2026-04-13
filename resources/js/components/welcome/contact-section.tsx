import { useForm } from '@inertiajs/react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { store } from '@/actions/App/Http/Controllers/ContactController';

interface HoneypotData {
    enabled: boolean;
    nameFieldName: string;
    validFromFieldName: string;
    encryptedValidFrom: string;
}

interface Props {
    honeypot: HoneypotData;
}

export default function ContactSection({ honeypot }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm<{
        name: string;
        email: string;
        message: string;
        [key: string]: string;
    }>({
        name: '',
        email: '',
        message: '',
        [honeypot.nameFieldName]: '',
        [honeypot.validFromFieldName]: honeypot.encryptedValidFrom,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store().url, {
            onSuccess: () => reset('name', 'email', 'message'),
        });
    };

    return (
        <section className="py-32 bg-[#060e20] relative overflow-hidden" id="contact">
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#2f3aa3]/5 to-transparent pointer-events-none"></div>
            <div className="max-w-4xl mx-auto px-8 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="font-['Manrope'] text-5xl font-bold text-[#dee5ff]">Let's Build Together</h2>
                    <p className="text-[#91aaeb] text-lg max-w-2xl mx-auto">
                        Looking for a senior Laravel developer to scale your technical platform? Ready to collaborate
                        on challenging backend, AI, or infrastructure projects.
                    </p>
                </div>

                {/* Honeypot fields — hidden from humans, visible to bots */}
                <div className="bg-[#05183c] rounded-2xl p-8 md:p-12 border border-[#2b4680]/20 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Honeypot fields — hidden from humans, visible to bots */}
                        {honeypot.enabled && (
                            <div style={{ display: 'none' }} aria-hidden="true">
                                <input
                                    type="text"
                                    name={honeypot.nameFieldName}
                                    value={data[honeypot.nameFieldName]}
                                    onChange={(e) => setData(honeypot.nameFieldName, e.target.value)}
                                    tabIndex={-1}
                                    autoComplete="nope"
                                />
                                <input
                                    type="text"
                                    name={honeypot.validFromFieldName}
                                    value={data[honeypot.validFromFieldName]}
                                    onChange={(e) => setData(honeypot.validFromFieldName, e.target.value)}
                                    tabIndex={-1}
                                    autoComplete="off"
                                />
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-[#dee5ff] font-medium">
                                    Your Name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    placeholder="John Doe"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="bg-[#06122d] border-[#2b4680]/30 text-[#dee5ff] placeholder:text-[#91aaeb]/50 focus:border-[#bdc2ff] focus:ring-[#bdc2ff]/20"
                                />
                                {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-[#dee5ff] font-medium">
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    placeholder="john@example.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="bg-[#06122d] border-[#2b4680]/30 text-[#dee5ff] placeholder:text-[#91aaeb]/50 focus:border-[#bdc2ff] focus:ring-[#bdc2ff]/20"
                                />
                                {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message" className="text-[#dee5ff] font-medium">
                                Project Details
                            </Label>
                            <textarea
                                id="message"
                                required
                                rows={6}
                                placeholder="Tell me about your project, timeline, and technical challenges..."
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                className="w-full px-3 py-2 bg-[#06122d] border border-[#2b4680]/30 rounded-md text-[#dee5ff] placeholder:text-[#91aaeb]/50 focus:border-[#bdc2ff] focus:ring-2 focus:ring-[#bdc2ff]/20 focus:outline-none resize-none"
                            />
                            {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full sm:w-auto bg-[#06b77f] text-[#001a12] hover:bg-[#05a36f] hover:scale-105 px-6 py-3 rounded-lg font-semibold text-base shadow-lg shadow-[#06b77f]/20 transition-all h-auto disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                            >
                                <Send className="mr-2" size={18} />
                                {processing ? 'Sending…' : 'Send Message'}
                            </Button>
                            <div className="flex items-center gap-3 text-sm text-[#91aaeb]">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#06b77f] animate-pulse"></span>
                                    <span>Usually responds within 24 hours</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-[#91aaeb] text-sm">
                        Or reach out directly at{' '}
                        <a href="mailto:info@marijankopcic.from.hr" className="text-[#bdc2ff] hover:text-[#acb3ff] font-semibold">
                            info@marijankopcic.from.hr
                        </a>
                    </p>
                    <div className="flex items-center justify-center gap-6 mt-6">
                        <a 
                            href="https://github.com/mkopcic" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#91aaeb] hover:text-[#bdc2ff] transition-colors"
                        >
                            GitHub
                        </a>
                        <span className="text-[#2b4680]">•</span>
                        <a 
                            href="https://www.linkedin.com/in/marijan-kopcic/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#91aaeb] hover:text-[#bdc2ff] transition-colors"
                        >
                            LinkedIn
                        </a>
                        <span className="text-[#2b4680]">•</span>
                        <a 
                            href="https://www.facebook.com/marijan.kopcic/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#91aaeb] hover:text-[#bdc2ff] transition-colors"
                        >
                            Facebook
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
