@extends('layouts.app')

@section('content')
<div class="container login-content">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header"><h3>{{ __('Login') }}</h3></div>

                <div class="card-body">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf

                        <div class="row mb-2">
                            <label for="email" class="col-form-label">{{ __('Email') }}</label>

                            <div>
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror text-input" name="email" value="{{ old('email') }}" required autocomplete="email" placeholder="required*" autofocus>

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row mb-2">
                            <label for="password" class="col-form-label">{{ __('Password') }}</label>

                            <div class="input-group">
                                <input id="password" type="password" class="form-control text-input @error('password') is-invalid @enderror" name="password" required autocomplete="current-password" placeholder="required*">
                                <div class="input-group-append">
                                    <span class="input-group-text align-icon" onclick="changeType()">
                                        <span class="type-text" style="display:none"><div><i class="fa fa-eye"></i></div></span>
                                        <span class="type-pass"><div><i class="fa fa-eye-slash"></i></div></span>
                                    </span>
                                </div>
                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="row mb-2">
                            <div class="remember-section">
                                <div class="form-check">
                                    <input class="form-check-input shadow-none" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                    <label class="form-check-label" for="remember">
                                        {{ __('Remember Me') }}
                                    </label>
                                </div>
                                @if (Route::has('password.request'))
                                    <a class="btn btn-link text-dark shadow-none" href="{{ route('password.request') }}">
                                        {{ __('Forgot Password?') }}
                                    </a>
                                @endif
                            </div>
                        </div>

                        <div class="row mb-2">
                            <div class="col-md-12">
                                <button type="submit" class="btn btn-primary shadow-none w-100">
                                    {{ __('Login') }}
                                </button>
                            </div>
                        </div>
                        <!-- <div class="row">
                            @if (Route::has('register'))
                                <p class="mb-0 text-secondary text-center"> Do not have an account? </p>
                                <a class="shadow-none text-dark text-center" href="{{ route('register') }}">
                                    {{ __('Click here to create one') }}
                                </a>
                            @endif
                        </div> -->
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
