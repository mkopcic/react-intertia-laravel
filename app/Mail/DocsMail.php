<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;

class DocsMail extends Mailable
{
    use Queueable, SerializesModels;

    /** @var Collection<int, string> */
    public readonly Collection $docFiles;

    public function __construct()
    {
        $this->docFiles = collect(File::glob(base_path('docs/*.md')))
            ->merge(collect(File::glob(base_path('docs/**/*.md'))))
            ->unique()
            ->values();
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Portfolio Docs — ' . now()->format('Y-m-d'),
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.docs',
            with: [
                'fileNames' => $this->docFiles->map(fn (string $path) => basename($path)),
            ],
        );
    }

    /**
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return $this->docFiles
            ->map(fn (string $path) => Attachment::fromPath($path)
                ->as(basename($path))
                ->withMime('text/markdown')
            )
            ->all();
    }
}

