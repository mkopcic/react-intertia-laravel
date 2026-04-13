@extends('errors::minimal')

@section('title', 'Pristup odbijen')
@section('code', '403')
@section('message', $exception->getMessage() ?: 'Nemate dozvolu za pristup ovoj stranici.')
