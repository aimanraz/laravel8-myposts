<?php

$csrf = csrf_token();
// dd($csrf)
?>

@extends('app.layouts.master')

@section('content')

<div id="WelcomePage" data-csrf="{{ $csrf }}"></div>
<script src="{{mix('js/WelcomePage.js')}}"></script>

@endsection
