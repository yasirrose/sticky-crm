<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\STicketDaily;
use Illuminate\Support\Str;
use DB;
use Carbon\Carbon;

class STicketDailyController extends Controller
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
        $db_dates = STicketDaily::pluck('date')->toArray();
        $date_today = Carbon::now()->format('Y-m-d');

        /* 
            ?previous two month records insert query 
            for ($i = 77; $i > 0; $i--) {
                $model = new STicketDaily();
                $date_of_the_day = Carbon::now()->subDays($i)->format('Y-m-d');
                if (in_array($date_of_the_day, $db_dates) == false) {
                    $model->date = Carbon::now()->subDays($i)->format('Y-m-d');
                    $model->save();
                }
            }
        */

        /* 
            ?check entry inserted for today 
        */
        $last = STicketDaily::latest()->first();
        if (isset($last)) {
            if ($last->date != $date_today) {
                $today = new STicketDaily();
                $today->date = Carbon::now();
                $today->save();
            }
        }

        $latest = STicketDaily::latest()->first();
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

        $orders = Order::where(['prepaid_match' => 'NO', 'is_test_cc' => 0])->whereDate('acquisition_date', '=', $latest->date)->get();
        // dd($orders);
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
            $decline_per = $decline / $initials + $decline;
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

        $data = STicketDaily::orderBy('id', 'desc')->take(10)->get();
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
