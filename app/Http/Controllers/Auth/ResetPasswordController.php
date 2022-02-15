<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Services\JwtAuthentication\JwtConfig;
use Illuminate\Support\Facades\Auth;

class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    use ResetsPasswords;

    /**
     * Where to redirect users after resetting their password.
     *
     * @var string
     */
    protected $redirectTo = '';

    protected function sendResetResponse(Request $request, $response)
    {
        $jwtConfig = new JwtConfig(true, 1440);
        $jwt = $jwtConfig->generateJWT(Auth::id());
        return redirect(env('APP_URL') . '/')->withCookie(cookie('token', $jwt, null, null, null, false, false))->with('status', trans($response));;
    
        // if ($request->wantsJson()) {
        //     return new JsonResponse(['message' => trans($response)], 200);
        // }

        // return redirect($this->redirectPath())
        //                     ->with('status', trans($response));
    }
}
