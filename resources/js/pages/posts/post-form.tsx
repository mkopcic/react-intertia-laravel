import { useState } from 'react';
import { X } from 'lucide-react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

export interface PostFormData {
    title: string;
    slug: string;
    excerpt: string;
    body: string;
    cover: File | null;
    remove_cover: boolean;
    tags: string[];
    meta_title: string;
    meta_description: string;
    [key: string]: unknown;
}

interface Props {
    data: PostFormData;
    setData: (key: string, value: unknown) => void;
    errors: Partial<Record<string, string>>;
    processing: boolean;
    submitLabel: string;
    availableTags: string[];
    currentCoverUrl?: string | null;
    onSubmit: (event: React.FormEvent) => void;
}

/**
 * Shared editor for creating and updating posts. Tags are free text — the
 * controller creates any tag that does not exist yet.
 */
export default function PostForm({
    data,
    setData,
    errors,
    processing,
    submitLabel,
    availableTags,
    currentCoverUrl,
    onSubmit,
}: Props) {
    const [tagDraft, setTagDraft] = useState('');

    const addTag = (name: string) => {
        const tag = name.trim();

        if (tag !== '' && !data.tags.includes(tag)) {
            setData('tags', [...data.tags, tag]);
        }

        setTagDraft('');
    };

    const removeTag = (name: string) => {
        setData(
            'tags',
            data.tags.filter((tag) => tag !== name),
        );
    };

    const suggestions = availableTags.filter((tag) => !data.tags.includes(tag));

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid gap-2">
                <Label htmlFor="title">Naslov</Label>
                <Input
                    id="title"
                    type="text"
                    required
                    autoFocus
                    value={data.title}
                    onChange={(event) => setData('title', event.target.value)}
                    placeholder="Naslov posta"
                />
                <InputError message={errors.title} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                    id="slug"
                    type="text"
                    value={data.slug}
                    onChange={(event) => setData('slug', event.target.value)}
                    placeholder="ostavi prazno — generira se iz naslova"
                />
                <InputError message={errors.slug} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="excerpt">Sažetak</Label>
                <textarea
                    id="excerpt"
                    rows={3}
                    value={data.excerpt}
                    onChange={(event) => setData('excerpt', event.target.value)}
                    placeholder="Kratki uvod koji se prikazuje na listi postova"
                    className="w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
                />
                <InputError message={errors.excerpt} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="body">Sadržaj (Markdown)</Label>
                <textarea
                    id="body"
                    rows={18}
                    required
                    value={data.body}
                    onChange={(event) => setData('body', event.target.value)}
                    placeholder={'## Podnaslov\n\nTekst posta u Markdownu…'}
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 font-mono text-sm shadow-xs focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
                />
                <InputError message={errors.body} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="cover">Naslovna slika</Label>
                {currentCoverUrl && !data.remove_cover && (
                    <div className="flex items-center gap-4">
                        <img src={currentCoverUrl} alt="" className="h-20 w-32 rounded-md object-cover" />
                        <Button type="button" variant="outline" size="sm" onClick={() => setData('remove_cover', true)}>
                            Ukloni sliku
                        </Button>
                    </div>
                )}
                <Input
                    id="cover"
                    type="file"
                    accept="image/*"
                    onChange={(event) => setData('cover', event.target.files?.[0] ?? null)}
                />
                <InputError message={errors.cover} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="tags">Tagovi</Label>
                <div className="flex flex-wrap gap-2">
                    {data.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="gap-1">
                            {tag}
                            <button type="button" onClick={() => removeTag(tag)} aria-label={`Ukloni ${tag}`}>
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
                <Input
                    id="tags"
                    type="text"
                    value={tagDraft}
                    onChange={(event) => setTagDraft(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ',') {
                            event.preventDefault();
                            addTag(tagDraft);
                        }
                    }}
                    placeholder="Upiši tag i pritisni Enter"
                />
                {suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                        {suggestions.map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => addTag(tag)}
                                className="rounded-full border border-dashed px-2 py-0.5 text-xs text-muted-foreground hover:text-foreground"
                            >
                                + {tag}
                            </button>
                        ))}
                    </div>
                )}
                <InputError message={errors.tags} />
            </div>

            <div className="grid gap-2 md:grid-cols-2 md:gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="meta_title">SEO naslov</Label>
                    <Input
                        id="meta_title"
                        type="text"
                        value={data.meta_title}
                        onChange={(event) => setData('meta_title', event.target.value)}
                        placeholder="ostavi prazno — koristi se naslov"
                    />
                    <InputError message={errors.meta_title} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="meta_description">SEO opis</Label>
                    <Input
                        id="meta_description"
                        type="text"
                        value={data.meta_description}
                        onChange={(event) => setData('meta_description', event.target.value)}
                        placeholder="ostavi prazno — koristi se sažetak"
                    />
                    <InputError message={errors.meta_description} />
                </div>
            </div>

            <Button type="submit" disabled={processing}>
                {processing && <Spinner />}
                {submitLabel}
            </Button>
        </form>
    );
}
