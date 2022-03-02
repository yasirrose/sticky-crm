<?php

namespace App\Http\Controllers;

use App\Models\Mid;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class MidController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Mid::all();
        return response()->json(['status' =>true, 'data' =>$data]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Mid  $mid
     * @return \Illuminate\Http\Response
     */
    public function show(Mid $mid)
    {
        //
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
    public function destroy(Mid $mid)
    {
        //
    }
    public function pull_payment_router_view(){

        $new_gateways = 0; 
        $updated_gateways= 0;
        $db_gateway_alias = Mid::all()->pluck('gateway_alias')->toArray();
        $username = "yasir_dev";
        $password = "yyutmzvRpy5TPU";
        $url = 'https://thinkbrain.sticky.io/api/v1/payment_router_view';

        $api_data = json_decode(Http::asForm()->withBasicAuth($username, $password)->accept('application/json')->post($url, ['payment_router_id'=>1])->getBody()->getContents());
        $routers = $api_data->data;
        // dd($routers);
        if ($routers) {
            //adding or updating page 1 campaigns
            foreach ($routers as $router) {
                $gateways = $router->gateways;
                // dd('die');

                foreach($gateways as $gateway){
                    if(in_array($gateway->gateway_alias, $db_gateway_alias)){
                        $update = Mid::where(['gateway_alias'=>$gateway->gateway_alias])->first();
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
                    }
                    else{
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
        return response()->json(['status' => true, 'New campaigns:'=> $new_gateways, 'Updated Campaigns:'=>$updated_gateways]);
    }
}
