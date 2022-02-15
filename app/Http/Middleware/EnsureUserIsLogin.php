<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Services\JwtAuthentication\JwtDecode;
use App\Models\User;

class EnsureUserIsLogin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $jwtDecode = new JwtDecode($request->cookie('token'));
        $decodedData = $jwtDecode->jwtDecode();
        $user = User::where('id', $decodedData->data)->first();
        $request->user = $user;
        return $next($request);
    }
}
