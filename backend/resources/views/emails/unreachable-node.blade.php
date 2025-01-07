<x-mail::message>
# Introduction

Hello {{ $timestamp}}
This is scheduled to dun every {{ $interval }} minutes.

<x-mail::button :url="''">
Accept
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
