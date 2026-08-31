import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import { index as blogIndex } from '@/routes/blog';

export interface BlogSeo {
    title: string;
    description: string;
    url: string;
}

interface Props {
    seo: BlogSeo;
    /** Absolute URL of the cover/OG image, when the page has its own. */
    image?: string | null;
}

/**
 * Shell for every public blog page. Links back to the portfolio use a plain
 * anchor on purpose — it lives on a different host, and an Inertia visit
 * cannot cross origins.
 */
export default function BlogLayout({ seo, image, children }: PropsWithChildren<Props>) {
    const portfolioUrl = 'https://marijankopcic.from.hr';

    return (
        <>
            <Head title={seo.title}>
                <meta name="description" content={seo.description} />
                <meta property="og:title" content={seo.title} />
                <meta property="og:description" content={seo.description} />
                <meta property="og:url" content={seo.url} />
                <meta property="og:type" content="article" />
                {image && <meta property="og:image" content={image} />}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={seo.title} />
                <meta name="twitter:description" content={seo.description} />
                {image && <meta name="twitter:image" content={image} />}
                <link rel="canonical" href={seo.url} />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-[#060e20] font-['Inter']">
                <header className="sticky top-0 z-50 bg-[#060e20]/70 backdrop-blur-xl">
                    <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 font-['Manrope'] text-sm font-medium tracking-tight md:px-8">
                        <Link
                            href={blogIndex.url()}
                            className="text-xl font-bold tracking-tighter text-[#dee5ff] transition-colors hover:text-[#06b77f]"
                        >
                            The Architect<span className="text-[#06b77f]">/blog</span>
                        </Link>
                        <a
                            href={portfolioUrl}
                            className="flex items-center gap-2 text-[#91aaeb] transition-colors hover:text-[#bdc2ff]"
                        >
                            <ArrowLeft size={16} />
                            Portfolio
                        </a>
                    </nav>
                </header>

                <main className="mx-auto max-w-5xl px-6 md:px-8">{children}</main>

                <footer className="mt-24 border-t border-[#2b4680]/20 bg-[#000000]">
                    <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-[#91aaeb] md:flex-row md:px-8">
                        <p>© {new Date().getFullYear()} Marijan Kopčić</p>
                        <div className="flex items-center gap-6">
                            <a href={portfolioUrl} className="transition-colors hover:text-[#bdc2ff]">
                                Portfolio
                            </a>
                            <a
                                href="https://github.com/mkopcic"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors hover:text-[#bdc2ff]"
                            >
                                GitHub
                            </a>
                            <a
                                href="https://www.linkedin.com/in/marijan-kopcic/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors hover:text-[#bdc2ff]"
                            >
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
