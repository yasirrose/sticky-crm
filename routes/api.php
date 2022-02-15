<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\FormulasController;
use App\Http\Controllers\CampaignsController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\GoldenTicketController;
use App\Http\Controllers\STicketDailyController;
use App\Http\Controllers\STicketWeeklyController;
use App\Http\Controllers\STicketMonthlyController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['middleware' => ['web']], function () {
    Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout');
});
Route::resource('dashboard', DashboardController::class);
Route::resource('orders', OrdersController::class);
Route::resource('customers', CustomerController::class);
Route::resource('formulas', FormulasController::class);
Route::resource('golden-ticket', GoldenTicketController::class);
Route::resource('STicket-daily', STicketDailyController::class);
Route::resource('STicket-weekly', STicketWeeklyController::class);
Route::resource('STicket-monthly', STicketMonthlyController::class);
Route::get('golden-ticket/create/{month}/{year}', [GoldenTicketController::class, 'create']);
Route::get('get_campaigns', [CampaignsController::class, 'get_campaigns']);
Route::get('get_campaign_columns/{campaign_name}', [CampaignsController::class, 'get_campaign_columns']);
Route::get('refresh_campaigns', [CampaignsController::class, 'refresh_campaigns']);
Route::get('refresh_database_dec', [OrdersController::class, 'refresh_database_dec']);
Route::get('refresh_database_jan', [OrdersController::class, 'refresh_database_jan']);
Route::get('test_dec', [OrdersController::class, 'test_dec']);
Route::get('test_jan', [OrdersController::class, 'test_jan']);
Route::get('pull_orders_dec', [OrdersController::class, 'pull_orders_dec']);
Route::get('pull_orders_jan', [OrdersController::class, 'pull_orders_jan']);
Route::get('pull_daily_orders', [OrdersController::class, 'pull_daily_orders']);
Route::get('pull_daily_order_find', [OrdersController::class, 'pull_daily_order_find']);
Route::get('daily_orders', [OrdersController::class, 'daily_orders']);
Route::get('get_customer_detail', [CustomerController::class, 'get_customer_detail']);
Route::get('get_product_detail', [OrdersController::class, 'get_product_detail']);
Route::get('getDropDownContent', [OrdersController::class, 'getDropDownContent']);
Route::get('refresh_customers', [CustomerController::class, 'refresh_customers']);
Route::get('filter-golden-ticket/{month}/{year}', [GoldenTicketController::class, 'index']);
// Route::get('add-month-golden-ticket/{month}', [GoldenTicketController::class, 'add_month']);



