<x-mail::message>
# Portfolio Docs

U prilogu se nalaze svi dokumenti iz docs/ mape.

@if(count($fileNames) > 0)
**Priloženi fajlovi ({{ count($fileNames) }}):**

@foreach($fileNames as $name)
- {{ $name }}
@endforeach
@else
*Nema pronađenih .md fajlova u docs/ mapi.*
@endif

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
