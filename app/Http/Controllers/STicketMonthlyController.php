<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\STicketMonthly;
use App\Models\Order;
use Illuminate\Support\Str;
use DB;
use Carbon\Carbon;

class STicketMonthlyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $data = DB::table('orders')->select(DB::raw('count(*)'))->take(10)->get();
        
        // dd($data);
        // $data = Order::take(10)->get();
        // dd($data);
        // DB::table('sticket_monthly')->truncate();
        // dd('die');
        // $data = STicketMonthly::orderBy('id', 'desc')->get();
        // return response()->json(['status' => true, 'data' => $data]);

        /* 
            !implementation of the formulas in the whole database
         */
        $db_months = STicketMonthly::pluck('month')->toArray();
        $data = STicketMonthly::all();
        // dd($data);
        $date_today = Carbon::now()->format('Y-m-d');
        $current_month = Carbon::now()->format('F');
        $current_year = Carbon::now()->format('Y');
        // dd($current_year);

        // $end_of_this_week = Carbon::now()->endOfWeek()->format('Y-m-d');

         /* 
             ?previous two month records insert query 
         */
        for ($i = 3; $i > 0; $i--) {
            $model = new STicketMonthly();
            $previous_month_date = Carbon::now()->subMonths($i)->format('Y-m-d');
            $previous_month = Carbon::parse($previous_month_date)->format('F');
            $previous_year = Carbon::parse($previous_month_date)->format('Y');
            if (in_array($previous_month, $db_months) == false) {
                $model->month = $previous_month;
                $model->year = $previous_year;
                $model->save();
            }
        }
        $latest = STicketMonthly::orderBy('id', 'desc')->first();
        // dd($latest);
        if (isset($latest)) {
            if ($latest->month != $current_month) {
                $model = new STicketMonthly();
                $model->month = $current_month;
                $model->year = $current_year;
                $model->save();
            }
        }
        // dd('die');
        /* 
            ?implementation of the formulas
         */
       
        foreach ($data as $t_key => $ticket) {

            $initials = 0;
            $initial_condition_1 = 0;
            $rebill_condition1 = 0;
            $rebill_condition2 = 0;
            $rebill_per_condition2 = 0;
            $rebills = 0;
            $cycle_1_per = 0;
            $avg_day_per = 0;
            $filled_per = 0;
            $avg_ticket = 0;
            $revenue = 0;
            $refund = 0;
            $refund_rate = 0;
            $CBs = 0;
            $CB_per = 0;
            $CB_currency = 0;
            $fulfillment = 0;
            $processing = 0;
            $cpa = 0;
            $cpa_avg = 0;
            $net = 0;
            $clv = 0;

            // var_dump($ticket->month);
            $start_of_month = $ticket->year . '-' . $ticket->month . '-01';
            Order::where(['prepaid_match' => 'NO', 'is_test_cc' => 0, 'order_status' => 7])->whereDate('acquisition_date', '>=', '2021-07-01 00:00:00')->chunk(1000, function ($orders) {
            // dd($orders);
                foreach ($orders as $key => $order) {
                    dd($initials);
                    // dd($order);
                    $order->products = unserialize($order->products);
                    $order->totals_breakdown = unserialize($order->totals_breakdown);
                    // dd('die');
                    \Log::info($key);
                    if (Str::contains($order->products[0]->name, ['(I)']) && $order->products[0]->offer->name == 'Gizmo') {
                        $initial_condition_1++;
                    }
                }
            });

            $orders = Order::where(['prepaid_match' => 'NO', 'is_test_cc' => 0])->whereDate('acquisition_date', '>=', $start_of_month)->count();

            chunk(100, function ($orders) {
                foreach ($orders as $order) {
                    $order->products = unserialize($order->products);
                    $order->totals_breakdown = unserialize($order->totals_breakdown);
                    /*
                        !Calculation of initials, rebills, cycle_2, cycle_3 plus in golden ticket with order-status == "Declined"
                     */
                    if ((Str::contains($order->products[0]->name, ['(C)']) || Str::contains($order->products[0]->name, ['(I)'])) && $order->products[0]->offer->name == 'Gizmo' && $order->order_status == 7) {
                        $initials++;
                    }
                    if (Str::contains($order->products[0]->name, ['(R']) && $order->products[0]->offer->name == 'Gizmo' && $order->order_status == 7) {
                        $rebill_condition1++;
                    }
                    if (Str::contains($order->products[0]->name, ['(C1)']) && $order->products[0]->offer->name == 'Gizmo' && $order->order_status == 7) {
                        $rebill_condition2++;
                    }
                    if (Str::contains($order->products[0]->name, ['(I']) && $order->products[0]->offer->name == 'Gizmo' && $order->order_status == 7) {
                        $rebill_per_condition2++;
                    }
                    if ($order->is_chargeback == 1 && $order->products[0]->offer->name == 'Gizmo' && $order->order_status == 7) {
                        $CBs++;
                    }
                    // if(Str::contains($order->products[0]->name, ['(CR2)']) && $order->products[0]->offer->name == 'Golden Ticket Offer' && $order->order_status== 7){
                    //     $cycle_2++;
                    // }
                    // if(Str::contains($order->products[0]->name, ['(CR+)']) && $order->products[0]->offer->name == 'Golden Ticket Offer' && $order->order_status== 7){
                    //     $cycle_3_plus++;
                    // }
                    // if($order->is_chargeback == 1 && $order->products[0]->offer->name == 'Golden Ticket Offer' && $order->order_status== 7){
                    //     $CBs++;
                    /*
                        !Calculation of Revenue
                     */
                    if ($order->order_total != null && isset($order->products[0]->offer) && $order->products[0]->offer->name == 'Gizmo') {
                        if ($order->order_status == 7) {
                            $revenue += $order->order_total;
                        }
                        if ($order->order_status == 6) {
                        /* 
                            !calculation of refund with order-status == "void/refunded"
                             */
                            $refund += $order->order_total;
                        }
                    }
                }

            });
            $net = $revenue + $refund + $CBs + $fulfillment + $processing + $cpa;
            if ($rebill_condition2 != 0) {
                $rebills = $rebill_condition1 + $rebill_condition2;
                $rebill_per = $rebill_condition1 / $rebill_per_condition2;
            }
            if ($volume != 0) {
                $avg_ticket = $revenue / $volume;
                $clv = $net / $volume;
            }
            if ($revenue != 0) {
                $refund_rate = $refund / $revenue;
                $CB_per = $CBs / $revenue;
                $processing = -0.2 * $revenue;
            }
            // if()

            $ticket->volume = $volume;
            $ticket->rebills = $rebills;
            $ticket->rebill_per = $rebill_per;
            $ticket->avg_day = $avg_day;
            $ticket->filled_per = $filled_per;
            $ticket->avg_ticket = $avg_ticket;
            $ticket->revenue = $revenue;
            $ticket->refund = (($refund > 0) ? -$refund : $refund);
            $ticket->refund_rate = $refund_rate;
            $ticket->CBs = $CBs;
            $ticket->CB_per = $CB_per;
            $ticket->fulfillment = $fulfillment;
            $ticket->processing = $processing;
            // $ticket->cpa = ??
            // $ticket->cpa_avg = ??
            $ticket->net = $net;
            $ticket->clv = $clv;
            $ticket->save();
        }
        // die;
        $data = STicketMonthly::orderBy('id', 'desc')->take(10)->get();
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
}
