<x-mail::message>
# Introduction

Hello {{ $node->user->name }},
We are sorry to inform you that your node {{ $node->name }} - {{$node->ip}} is unreachable. Please check the node and make sure it is running.

<x-mail::button :url="config('app.frontend_url') . '/dashboard'">
Check Nodes
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
