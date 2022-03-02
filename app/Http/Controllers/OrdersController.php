<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Order;
use App\Models\Campaign;
use DB;
use Carbon\Carbon;

class OrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $start_date = date('Y-m-d', strtotime($request->start_date));
        $end_date = date('Y-m-d', strtotime($request->end_date));
        $pageno = isset($request->pageno) ? $request->pageno : 0;
        $no_of_records_per_page = isset($request->per_page) ? $request->per_page : 10;
        $offset = ($pageno) * $no_of_records_per_page;
        
        // query orders sir basit
        $query = DB::table('orders')
        ->select('id','order_id','created_by_employee_name','billing_first_name', 'billing_last_name', 'billing_street_address', 'order_total', 'acquisition_month', 'acquisition_year', 'c1', 'affid', 'trx_month', 'order_sales_tax_amount', 'decline_reason','is_cascaded','decline_reason_details','is_fraud','is_chargeback','chargeback_date','is_rma','rma_number','rma_reason','is_recurring','is_void','void_amount','void_date','is_refund','refund_amount','refund_date','order_confirmed','order_confirmed_date','acquisition_date','is_blacklisted','coupon_id','created_by_user_name','order_sales_tax','order_status','promo_code','recurring_date','response_code','return_reason');
        
        $total_rows = Order::where('id', '>' ,0)->count();
        if ($start_date != null && $start_date != "1970-01-01" && $end_date != null && $end_date != "1970-01-01"){
            $query->whereBetween('acquisition_date', [$start_date.' 00:00:00', $end_date.' 23:59:59']);
        }

        if($request->fields != null){
            $field_array = explode(',', $request->fields);
            $value_array = explode(',', $request->values);
            for($i = 0; $i < count($value_array); $i++){
                if($value_array[$i] != '' && $field_array[$i] != 'products'){
                    $query->where($field_array[$i],$value_array[$i]);
                }
                if($field_array[$i] == 'products'){
                    $query->where('products', 'like', '%' . $value_array[$i] . '%');
                }
            }
        }
        if($request->search != ''){
            $query->where('order_id', 'like', '%' . $request->search . '%')
            ->orWhere('created_by_employee_name', 'like', '%'.$request->search.'%')
            ->orWhere('billing_first_name', 'like', '%'.$request->search.'%')
            ->orWhere('billing_last_name', 'like', '%'.$request->search.'%')
            ->orWhere('billing_street_address', 'like', '%'.$request->search.'%')
            ->orWhere('c1', 'like', '%'.$request->search.'%')
            ->orWhere('affid', 'like', '%'.$request->search.'%')
            ->orWhere('trx_month', 'like', '%'.$request->search.'%')
            ->orWhere('order_sales_tax_amount', 'like', '%'.$request->search.'%')
            ->orWhere('decline_reason', 'like', '%'.$request->search.'%')
            ->orWhere('is_cascaded', 'like', '%'.$request->search.'%')
            ->orWhere('created_by_user_name', 'like', '%'.$request->search.'%');
        }
      
        $rows = $query->orderBy('id', 'desc')->SimplePaginate($no_of_records_per_page);
        $total_pages = ceil($total_rows / $rows->perPage());

        $pag['count'] = $total_rows;
        $pag['total_pages'] = $total_pages;
        $pag['pageno'] = $pageno;
        $pag['rows_per_page'] = $no_of_records_per_page;
        return response()->json(['status' => true, 'data' => $rows, 'pag' => $pag]);
    }
    public function getDropDownContent(){
        DB::enableQueryLog();
        // $query = DB::table('orders')->where('id','>',0)->distinct();
        // $data['gateways'] = $query->get('gateway_descriptor');
        $data = DB::select("SELECT gateway_descriptor as aggregate from `orders` where `id` > 0")->distinct();
        
        // $data['country'] = $query->get('billing_country');
        // $data['state'] = $query->get('billing_state');
        // $data['card_type'] = $query->get('cc_type');
        // $data['campaigns'] = DB::table('campaigns')->select('id','name')->get();
        
        return response()->json($data);
    }

    public function create(){}
    public function store(Request $request){}
    public function show($id){}
    public function edit($id){}
    public function update(Request $request, $id){}
    public function destroy($id){}

    public function get_product_detail(Request $request)
    {
        $data = DB::table('orders')->select('*')->find($request->id);
        $data->products = unserialize($data->products);
        return response()->json(['status' => true, 'data' => $data]);
    }

    public function get_states()
    {
        $data = Order::pluck('billing_state')->toArray();
        $data = array_unique($data);
        dd($data);
    }

    public function refresh_database_dec(Request $request)
    {

        $db_order_ids = Order::all()->pluck('order_id')->toArray();
        // dd($db_order_ids);
        $username = "yasir_dev";
        $password = "yyutmzvRpy5TPU";
        $url = 'https://thinkbrain.sticky.io/api/v1/order_view';
        $page = 1;
        $model = new Order();

        $api_data = Http::withBasicAuth($username, $password)
            ->accept('application/json')
            ->get('https://thinkbrain.sticky.io/api/v2/orders/histories', [
                'start_at' => '2021-12-01 00:00:00',
                'end_at' => '2021-12-31 23:59:59',
                'page' => $page
            ]);
        $response['orders'] = $api_data['data'];
        $last_page = $api_data['last_page'];

        // dd($response['orders']);
        if ($response['orders']) {
            $order_ids = $model->get_order_ids($response['orders']);
            // dd($order_ids);die;
            if ($last_page > 1) {
                $page++;
                for ($page; $page <= $last_page; $page++) {
                    $response['orders'] = Http::withBasicAuth($username, $password)
                        ->accept('application/json')
                        ->get('https://thinkbrain.sticky.io/api/v2/orders/histories', [
                            'start_at' => '2021-12-01 00:00:00',
                            'end_at' => '2021-12-31 23:59:59',
                            'page' => $page
                        ])['data'];

                    $order_ids = array_merge($order_ids, $model->get_order_ids($response['orders']));
                }
            }
            // dd($order_ids);
            // dd($response['orders']);
            $order_ids = array_unique($order_ids);
            // dd($order_ids);
            if ($order_ids[0]) {
                $data[] = json_decode(Http::asForm()->withBasicAuth($username, $password)
                    ->accept('application/json')
                    ->post('https://thinkbrain.sticky.io/api/v1/order_view', [
                        'order_id' => $order_ids
                    ])->getBody()->getContents());

                // dd($data);
                $data = (array)$data[0]->data;
                foreach ($data as $object) {
                    $results[] = (array)$object;
                }
                foreach ($results as $result) {
                    // if($result['billing_first_name'] == "test" || $result['billing_first_name'] == "Test" || $result['billing_first_name'] == "DONOTSHIP"){
                    //     continue;
                    // }
                    $order = new Order();
                    // dd(date('M', ));

                    $month = Carbon::parse($result['acquisition_date'])->format('F');
                    $year = Carbon::parse($result['acquisition_date'])->format('Y');
                    $result['acquisition_month'] = $month;
                    $result['acquisition_year'] = $year;
                    $result['trx_month'] = $month;
                    $result['billing_email'] = $result['email_address'];
                    $result['billing_telephone'] = $result['customers_telephone'];
                    $result['shipping_email'] = $result['email_address'];
                    $result['shipping_telephone'] = $result['customers_telephone'];
                    if ($result['employeeNotes']) {
                        $result['employeeNotes'] = serialize($result['employeeNotes']);
                    }
                    $result['utm_info'] = serialize($result['utm_info']);
                    $result['products'] = serialize($result['products']);
                    $result['systemNotes'] = serialize($result['systemNotes']);
                    $result['totals_breakdown'] = serialize($result['totals_breakdown']);
                    if (in_array($result['order_id'], $db_order_ids)) {
                        // var_dump('updated');
                        $order = Order::where(['order_id' => $result['order_id']])->first();
                        $order->update($result);
                    } else {
                        $order->create($result);
                    }
                }
            }
        }
    }
    public function refresh_database_jan(Request $request)
    {

        $db_order_ids = Order::all()->pluck('order_id')->toArray();

        $username = "yasir_dev";
        $password = "yyutmzvRpy5TPU";
        $url = 'https://thinkbrain.sticky.io/api/v1/order_view';
        $page = 1;
        $model = new Order();

        $api_data = Http::withBasicAuth($username, $password)
            ->accept('application/json')
            ->get('https://thinkbrain.sticky.io/api/v2/orders/histories', [
                'start_at' => '2022-01-01 00:00:00',
                'end_at' => '2022-01-31 23:59:59',
                'page' => $page
            ]);
        $response['orders'] = $api_data['data'];
        $last_page = $api_data['last_page']; 

        // dd($response);
        if ($response['orders']) {
            $order_ids = $model->get_order_ids($response['orders']);
            // dd($order_ids);die;
            if ($last_page > 1) {
                $page++;
                for ($page; $page <= $last_page; $page++) {
                    $response['orders'] = Http::withBasicAuth($username, $password)
                        ->accept('application/json')
                        ->get('https://thinkbrain.sticky.io/api/v2/orders/histories', [
                            'start_at' => '2022-01-01 00:00:00',
                            'end_at' => '2022-01-31 23:59:59',
                            'page' => $page
                        ])['data'];

                    $order_ids = array_merge($order_ids, $model->get_order_ids($response['orders']));
                }
            }
            $order_ids = array_unique($order_ids);
            // dd($order_ids);
            if ($order_ids[0]) {
                $data[] = json_decode(Http::asForm()->withBasicAuth($username, $password)
                    ->accept('application/json')
                    ->post('https://thinkbrain.sticky.io/api/v1/order_view', [
                        'order_id' => $order_ids
                    ])->getBody()->getContents());

                // dd($data);
                $data = (array)$data[0]->data;
                foreach ($data as $object) {
                    $results[] = (array)$object;
                }
                // dd($results);
                foreach ($results as $result) {
                    // if($result['billing_first_name'] == "test" || $result['billing_first_name'] == "Test" || $result['billing_first_name'] == "DONOTSHIP"){
                    //     continue;
                    // }
                    $order = new Order();
                    $month = Carbon::parse($result['acquisition_date'])->format('F');
                    $year = Carbon::parse($result['acquisition_date'])->format('Y');
                    $result['acquisition_month'] = $month;
                    $result['acquisition_year'] = $year;
                    $result['trx_month'] = $month;
                    $result['billing_email'] = $result['email_address'];
                    $result['billing_telephone'] = $result['customers_telephone'];
                    $result['shipping_email'] = $result['email_address'];
                    $result['shipping_telephone'] = $result['customers_telephone'];
                    if (array_key_exists('employeeNotes', $result)) {
                        $result['employeeNotes'] = serialize($result['employeeNotes']);
                    }
                    $result['utm_info'] = serialize($result['utm_info']);
                    $result['products'] = serialize($result['products']);
                    $result['systemNotes'] = serialize($result['systemNotes']);
                    $result['totals_breakdown'] = serialize($result['totals_breakdown']);
                    if (in_array($result['order_id'], $db_order_ids)) {
                        var_dump('updated');
                        $order = Order::where(['order_id' => $result['order_id']])->first();
                        $order->update($result);
                    } else {
                        $order->create($result);
                    }
                }
            }
        }
    }
    public function test_dec(Request $request)
    {
        // dd('test');
        $db_order_ids = Order::all()->pluck('order_id')->toArray();

        $username = "yasir_dev";
        $password = "yyutmzvRpy5TPU";
        $url = 'https://thinkbrain.sticky.io/api/v1/order_view';
        $page = 1;
        $model = new Order();

        $api_data = Http::withBasicAuth($username, $password)
            ->accept('application/json')
            ->get('https://thinkbrain.sticky.io/api/v2/orders/histories', [
                'start_at' => '2022-01-24 00:00:00',
                'end_at' => '2022-01-24 23:59:59',
                'page' => $page
            ]);
        $response['orders'] = $api_data['data'];
        $last_page = $api_data['last_page']; 

        // dd($response);
        if ($response['orders']) {
            $order_ids = $model->get_order_ids($response['orders']);
            // dd($order_ids);die;
            if ($last_page > 1) {
                $page++;
                for ($page; $page <= $last_page; $page++) {
                    $response['orders'] = Http::withBasicAuth($username, $password)
                        ->accept('application/json')
                        ->get('https://thinkbrain.sticky.io/api/v2/orders/histories', [
                            'start_at' => '2022-01-24 00:00:00',
                            'end_at' => '2022-01-24 23:59:59',
                            'page' => $page
                        ])['data'];

                    $order_ids = array_merge($order_ids, $model->get_order_ids($response['orders']));
                }
            }
            // dd($order_ids);
            $order_ids = array_unique($order_ids);
            if ($order_ids[0]) {
                $data[] = json_decode(Http::asForm()->withBasicAuth($username, $password)
                    ->accept('application/json')
                    ->post('https://thinkbrain.sticky.io/api/v1/order_view', [
                        'order_id' => $order_ids
                    ])->getBody()->getContents());

                // dd($data);
                $data = (array)$data[0]->data;
                foreach ($data as $object) {
                    $results[] = (array)$object;
                }
                dd($results);
                foreach ($results as $result) {
                    // if($result['billing_first_name'] == "test" || $result['billing_first_name'] == "Test" || $result['billing_first_name'] == "DONOTSHIP"){
                    //     continue;
                    // }
                    $order = new Order();
                    $month = Carbon::parse($result['acquisition_date'])->format('F');
                    $year = Carbon::parse($result['acquisition_date'])->format('Y');
                    $result['acquisition_month'] = $month;
                    $result['acquisition_year'] = $year;
                    $result['trx_month'] = $month;
                    $result['billing_email'] = $result['email_address'];
                    $result['billing_telephone'] = $result['customers_telephone'];
                    $result['shipping_email'] = $result['email_address'];
                    $result['shipping_telephone'] = $result['customers_telephone'];
                    if (array_key_exists('employeeNotes', $result)) {
                        $result['employeeNotes'] = serialize($result['employeeNotes']);
                    }
                    $result['utm_info'] = serialize($result['utm_info']);
                    $result['products'] = serialize($result['products']);
                    $result['systemNotes'] = serialize($result['systemNotes']);
                    $result['totals_breakdown'] = serialize($result['totals_breakdown']);
                    if (in_array($result['order_id'], $db_order_ids)) {
                        // var_dump('updated');
                        $order = Order::where(['order_id' => $result['order_id']])->first();
                        $order->update($result);
                    } else {
                        $order->create($result);
                    }
                }
            }
        }
    }
    public function test_jan(Request $request)
    {
        // dd('test jan');
        $new_orders = 0;
        $updated_orders = 0;
        $db_order_ids = Order::all()->pluck('order_id')->toArray();

        $username = "yasir_dev";
        $password = "yyutmzvRpy5TPU";
        $url = 'https://thinkbrain.sticky.io/api/v1/order_view';
        $page = 1;
        $model = new Order();

        $api_data = Http::withBasicAuth($username, $password)
            ->accept('application/json')
            ->get('https://thinkbrain.sticky.io/api/v2/orders/histories', [
                'start_at' => '2022-01-26 00:00:00',
                'end_at' => '2022-01-26 23:59:59',
                'page' => $page
            ]);
        $response['orders'] = $api_data['data'];
        $last_page = $api_data['last_page']; 

        // dd($response);
        if ($response['orders']) {
            $order_ids = $model->get_order_ids($response['orders']);
            // dd($order_ids);die;
            if ($last_page > 1) {
                $page++;
                for ($page; $page <= $last_page; $page++) {
                    $response['orders'] = Http::withBasicAuth($username, $password)
                        ->accept('application/json')
                        ->get('https://thinkbrain.sticky.io/api/v2/orders/histories', [
                            'start_at' => '2022-01-26 00:00:00',
                            'end_at' => '2022-01-26 23:59:59',
                            'page' => $page
                        ])['data'];

                    $order_ids = array_merge($order_ids, $model->get_order_ids($response['orders']));
                }
            }
            $order_ids = array_unique($order_ids);
            // dd($order_ids);
            if ($order_ids[0]) {
                $data[] = json_decode(Http::asForm()->withBasicAuth($username, $password)
                    ->accept('application/json')
                    ->post('https://thinkbrain.sticky.io/api/v1/order_view', [
                        'order_id' => $order_ids
                    ])->getBody()->getContents());

                // dd($data);
                $data = (array)$data[0]->data;
                foreach ($data as $object) {
                    $results[] = (array)$object;
                }
                // dd($results);
                foreach ($results as $result) {
                    // if($result['billing_first_name'] == "test" || $result['billing_first_name'] == "Test" || $result['billing_first_name'] == "DONOTSHIP"){
                    //     continue;
                    // }
                    $order = new Order();
                    $month = Carbon::parse($result['acquisition_date'])->format('F');
                    $year = Carbon::parse($result['acquisition_date'])->format('Y');
                    $result['acquisition_month'] = $month;
                    $result['acquisition_year'] = $year;
                    $result['trx_month'] = $month;
                    $result['billing_email'] = $result['email_address'];
                    $result['billing_telephone'] = $result['customers_telephone'];
                    $result['shipping_email'] = $result['email_address'];
                    $result['shipping_telephone'] = $result['customers_telephone'];
                    if (array_key_exists('employeeNotes', $result)) {
                        $result['employeeNotes'] = serialize($result['employeeNotes']);
                    }
                    $result['utm_info'] = serialize($result['utm_info']);
                    $result['products'] = serialize($result['products']);
                    $result['systemNotes'] = serialize($result['systemNotes']);
                    $result['totals_breakdown'] = serialize($result['totals_breakdown']);
                    if (in_array($result['order_id'], $db_order_ids)) {
                        // var_dump('updated');
                        $updated_orders++;
                        $order = Order::where(['order_id' => $result['order_id']])->first();
                        $order->update($result);
                    } else {
                        $new_orders++;
                        $order->create($result);
                    }
                }
            }
        }
        return response()->json(['status' => true, 'new_orders' => $new_orders, 'updated_orders' => $updated_orders]);
    }
    public function daily_orders()
    {
        $new_orders = 0;
        $updated_orders = 0;
        $start = Carbon::today();
        // $end = Carbon::today()->endOfDay(); 
        $start_of_day = Carbon::now()->startOfDay()->format('Y-m-d H:i:s');
        $end_of_day = Carbon::now()->endOfDay()->format('Y-m-d H:i:s');
        // var_dump($end_of_day);die;

        $db_order_ids = Order::all()->pluck('order_id')->toArray();

        $username = "yasir_dev";
        $password = "yyutmzvRpy5TPU";
        $url = 'https://thinkbrain.sticky.io/api/v1/order_view';
        $page = 1;
        $model = new Order();

        $api_data = Http::withBasicAuth($username, $password)
            ->accept('application/json')
            ->get('https://thinkbrain.sticky.io/api/v2/orders/histories', [
                'start_at' => $start_of_day,
                'end_at' => $end_of_day,
                'page' => $page
            ]);
        $response['orders'] = $api_data['data'];
        $last_page = $api_data['last_page']; 

        // dd($response);
        if ($response['orders']) {
            $order_ids = $model->get_order_ids($response['orders']);
            // dd($order_ids);die;
            if ($last_page > 1) {
                $page++;
                for ($page; $page <= $last_page; $page++) {
                    $response['orders'] = Http::withBasicAuth($username, $password)
                        ->accept('application/json')
                        ->get('https://thinkbrain.sticky.io/api/v2/orders/histories', [
                            'start_at' => $start_of_day,
                            'end_at' => $end_of_day,
                            'page' => $page
                        ])['data'];

                    $order_ids = array_merge($order_ids, $model->get_order_ids($response['orders']));
                }
            }
            $order_ids = array_unique($order_ids);
            // dd($order_ids);
            if ($order_ids[0]) {
                $data[] = json_decode(Http::asForm()->withBasicAuth($username, $password)
                    ->accept('application/json')
                    ->post('https://thinkbrain.sticky.io/api/v1/order_view', [
                        'order_id' => $order_ids
                    ])->getBody()->getContents());

                // dd($data);
                $data = (array)$data[0]->data;
                foreach ($data as $object) {
                    $results[] = (array)$object;
                }
                // dd($results);
                foreach ($results as $result) {

                    // $order = new Order();
                    // $month = Carbon::parse($result['acquisition_date'])->format('F');
                    // $year = Carbon::parse($result['acquisition_date'])->format('Y');
                    // $result['acquisition_month'] = $month;
                    // $result['acquisition_year'] = $year;
                    // $result['trx_month'] = $month;
                    // $result['billing_email'] = $result['email_address'];
                    // $result['billing_telephone'] = $result['customers_telephone'];
                    // $result['shipping_email'] = $result['email_address'];
                    // $result['shipping_telephone'] = $result['customers_telephone'];
                    // if(array_key_exists('employeeNotes', $result)){
                    //     $result['employeeNotes'] = serialize($result['employeeNotes']);
                    // }
                    // $result['utm_info'] = serialize($result['utm_info']);
                    // $result['products'] = serialize($result['products']);
                    // $result['systemNotes'] = serialize($result['systemNotes']);
                    // $result['totals_breakdown'] = serialize($result['totals_breakdown']);
                    if (in_array($result['order_id'], $db_order_ids)) {
                        $updated_orders++;
                        // $order = Order::where(['order_id'=>$result['order_id']])->first();
                        // $order->update($result);
                    } else {
                        $new_orders++;
                        // $order->create($result);
                    }
                }
            }
        }
        return response()->json(['status' => true, 'New Record in todays API' => $new_orders, 'Previous orders to be updated in orders table' => $updated_orders]);
    }
    public function pull_orders_dec()
    {

        $new_orders = 0;
        $updated_orders = 0;
        $start = Carbon::today();
        // $end = Carbon::today()->endOfDay(); 
        $start_of_day = Carbon::now()->startOfDay()->format('Y-m-d H:i:s');
        $end_of_day = Carbon::now()->endOfDay()->format('Y-m-d H:i:s');
        // var_dump($end_of_day);die;
        $db_campaign_ids = Campaign::all()->pluck('id')->toArray();
        $db_order_ids = Order::all()->pluck('order_id')->toArray();

        $username = "yasir_dev";
        $password = "yyutmzvRpy5TPU";
        $url = 'https://thinkbrain.sticky.io/api/v1/order_find';
        $model = new Order();

        $api_data = json_decode(Http::asForm()->withBasicAuth($username, $password)->accept('application/json')->post(
            $url,
            [
                'start_date' => '12/01/2021',
                'end_date' => '12/31/2021',
                'campaign_id' => 'all',
                'criteria' => 'all',
                'return_type' => 'order_view'
            ]
        )->getBody()->getContents());

        $order_ids = $api_data->order_id;
        $total_orders = $api_data->total_orders;
        if ($total_orders < 500) {
            $api_orders = $api_data->data;
            foreach ($api_orders as $key => $order) {
                $orders_arr[] = (array)$order;
            }
            foreach ($orders_arr as $result) {

                $order = new Order();
                $month = Carbon::parse($result['acquisition_date'])->format('F');
                $year = Carbon::parse($result['acquisition_date'])->format('Y');
                $result['acquisition_month'] = $month;
                $result['acquisition_year'] = $year;
                $result['trx_month'] = $month;
                $result['billing_email'] = $result['email_address'];
                $result['billing_telephone'] = $result['customers_telephone'];
                $result['shipping_email'] = $result['email_address'];
                $result['shipping_telephone'] = $result['customers_telephone'];
                if (array_key_exists('employeeNotes', $result)) {
                    $result['employeeNotes'] = serialize($result['employeeNotes']);
                }
                $result['utm_info'] = serialize($result['utm_info']);
                $result['products'] = serialize($result['products']);
                $result['systemNotes'] = serialize($result['systemNotes']);
                $result['totals_breakdown'] = serialize($result['totals_breakdown']);
                if (in_array($result['order_id'], $db_order_ids)) {
                    $updated_orders++;
                    $order = Order::where(['order_id' => $result['order_id']])->first();
                    $order->update($result);
                } else {
                    $new_orders++;
                    $order->create($result);
                }
            }
            return response()->json(['status' => true, 'New Record API' => $new_orders, 'Previous orders to be updated in orders table' => $updated_orders]);
        } else if ($total_orders <= 50000) {

            $chunked_array = array_chunk($order_ids, 500);
            // dd($chunked_array);
            foreach ($chunked_array as $chucked_ids) {
                $order_view_api = 'https://thinkbrain.sticky.io/api/v1/order_view';
                $data[] = json_decode(Http::asForm()->withBasicAuth($username, $password)->accept('application/json')
                    ->post($order_view_api, ['order_id' => $chucked_ids])->getBody()->getContents());

                    // dd($data);
                $data = (array)$data[0]->data;
                foreach ($data as $object) {
                    $results[] = (array)$object;
                }
                foreach ($results as $result) {

                    $order = new Order();
                    $month = Carbon::parse($result['acquisition_date'])->format('F');
                    $year = Carbon::parse($result['acquisition_date'])->format('Y');
                    $result['acquisition_month'] = $month;
                    $result['acquisition_year'] = $year;
                    $result['trx_month'] = $month;
                    $result['billing_email'] = $result['email_address'];
                    $result['billing_telephone'] = $result['customers_telephone'];
                    $result['shipping_email'] = $result['email_address'];
                    $result['shipping_telephone'] = $result['customers_telephone'];
                    if (array_key_exists('employeeNotes', $result)) {
                        $result['employeeNotes'] = serialize($result['employeeNotes']);
                    }
                    $result['utm_info'] = serialize($result['utm_info']);
                    $result['products'] = serialize($result['products']);
                    $result['systemNotes'] = serialize($result['systemNotes']);
                    $result['totals_breakdown'] = serialize($result['totals_breakdown']);
                    if (in_array($result['order_id'], $db_order_ids)) {
                        $updated_orders++;
                        $order = Order::where(['order_id' => $result['order_id']])->first();
                        $order->update($result);
                    } else {
                        $new_orders++;
                        $order->create($result);
                    }
                }
                $data = null;
                $results = null;
            }
            return response()->json(['status' => true, 'New Record in todays API' => $new_orders, 'Previous orders to be updated in orders table' => $updated_orders]);
        }
    }
    public function pull_orders_jan()
    {

        $new_orders = 0;
        $updated_orders = 0;
        $db_order_ids = Order::pluck('order_id')->toArray();
        // $db_order_ids = DB::table('orders')->pluck('order_id')->toArray();

        $username = "yasir_dev";
        $password = "yyutmzvRpy5TPU";
        $url = 'https://thinkbrain.sticky.io/api/v1/order_find';
        $model = new Order();

        $api_data = json_decode(Http::asForm()->withBasicAuth($username, $password)->accept('application/json')->post(
            $url,
            [
                'start_date' => '02/24/2022',
                'end_date' => '02/28/2022',
                'campaign_id' => 'all',
                'criteria' => 'all',
                'return_type' => 'order_view'
            ]
        )->getBody()->getContents());

        $order_ids = $api_data->order_id;
        $total_orders = $api_data->total_orders;
        // dd($order_ids);
        if ($total_orders < 500) {
            $api_orders = $api_data->data;
            foreach ($api_orders as $key => $order) {
                $orders_arr[] = (array)$order;
            }
            foreach ($orders_arr as $result) {

                $order = new Order();
                $month = Carbon::parse($result['acquisition_date'])->format('F');
                $year = Carbon::parse($result['acquisition_date'])->format('Y');
                $result['acquisition_month'] = $month;
                $result['acquisition_year'] = $year;
                $result['trx_month'] = $month;
                $result['billing_email'] = $result['email_address'];
                $result['billing_telephone'] = $result['customers_telephone'];
                $result['shipping_email'] = $result['email_address'];
                $result['shipping_telephone'] = $result['customers_telephone'];
                if (array_key_exists('employeeNotes', $result)) {
                    $result['employeeNotes'] = serialize($result['employeeNotes']);
                }
                $result['utm_info'] = serialize($result['utm_info']);
                $result['products'] = serialize($result['products']);
                $result['systemNotes'] = serialize($result['systemNotes']);
                $result['totals_breakdown'] = serialize($result['totals_breakdown']);
                if (in_array($result['order_id'], $db_order_ids)) {
                    $updated_orders++;
                    $order = Order::where(['order_id' => $result['order_id']])->first();
                    $order->update($result);
                } else {
                    $new_orders++;
                    $order->create($result);
                }
            }
            return response()->json(['status' => true, 'New Record API' => $new_orders, 'Previous orders to be updated in orders table' => $updated_orders]);
        } else if ($total_orders < 50000) {

            $chunked_array = array_chunk($order_ids, 500);
            // dd($chunked_array);
            foreach ($chunked_array as $chucked_ids) {
                $order_view_api = 'https://thinkbrain.sticky.io/api/v1/order_view';
                $data[] = json_decode(Http::asForm()->withBasicAuth($username, $password)->accept('application/json')
                    ->post($order_view_api, ['order_id' => $chucked_ids])->getBody()->getContents());

                    // dd($data);
                $data = (array)$data[0]->data;
                foreach ($data as $object) {
                    $results[] = (array)$object;
                }
                foreach ($results as $result) {

                    $order = new Order();
                    $month = Carbon::parse($result['acquisition_date'])->format('F');
                    $year = Carbon::parse($result['acquisition_date'])->format('Y');
                    $result['acquisition_month'] = $month;
                    $result['acquisition_year'] = $year;
                    $result['trx_month'] = $month;
                    $result['billing_email'] = $result['email_address'];
                    $result['billing_telephone'] = $result['customers_telephone'];
                    $result['shipping_email'] = $result['email_address'];
                    $result['shipping_telephone'] = $result['customers_telephone'];
                    if(array_key_exists('employeeNotes', $result)){
                        $result['employeeNotes'] = serialize($result['employeeNotes']);
                    }
                    $result['utm_info'] = serialize($result['utm_info']);
                    if(array_key_exists('products', $result)){
                        $result['products'] = serialize($result['products']);
                    }
                    $result['systemNotes'] = serialize($result['systemNotes']);
                    $result['totals_breakdown'] = serialize($result['totals_breakdown']);
                    if(in_array($result['order_id'], $db_order_ids)){
                        $updated_orders++;
                        $order = Order::where(['order_id' => $result['order_id']])->first();
                        $order->update($result);
                    } else {
                        $new_orders++;
                        $order->create($result);
                    }
                }
                $data = null;
                $results = null;
            }
            return response()->json(['status' => true, 'New Record in todays API' => $new_orders, 'Previous orders to be updated in orders table' => $updated_orders]);
        }
    }
    public function pull_daily_order_find()
    {
        $new_orders = 0;
        $updated_orders = 0;
        $start = Carbon::today();
        // $end = Carbon::today()->endOfDay(); 
        $start_date = Carbon::now()->startOfDay()->format('m/d/Y');
        $end_date = Carbon::now()->endOfDay()->format('m/d/Y');
        // var_dump($end_date);die;

        $db_order_ids = Order::pluck('order_id')->toArray();

        $username = "yasir_dev";
        $password = "yyutmzvRpy5TPU";
        $url = 'https://thinkbrain.sticky.io/api/v1/order_find';
        $model = new Order();

        $api_data = json_decode(Http::asForm()->withBasicAuth($username, $password)->accept('application/json')->post(
            $url,
            [
                'start_date' => $start_date,
                'end_date' => $end_date,
                'campaign_id' => 'all',
                'criteria' => 'all',
                'return_type' => 'order_view'
            ]
        )->getBody()->getContents());

        $order_ids = $api_data->order_id;
        // dd($order_ids);
        if (count($order_ids) < 500) {
            $api_orders = $api_data->data;
            foreach ($api_orders as $key => $order) {
                $orders_arr[] = (array)$order;
            }
            foreach ($orders_arr as $result) {

                $order = new Order();
                // $month = Carbon::parse($result['acquisition_date'])->format('F');
                // $year = Carbon::parse($result['acquisition_date'])->format('Y');
                // $result['acquisition_month'] = $month;
                // $result['acquisition_year'] = $year;
                // $result['trx_month'] = $month;
                // $result['billing_email'] = $result['email_address'];
                // $result['billing_telephone'] = $result['customers_telephone'];
                // $result['shipping_email'] = $result['email_address'];
                // $result['shipping_telephone'] = $result['customers_telephone'];
                // if(array_key_exists('employeeNotes', $result)){
                //     $result['employeeNotes'] = serialize($result['employeeNotes']);
                // }
                // $result['utm_info'] = serialize($result['utm_info']);
                // $result['products'] = serialize($result['products']);
                // $result['systemNotes'] = serialize($result['systemNotes']);
                // $result['totals_breakdown'] = serialize($result['totals_breakdown']);
                if (in_array($result['order_id'], $db_order_ids)) {
                    $updated_orders++;
                    // $order = Order::where(['order_id'=>$result['order_id']])->first();
                    // $order->update($result);
                } else {
                    $new_orders++;
                    // $order->create($result);
                }
            }
            return response()->json(['status' => true, 'New Record API' => $new_orders, 'Previous orders to be updated in orders table' => $updated_orders]);
        } else if (count($order_ids) < 50000) {

            $chunked_array = array_chunk($order_ids, 500);
            // dd($chunked_array);
            foreach ($chunked_array as $chucked_ids) {
                $order_view_api = 'https://thinkbrain.sticky.io/api/v1/order_view';
                $data[] = json_decode(Http::asForm()->withBasicAuth($username, $password)->accept('application/json')
                    ->post($order_view_api, ['order_id' => $chucked_ids])->getBody()->getContents());

                    // dd($data);
                $data = (array)$data[0]->data;
                foreach ($data as $object) {
                    $results[] = (array)$object;
                }
                foreach ($results as $result) {

                    $order = new Order();
                    // $month = Carbon::parse($result['acquisition_date'])->format('F');
                    // $year = Carbon::parse($result['acquisition_date'])->format('Y');
                    // $result['acquisition_month'] = $month;
                    // $result['acquisition_year'] = $year;
                    // $result['trx_month'] = $month;
                    // $result['billing_email'] = $result['email_address'];
                    // $result['billing_telephone'] = $result['customers_telephone'];
                    // $result['shipping_email'] = $result['email_address'];
                    // $result['shipping_telephone'] = $result['customers_telephone'];
                    // if(array_key_exists('employeeNotes', $result)){
                    //     $result['employeeNotes'] = serialize($result['employeeNotes']);
                    // }
                    // $result['utm_info'] = serialize($result['utm_info']);
                    // $result['products'] = serialize($result['products']);
                    // $result['systemNotes'] = serialize($result['systemNotes']);
                    // $result['totals_breakdown'] = serialize($result['totals_breakdown']);
                    if (in_array($result['order_id'], $db_order_ids)) {
                        $updated_orders++;
                        // $order = Order::where(['order_id'=>$result['order_id']])->first();
                        // $order->update($result);
                    } else {
                        $new_orders++;
                        // $order->create($result);
                    }
                }
                $data = null;
                $results = null;
            }
            return response()->json(['status' => true, 'New Record in todays API' => $new_orders, 'Previous orders to be updated in orders table' => $updated_orders]);
        }
    }
    public function pull_yesterday_orders()
    {
        $new_orders = 0;
        $updated_orders = 0;
        $start = Carbon::yesterday();
        // $end = Carbon::today()->endOfDay(); 
        $start_date = $start->startOfDay()->format('m/d/Y');
        $end_date = $start->endOfDay()->format('m/d/Y');
        // var_dump($end_date);die;

        $db_order_ids = Order::pluck('order_id')->toArray();

        $username = "yasir_dev";
        $password = "yyutmzvRpy5TPU";
        $url = 'https://thinkbrain.sticky.io/api/v1/order_find';
        $model = new Order();

        $api_data = json_decode(Http::asForm()->withBasicAuth($username, $password)->accept('application/json')->post(
            $url,
            [
                'start_date' => $start_date,
                'end_date' => $end_date,
                'campaign_id' => 'all',
                'criteria' => 'all',
                'return_type' => 'order_view'
            ]
        )->getBody()->getContents());

        $order_ids = $api_data->order_id;
        // dd($order_ids);
        if (count($order_ids) < 500) {
            $api_orders = $api_data->data;
            foreach ($api_orders as $key => $order) {
                $orders_arr[] = (array)$order;
            }
            foreach ($orders_arr as $result) {

                $order = new Order();
                // $month = Carbon::parse($result['acquisition_date'])->format('F');
                // $year = Carbon::parse($result['acquisition_date'])->format('Y');
                // $result['acquisition_month'] = $month;
                // $result['acquisition_year'] = $year;
                // $result['trx_month'] = $month;
                // $result['billing_email'] = $result['email_address'];
                // $result['billing_telephone'] = $result['customers_telephone'];
                // $result['shipping_email'] = $result['email_address'];
                // $result['shipping_telephone'] = $result['customers_telephone'];
                // if(array_key_exists('employeeNotes', $result)){
                //     $result['employeeNotes'] = serialize($result['employeeNotes']);
                // }
                // $result['utm_info'] = serialize($result['utm_info']);
                // $result['products'] = serialize($result['products']);
                // $result['systemNotes'] = serialize($result['systemNotes']);
                // $result['totals_breakdown'] = serialize($result['totals_breakdown']);
                if (in_array($result['order_id'], $db_order_ids)) {
                    $updated_orders++;
                    // $order = Order::where(['order_id'=>$result['order_id']])->first();
                    // $order->update($result);
                } else {
                    $new_orders++;
                    // $order->create($result);
                }
            }
            return response()->json(['status' => true, 'New Record API' => $new_orders, 'Previous orders to be updated in orders table' => $updated_orders]);
        } else if (count($order_ids) < 50000) {

            $chunked_array = array_chunk($order_ids, 500);
            // dd($chunked_array);
            foreach ($chunked_array as $chucked_ids) {
                $order_view_api = 'https://thinkbrain.sticky.io/api/v1/order_view';
                $data[] = json_decode(Http::asForm()->withBasicAuth($username, $password)->accept('application/json')
                    ->post($order_view_api, ['order_id' => $chucked_ids])->getBody()->getContents());

                    // dd($data);
                $data = (array)$data[0]->data;
                foreach ($data as $object) {
                    $results[] = (array)$object;
                }
                foreach ($results as $result) {

                    $order = new Order();
                    // $month = Carbon::parse($result['acquisition_date'])->format('F');
                    // $year = Carbon::parse($result['acquisition_date'])->format('Y');
                    // $result['acquisition_month'] = $month;
                    // $result['acquisition_year'] = $year;
                    // $result['trx_month'] = $month;
                    // $result['billing_email'] = $result['email_address'];
                    // $result['billing_telephone'] = $result['customers_telephone'];
                    // $result['shipping_email'] = $result['email_address'];
                    // $result['shipping_telephone'] = $result['customers_telephone'];
                    // if(array_key_exists('employeeNotes', $result)){
                    //     $result['employeeNotes'] = serialize($result['employeeNotes']);
                    // }
                    // $result['utm_info'] = serialize($result['utm_info']);
                    // $result['products'] = serialize($result['products']);
                    // $result['systemNotes'] = serialize($result['systemNotes']);
                    // $result['totals_breakdown'] = serialize($result['totals_breakdown']);
                    if (in_array($result['order_id'], $db_order_ids)) {
                        $updated_orders++;
                        // $order = Order::where(['order_id'=>$result['order_id']])->first();
                        // $order->update($result);
                    } else {
                        $new_orders++;
                        // $order->create($result);
                    }
                }
                $data = null;
                $results = null;
            }
            return response()->json(['status' => true, 'New Record in todays API' => $new_orders, 'Previous orders to be updated in orders table' => $updated_orders]);
        }
    }
}