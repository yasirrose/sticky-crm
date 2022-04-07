<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\TicketDaily;
use Illuminate\Support\Str;
use DB;
use Carbon\Carbon;

class TicketDailyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // DB::table('sticket_daily')->truncate();
        // return ;
        $db_dates = TicketDaily::pluck('date')->toArray();
        $date_today = Carbon::now()->format('Y-m-d');

        
            // ?previous two month records insert query 
        for ($i = 127; $i > 0; $i--) {
            $model = new TicketDaily();
            $date_of_the_day = Carbon::now()->subDays($i)->format('Y-m-d');
            if (in_array($date_of_the_day, $db_dates) == false) {
                $model->date = Carbon::now()->subDays($i)->format('Y-m-d');
                $model->save();
            }
        }
        return;

        /* 
            ?check entry inserted for today 
         */
        $last = TicketDaily::latest()->first();
        if (isset($last)) {
            if ($last->date != $date_today) {
                $today = new TicketDaily();
                $today->date = Carbon::now();
                $today->save();
            }
        }

        $latest = TicketDaily::latest()->first();
        /* 
            ?formula implementation on the date today entry
         */
        $initials = 0;
        $decline = 0;
        $decline_per = 0;
        $scrub_per = 0;
        $EOT_declines = 0;
        $EOT_approved = 0;
        $EOT_per = 0;

        // $decline = Order::where(['prepaid_match' => 'NO', 'is_test_cc' => 0, 'order_status' => 7])->whereDate('time_stamp', '=', $latest->date)->count();
        $decline = Order::where(['order_status' => 7])->whereDate('time_stamp', '=', $latest->date)->count();
        $orders = Order::where(['prepaid_match' => 'NO', 'is_test_cc' => 0])->whereDate('time_stamp', '=', $latest->date)->get();
        // dd($orders);
        foreach ($orders as $order) {
            // $order->products = unserialize($order->products);
            // $order->totals_breakdown = unserialize($order->totals_breakdown);
            /*
                !Calculation of initials, EOT_approved in campaigns with order-status == "Declined"
             */
            if (Str::contains($order->products[0]->name, ['(c)']) && $order->products[0]->offer->name == 'Golden Ticket Offer' && $order->order_status == 7) {
                $initials++;
            }
            if (Str::contains($order->products[0]->name, ['(CR1)']) && $order->products[0]->offer->name == 'EssentialSweep' && $order->order_status == 7) {
                $EOT_approved++;
            }
            /* 
                !comments for remaining formulas in future that are missing
             */
            // if(Str::contains($order->products[0]->name, ['(CR2)']) && $order->products[0]->offer->name == 'Golden Ticket Offer' && $order->order_status== 7){
            //     $cycle_2++;
            // }
            // if(Str::contains($order->products[0]->name, ['(CR+)']) && $order->products[0]->offer->name == 'Golden Ticket Offer' && $order->order_status== 7){
            //     $cycle_3_plus++;
            // }
            // if($order->is_chargeback == 1 && $order->products[0]->offer->name == 'Golden Ticket Offer' && $order->order_status== 7){
            //     $CBs++;
            // }

        }

        if ($initials != 0) {
            $decline_per = $decline / ($initials + $decline);
            $EOT_per = $EOT_approved / $initials;
        }

        $latest->initials = $initials;
        $latest->decline = $decline;
        $latest->decline_per = $decline_per;
        $latest->scrub_per = $scrub_per;
        $latest->EOT_declines = $EOT_declines;
        $latest->EOT_approved = $EOT_approved;
        $latest->EOT_per = $EOT_per;
        $latest->save();

        $data = TicketDaily::orderBy('id', 'desc')->take(10)->get();
        return response()->json(['status' => true, 'data' => $data]);
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    public function refresh_daily()
    {
        return response()->json(['status' => true, 'data' => []]);


        $db_dates = TicketDaily::pluck('date')->toArray();
        $date_today = Carbon::now()->format('Y-m-d');
        /* 
            ?check entry inserted for today 
        
        $last = TicketDaily::latest()->first();
        if (isset($last)) {
            if ($last->date != $date_today) {
                $today = new TicketDaily();
                $today->date = Carbon::now();
                $today->save();
            }
        } */

        $latest = TicketDaily::latest()->first();
        /* 
            ?formula implementation on the date today entry
         */
        $initials = 0;
        $decline = 0;
        $decline_per = 0;
        $scrub_per = 0;
        $EOT_declines = 0;
        $EOT_approved = 0;
        $EOT_per = 0;

        $decline = Order::where(['time_stamp', '=', $latest->date, 'order_status' => 7])->count();
        $orders = Order::where(['time_stamp', '=', $latest->date, 'order_status' => 2])->with('products')->get();
        // dd($decline);
        foreach ($orders as $order) {
            $order->products = unserialize($order->products);
            $order->totals_breakdown = unserialize($order->totals_breakdown);
            /*
                !Calculation of initials, EOT_approved in campaigns with order-status == "Declined"
             */
            if (Str::contains($order->products[0]->name, ['(c)']) && $order->products[0]->offer->name == 'Golden Ticket Offer' && $order->order_status == 7) {
                $initials++;
            }
            if (Str::contains($order->products[0]->name, ['(CR1)']) && $order->products[0]->offer->name == 'EssentialSweep' && $order->order_status == 7) {
                $EOT_approved++;
            }
            /* 
                !comments for remaining formulas in future that are missing
             */
            // if(Str::contains($order->products[0]->name, ['(CR2)']) && $order->products[0]->offer->name == 'Golden Ticket Offer' && $order->order_status== 7){
            //     $cycle_2++;
            // }
            // if(Str::contains($order->products[0]->name, ['(CR+)']) && $order->products[0]->offer->name == 'Golden Ticket Offer' && $order->order_status== 7){
            //     $cycle_3_plus++;
            // }
            // if($order->is_chargeback == 1 && $order->products[0]->offer->name == 'Golden Ticket Offer' && $order->order_status== 7){
            //     $CBs++;
            // }

        }

        if ($initials != 0) {
            $decline_per = $decline / ($initials + $decline);
            $EOT_per = $EOT_approved / $initials;
        }

        $latest->initials = $initials;
        $latest->decline = $decline;
        $latest->decline_per = $decline_per;
        $latest->scrub_per = $scrub_per;
        $latest->EOT_declines = $EOT_declines;
        $latest->EOT_approved = $EOT_approved;
        $latest->EOT_per = $EOT_per;
        $latest->save();

        $data = TicketDaily::orderBy('id', 'desc')->take(10)->get();
        return response()->json(['status' => true, 'data' => $data]);
    }
    public function refresh_all_daily_tickets()
    {
        $db_dates = TicketDaily::pluck('date')->toArray();
        $date_today = Carbon::now()->format('Y-m-d');
        /* 
            ?check entry inserted for today 
         */
        $last = TicketDaily::latest()->first();
        if (isset($last)) {
            if ($last->date != $date_today) {
                $today = new TicketDaily();
                $today->date = Carbon::now();
                $today->save();
            }
        }

        $data = TicketDaily::orderBy('id', 'desc')->get();
        // dd($data);
        /* 
            ?formula implementation on the date today entry
         */

        foreach ($data as $day) {
            // dd($day);
            $initials = 0;
            $decline = 0;
            $decline_per = 0;
            $scrub_per = 0;
            $EOT_declines = 0;
            $EOT_approved = 0;
            $EOT_per = 0;
            // $start_day = '2022-01-04 00:00:00';
            // $end_day = '2022-01-04 23:59:59';
            // $start_day = Carbon::parse('2022-01-05')->startOfDay();
            // $end_day = Carbon::parse('2022-01-05')->endOfDay();
            $start_day = Carbon::parse($day->date)->startOfDay();
            $end_day = Carbon::parse($day->date)->endOfDay();
            // dd($end_day);
            $decline = Order::where(['prepaid_match' => 'No', 'is_test_cc' => 0, 'order_status' => 2, 'campaign_id' => 2])
                ->where('time_stamp', '>=', $start_day)
                ->where('time_stamp', '<=', $end_day)
                ->pluck('order_id')->toArray();
            // dd($decline);

            $orders = DB::table('orders')->where(['orders.prepaid_match' => 'No', 'orders.is_test_cc' => 0, 'orders.order_status' => 2, 'orders.campaign_id' => 2])
                ->where('orders.time_stamp', '>=', $start_day)
                ->where('orders.time_stamp', '<=', $end_day)
                ->select('orders.order_id', 'orders.time_stamp', 'orders.acquisition_month', 'orders.acquisition_year');

            // dd($orders->get());

            $join = $orders->join('order_products', 'orders.order_id', 'order_products.order_id')
                ->select('order_products.*')
                ->groupBy('orders.order_id');

            $decline = $orders->get()->count();
            // dd($decline);
            $initials = $join->where(['order_products.offer_name' => 'Golden Ticket Offer'])->where('order_products.name', 'LIKE', '%(c)%')->get()->count();
            // dd($initials);
            $EOT_approved = $join->where(['order_products.offer_name' => 'EssentialSweep'])->where('order_products.name', 'LIKE', '%(CR1)%')->get()->count();
            // $orders = Order::where(['prepaid_match' => 'NO', 'is_test_cc' => 0])->whereDate('time_stamp', '=', $day->date)->get();
            if ($initials != 0) {
                $decline_per = $decline / ($initials + $decline);
                $EOT_per = $EOT_approved / $initials;
            }

            $day->initials = $initials;
            $day->decline = $decline;
            $day->decline_per = $decline_per;
            $day->scrub_per = $scrub_per;
            $day->EOT_declines = $EOT_declines;
            $day->EOT_approved = $EOT_approved;
            $day->EOT_per = $EOT_per;
            $day->save();
        }
        //  dd($day);
        $data = TicketDaily::orderBy('id', 'desc')->take(10)->get();
        return response()->json(['status' => true, 'data' => $data]);
    }
}
