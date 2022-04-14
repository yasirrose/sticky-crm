<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Models\Mid;
use App\Models\Profile;
use App\Models\Order;
use App\Models\Decline;
use App\Models\MidCount;
use Carbon\Carbon;
use DB;

class MidController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $start_date = $request->start_date;
        $end_date = $request->end_date;
        if ($start_date != null && $end_date != null) {
            $start_date = Carbon::parse($start_date)->startOfDay();
            $end_date = Carbon::parse($end_date)->endOfDay();
        }
        if (isset($request->search) && $request->search != '') {
            $query = $query->search($request->search, null, true, true);
        }

        $data = DB::table('mids')
        ->join('orders', 'orders.gateway_id', '=', 'mids.gateway_id')
        ->join('profiles','mids.gateway_alias', '=', 'profiles.alias')
        ->where('orders.time_stamp', '>=', $start_date)
        ->where('orders.time_stamp', '<=', $end_date)
        ->select(DB::raw('mids.*'))
        ->addSelect(DB::raw('COUNT(orders.id) as total_count'))
        ->addSelect(DB::raw('SUM(orders.order_total) as sum'))
        ->selectRaw("count(case when orders.order_status = '2' then 1 end) as mid_count")
        ->selectRaw("count(case when orders.order_status = '7' then 1 end) as decline_per")
        ->addSelect('profiles.global_fields->mid_group as group_name')
        ->groupBy('mids.id','profiles.global_fields->mid_group')
        ->get();
        return response()->json(['status' => true, 'data' => $data]);
    }
    public function get_mid_count_detail(Request $request)
    {
        $start_date = $request->start_date;
        $end_date = $request->end_date;
        $gateway_id = $request->gateway_id;
        $status = $request->status;

        $array = [];
        $details = DB::table('orders')
            ->where('orders.gateway_id', $gateway_id)
            ->where('orders.acquisition_date', '>=', $start_date)
            ->where('orders.acquisition_date', '<=', $end_date)
            ->where('orders.order_status', $status)
            ->join('order_products', 'orders.order_id', '=', 'order_products.order_id')
            ->select('order_products.name as name')
            ->addSelect(DB::raw('COUNT(order_products.name) as total_count'))
            ->groupby('order_products.name')->distinct()->get();

        foreach ($details as $detail) {
            $data['name'] = $detail->name;
            $data['total_count'] = $detail->total_count;
            $data['percentage'] = round(($detail->total_count / $request->total_count) * 100, 2);
            array_push($array, $data);
        }
        return response()->json(['status' => true, 'data' => $array]);
    }

    public function show($alias)
    {
        $data = Profile::where(['alias' => $alias])->first();
        return response()->json(['status' => true, 'data' => $data]);
    }

    public function mids_order_total($id)
    {
        // DB::enableQueryLog();

        $mid = Mid::where(['id' => $id])->first();
        // date for 03/29/22 records
        $start_date = Carbon::now()->subDays(4)->startOfDay();
        $end_date = Carbon::now()->subDays(4)->endOfDay();
        // $daily_revenue = DB::table('orders')->whereBetween('acquisition_date', [$start_date, $end_date])->where(['order_status' => 2, 'gateway_id' => $mid->gateway_id])->sum('order_total');
        // $mid->daily_revenue = Order::whereBetween(DB::raw('DATE(acquisition_date)'), [$start_date, $end_date])->where(['order_status' => 2, 'gateway_id' => $mid->gateway_id])->select(
        //     DB::raw('sum(order_total) as order_total')
        // )->first();
        // $daily_revenue = DB::table('orders')->whereDate('acquisition_date', '>=', $start_date)->whereDate('acquisition_date', '<=', $end_date)->where(['order_status' => 2, 'gateway_id'=>$mid->gateway_id])->sum('order_total');
        // $daily_revenue = DB::table('orders')->whereBetween(DB::raw('DATE(acquisition_date)'), [$start_date, $end_date])->where(['order_status' => 2, 'gateway_id'=>$mid->gateway_id])->sum('order_total');
        $daily_revenue = DB::table('orders')->where('acquisition_date', '>=', $start_date)->where('acquisition_date', '<=', $end_date)->where(['order_status' => 2, 'gateway_id' => $mid->gateway_id])->sum('order_total');
        // dd(DB::getQueryLog());
        // return $daily_revenue;
        $mid->daily_revenue = round($daily_revenue, 2);
        return response()->json(['status' => true, 'data' => $mid]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Mid  $mid
     * @return \Illuminate\Http\Response
     */
    public function edit(Mid $mid)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Mid  $mid
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Mid $mid)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Mid  $mid
     * @return \Illuminate\Http\Response
     */
    public function destroy($alias)
    {
        $profile = Profile::where('alias', $alias)->first();
        DB::table('profiles')->where('alias', $alias)->update(['global_fields->mid_group' => '']);
        return response()->json(['status' => true, 'message' => 'Mid-group removed from' . $profile->alias]);
        // dd('die');
    }
    public function pull_payment_router_view()
    {
        $new_gateways = 0;
        $updated_gateways = 0;
        $db_gateway_alias = Mid::all()->pluck('gateway_alias')->toArray();
        $username = "yasir_dev";
        $password = "yyutmzvRpy5TPU";
        $url = 'https://thinkbrain.sticky.io/api/v1/payment_router_view';

        $api_data = json_decode(Http::asForm()->withBasicAuth($username, $password)->accept('application/json')->post($url, ['payment_router_id' => 1])->getBody()->getContents());
        $routers = $api_data->data;
        if ($routers) {
            foreach ($routers as $router) {
                $gateways = $router->gateways;

                foreach ($gateways as $gateway) {
                    if (in_array($gateway->gateway_alias, $db_gateway_alias)) {
                        $update = Mid::where(['gateway_alias' => $gateway->gateway_alias])->first();
                        $gateway->router_id = $router->id;
                        $gateway->router_name = $router->name;
                        $gateway->router_date_in = $router->date_in;
                        $gateway->router_desc = $router->description;
                        $gateway->mid_group_setting_id = $router->mid_group_setting_id;
                        $gateway->mid_group_setting = $router->mid_group_setting;
                        $gateway->is_three_d_routed = $router->is_three_d_routed;
                        $gateway->is_strict_preserve = $router->is_strict_preserve;
                        $update->update((array)$gateway);
                        $updated_gateways++;
                    } else {
                        $mid = new Mid();
                        $gateway->router_id = $router->id;
                        $gateway->router_name = $router->name;
                        $gateway->router_date_in = $router->date_in;
                        $gateway->router_desc = $router->description;
                        $gateway->mid_group_setting_id = $router->mid_group_setting_id;
                        $gateway->mid_group_setting = $router->mid_group_setting;
                        $gateway->is_three_d_routed = $router->is_three_d_routed;
                        $gateway->is_strict_preserve = $router->is_strict_preserve;
                        $mid->create((array)$gateway);
                        $new_gateways++;
                    }
                }
            }
        }
        // app(\App\Http\Controllers\ProfileController::class)->update_profiles();
        return response()->json(['status' => true, 'data' => ['new_mids' => $new_gateways, 'updated_mids' => $updated_gateways]]);
    }
    public function get_gateway_ids()
    {
        $username = "yasir_dev";
        $password = "yyutmzvRpy5TPU";
        $url = 'https://thinkbrain.sticky.io/api/v1/gateway_view';
        $gateways = Mid::pluck('gateway_id')->toArray();

        foreach ($gateways as $id) {
            $data = json_decode(Http::withBasicAuth($username, $password)->accept('application/json')->post($url, ['gateway_id' => $id])->getBody()->getContents());
            dd($data);
        }
    }

    public function assign_mid_group(Request $request)
    {
        // dd($request->alias);
        $profile = Profile::where('alias', $request->alias)->first();
        if ($profile) {
            DB::table('profiles')->where('alias', $request->alias)->update(['global_fields->mid_group' => $request->group_name]);
            return response()->json(['status' => true, 'message' => $request->group_name . ' Assigned as Mid-group to ' . $profile->alias]);
        } else {
            return response()->json(['status' => false, 'message' => 'Gateway Alias ' . $request->alias . ' is not found against any Profile.']);
        }
    }

    public function assign_bulk_group(Request $request)
    {
        // dd($request->all());
        $data = $request->all();
        $alias = array_column($data, 'gateway_alias');
        $total_mids = count($alias);
        if ($request->group_name == '') {
            DB::table('profiles')->whereIn('alias', $alias)->update(['global_fields->mid_group' => '']);
            return response()->json(['status' => true, 'message' => 'Unassigned group to ' . $total_mids . ' mids']);
        } else {
            DB::table('profiles')->whereIn('alias', $alias)->update(['global_fields->mid_group' => $request->group_name]);
            return response()->json(['status' => true, 'message' => $request->group_name . ' Assigned as Mid-group to ' . $total_mids . ' mids ']);
        }
    }

    public function remove_groups(Request $request)
    {
        $data = $request->all();
        dd($data);
    }

    public function get_first_mid()
    {
        $data = Profile::first();
        return response()->json(['status' => true, 'data' => $data]);
    }

    public function refresh_mid_count()
    {
        $data = Mid::all();
        foreach ($data as $mid) {
            $mid->mid_count = Order::where(['gateway_id' => $mid->gateway_id])->count();
            $mid->save();
        }
        return response()->json(['status' => true, 'data' => ['message' => "Mid Counts Refreshed Successfully."]]);
    }
    public function refresh_decline_percentage()
    {
        $data = Mid::all();
        foreach ($data as $mid) {
            $declined_orders = Order::with('product')->where(['gateway_id' => $mid->gateway_id, 'prepaid_match' => 'NO', 'is_test_cc' => 0, 'order_status' => 7]);
            $mid->decline_per = ($declined_orders->count()) / 100;
            $products_data = $declined_orders->get()->pluck('product')->toArray();
            // dd(json_encode($products_data));
            $mid->decline_orders = $products_data;
            $mid->save();
        }
    }
    public function get_mids_decline_data()
    {
        $data = Mid::all();
        foreach ($data as $mid) {
            $data = [];
            $data['gateway_id'] = $mid->gateway_id;
            $data['gateway_alias'] = $mid->gateway_alias;
            $declined_orders = Order::with('product')->where(['gateway_id' => $mid->gateway_id, 'prepaid_match' => 'NO', 'is_test_cc' => 0, 'order_status' => 7]);
            $total_orders = $declined_orders->count();
            $data['decline_per'] = ($total_orders) / 100;
            $product_names = $declined_orders->get()->countBy('product.name')->toArray();
            foreach ($product_names as $name => $count) {
                $decline_data[] = (object)array(
                    'name' => $name,
                    'count' => $count,
                    'percentage' => round((($count / $total_orders) * 100), 2)
                );
            }
            $decline_data['total'] = $total_orders;
            $data['decline_data'] = $decline_data;
            $data['total_declined'] = $total_orders;
            $decline = Decline::create($data);
            $mid->decline_id = $decline->id;
            $mid->save();
            $decline_data = null;
        }
        return response()->json(['status' => true]);
    }

    public function get_mids_count_data()
    {
        $data = Mid::all();
        foreach ($data as $mid) {
            $data = [];
            $data['gateway_id'] = $mid->gateway_id;
            $data['gateway_alias'] = $mid->gateway_alias;
            $declined_orders = Order::with('product')->where(['gateway_id' => $mid->gateway_id, 'order_status' => 2]);
            $mid_count = $declined_orders->count();
            // $data['decline_per'] = ($total_orders) / 100;
            $product_names = $declined_orders->get()->countBy('product.name')->toArray();
            foreach ($product_names as $name => $count) {
                $mid_count_data[] = array(
                    'name' => $name,
                    'count' => $count,
                    'percentage' => round((($count / $mid_count) * 100), 2)
                );
            }
            $data['mid_count_data'] = $mid_count_data;
            $data['mid_count'] = $mid_count;
            $model = MidCount::create($data);
            $mid->mid_count_id = $model->id;
            $mid->save();
            $mid_count_data = null;
        }
        return response()->json(['status' => true]);
    }
}
