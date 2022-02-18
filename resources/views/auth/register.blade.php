@extends('layouts.app')

@section('content')
<div class="container login-content">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header"><h3>{{ __('Register') }}</h3></div>

                <div class="card-body">
                    <form method="POST" action="{{ route('register') }}">
                        @csrf

                        <div class="row">
                            <label for="name" class="col-form-label">{{ __('Name') }}</label>

                            <div>
                                <input id="name" type="text" class="form-control @error('name') is-invalid @enderror text-input" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus placeholder="required*">

                                @error('name')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="row">
                            <label for="email" class="col-form-label ">{{ __('E-Mail Address') }}</label>

                            <div>
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror text-input" name="email" value="{{ old('email') }}" required autocomplete="email" placeholder="required*">

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class=" col-form-label ">{{ __('Password') }}</label>

                            <div class="input-group">
                                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror text-input" name="password" required autocomplete="new-password" placeholder="required*">
                                <div class="input-group-append">
                                    <span class="input-group-text align-icon" onclick="changeType()">
                                        <span class="type-text" style="display:none"><div><i class="fa fa-eye"></i></div></span>
                                        <span class="type-pass"><div><i class="fa fa-eye-slash"></i></div></span>
                                    </span>
                                </div>
                            </div>
                            @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        <div class="form-group row mb-4">
                            <label for="password-confirm" class="col-form-label ">{{ __('Confirm Password') }}</label>

                            <div class="input-group">
                                <input id="password-confirm" type="password" class="form-control text-input" name="password_confirmation" required autocomplete="new-password" placeholder="required*">
                                <div class="input-group-append">
                                    <span class="input-group-text align-icon" onclick="changeTypeConfirm()">
                                        <span class="type-text-confirm" style="display:none"><div><i class="fa fa-eye"></i></div></span>
                                        <span class="type-pass-confirm"><div><i class="fa fa-eye-slash"></i></div></span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-2">
                            <div class="col-md-12">
                                <button type="submit" class="btn btn-primary w-100">
                                    {{ __('Register') }}
                                </button>
                            </div>
                        </div>
                        <div class="row">
                            @if (Route::has('login'))
                                <p class="mb-0 text-secondary text-center">Already have an account? </p>
                                <a class="shadow-none text-dark text-center" href="{{ route('login') }}">
                                    {{ __('Sign in here') }}
                                </a>
                            @endif
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
