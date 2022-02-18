<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GoldenTicket;
use App\Models\Formula;
use App\Models\Order;
use Illuminate\Support\Str;
use Carbon\Carbon;

class GoldenTicketController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // dd(Carbon::now()->format('Y')-1);
        /* 
            !important 
            $golden_tickets = GoldenTicket::where(['year'=>Carbon::now()->format('Y')-1])->get();
        */
        /*
            !filtration  
         */
        if($request->month && $request->year){
            if($request->month != "null" && $request->year != "null" ){
                $golden_tickets = GoldenTicket::where(['month'=>$request->month, 'year'=>$request->year])->get();
            }
            else if($request->month != "null" ){
                $golden_tickets = GoldenTicket::where(['month'=>$request->month])->get();
                }
            else if($request->year != "null" ){
                $golden_tickets = GoldenTicket::where(['year'=>$request->year])->get();
            }
        }
        else{ $golden_tickets = GoldenTicket::all(); }
        
        $formulas = Formula::all();
        foreach($formulas as $key=>$formula){
            $formula->operands = unserialize($formula->operands);
            $formula->operators = unserialize($formula->operators);
            if($formula->campaign_name == "Golden Ticket Main"){
                $columns[$key]['column_name'] = $formula->column_name;
                $columns[$key]['expression'] = $formula->expression;
            }
        }
        foreach($golden_tickets as $t_key=>$ticket){
            $initials = 0;
            $rebills = 0;
            $cycle_2 = 0;
            $cycle_3_plus = 0;
            $cycle_1_per = 0;
            $cycle_2_per = 0;
            $cycle_3_plus_per = 0;
            $revenue = 0;
            $avg_ticket = 0;
            $refund = 0;
            $refund_rate = 0;
            $CBs = 0;
            $CB_per = 0;
            $fulfillment = 0;
            $processing = 0;
            $cpa = 0;
            $cpa_avg = 0;
            $net = 0;
            $clv = 0;

            $orders = Order::where(['acquisition_month'=>$ticket->month, 'acquisition_year'=>$ticket->year, 'prepaid_match'=>'NO', 'is_test_cc'=>0])->get();
            foreach($orders as $order){
                $order->products = unserialize($order->products);
                $order->totals_breakdown = unserialize($order->totals_breakdown);
                /*
                    !Calculation of initials, rebills, cycle_2, cycle_3 plus in golden ticket with order-status == "Declined"
                 */
                if(Str::contains($order->products[0]->name, ['(c)']) && $order->products[0]->offer->name == 'Golden Ticket Offer' && $order->order_status== 7){
                    $initials++;
                } 
                if(Str::contains($order->products[0]->name, ['(CR1)']) && $order->products[0]->offer->name == 'Golden Ticket Offer' && $order->order_status== 7){
                    $rebills++;
                }
                if(Str::contains($order->products[0]->name, ['(CR2)']) && $order->products[0]->offer->name == 'Golden Ticket Offer' && $order->order_status== 7){
                    $cycle_2++;
                }
                if(Str::contains($order->products[0]->name, ['(CR+)']) && $order->products[0]->offer->name == 'Golden Ticket Offer' && $order->order_status== 7){
                    $cycle_3_plus++;
                }
                if($order->is_chargeback == 1 && $order->products[0]->offer->name == 'Golden Ticket Offer' && $order->order_status== 7){
                    $CBs++;
                }
                /*
                    !Calculation of Revenue 
                */
                if($order->order_total != null ){
                    $revenue += $order->order_total;
                    /* 
                        !calculation of refund with order-status == "void/refunded"
                    */
                    if($order->products[0]->offer->name == 'Golden Ticket Offer' && $order->order_status == 6){
                        $refund += $order->order_total;
                    }
                }
            }
            $net = $revenue + $refund + $CBs + $fulfillment + $processing + $cpa;

            if($initials != 0){
                $cycle_1_per = $rebills/$initials;
                $avg_ticket = $revenue/$initials;
                $fulfillment =  -$initials;
                $clv = $net/$initials;
            }
            if($rebills != 0){
                $cycle_2_per = $cycle_2/$rebills;
            }
            if($cycle_2 !=0){
                $cycle_3_plus_per = $cycle_3_plus/$cycle_2;
            }
            if($revenue != 0){
                $refund_rate = $refund/$revenue;
                $CB_per = $CBs/$revenue;
                $processing = -0.2*$revenue;
            }
            // if()

            $ticket->initials = $initials;
            $ticket->rebills = $rebills;
            $ticket->cycle_2 = $cycle_2;
            $ticket->cycle_3_plus = $cycle_3_plus;
            $ticket->cycle_1_per = $cycle_1_per;
            $ticket->cycle_2_per = $cycle_2_per;
            $ticket->cycle_3_plus_per = $cycle_3_plus_per;
            $ticket->revenue = $revenue;
            $ticket->avg_ticket = $avg_ticket;
            $ticket->refund = (($refund > 0) ? -$refund : $refund);
            $ticket->refund_rate = $refund_rate;
            $ticket->CBs = (($CBs > 0) ? -$CBs : $CBs);
            $ticket->CB_per = $CB_per;
            $ticket->fulfillment = $fulfillment;
            $ticket->processing = $processing;
            $ticket->processing = $processing;
            // $ticket->cpa = ??
            // $ticket->cpa_avg = ??
            $ticket->net = $net;
            $ticket->clv = $clv;
            $ticket->save();
        }
        // dd('die');
        return response()->json(['status'=>true, 'data'=>$golden_tickets]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        if($request->month && $request->year){
            $golden_ticket = GoldenTicket::where(['month'=>$request->month, 'year'=>$request->year])->first();
            if($golden_ticket){
                return response()->json(['status'=>false, 'message'=>"Current Month is already added"], 200);
            }
            else{
                $model = new GoldenTicket();
                $model->month = $request->month;
                $model->year = $request->year;
                $model->save();
                return response()->json(['status'=>true, 'message'=>'Current Month added successfully'], 500);
            }
        }
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
