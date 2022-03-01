<?php

namespace App\Http\Controllers;

use App\Models\Prospect;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use DB;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class ProspectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $all_fields = $request->all_fields;
        $all_values = $request->all_values;

        $start_date = date('Y-m-d', strtotime($request->start_date));
        $end_date = date('Y-m-d', strtotime($request->end_date));
        // $currency = $request->currency; no field in database
        $pageno = isset($request->pageno) ? $request->pageno : 0;
        $no_of_records_per_page = isset($request->per_page) ? $request->per_page : 10;
        $offset = ($pageno) * $no_of_records_per_page;
        
            // query prospects sir basit
        // $query = DB::table('prospects')
        //     ->select('id', 'prospect_id', 'created_by_employee_name', 'billing_first_name', 'billing_last_name', 'billing_street_address', 'prospect_total', 'acquisition_month', 'acquisition_year', 'c1', 'affid', 'trx_month', 'prospect_sales_tax_amount', 'decline_reason', 'is_cascaded', 'decline_reason_details', 'is_fraud', 'is_chargeback', 'chargeback_date', 'is_rma', 'rma_number', 'rma_reason', 'is_recurring', 'is_void', 'void_amount', 'void_date', 'is_refund', 'refund_amount', 'refund_date', 'prospect_confirmed', 'prospect_confirmed_date', 'acquisition_date', 'is_blacklisted', 'coupon_id', 'created_by_user_name', 'prospect_sales_tax', 'prospect_status', 'promo_code', 'recurring_date', 'response_code', 'return_reason');

        $query = DB::table('prospects')->whereNull('deleted_at')->orderBy('id', 'desc');
        // $query = Prospect::SimplePaginate($no_of_records_per_page);
        $total_rows = Prospect::where('id', '>', 0)->count();
        // if ($start_date != null && $start_date != "1970-01-01" && $end_date != null && $end_date != "1970-01-01") {
        //     $query->whereBetween('acquisition_date', [$start_date . ' 00:00:00', $end_date . ' 23:59:59']);
        // }

        if ($request->fields != null) {
            $field_array = explode(',', $request->fields);
            $value_array = explode(',', $request->values);
            for ($i = 0; $i < count($value_array); $i++) {
                if ($value_array[$i] != '' && $field_array[$i] != 'products') {
                    $query->where($field_array[$i], $value_array[$i]);
                }
                // if ($field_array[$i] == 'products') {
                //     $query->where('products', 'like', '%' . $value_array[$i] . '%');
                // }
            }
        }
            /* 
                
         */
        $rows = $query->SimplePaginate($no_of_records_per_page);
        $total_pages = ceil($total_rows / $rows->perPage());
    
            // $rows = $query->offset($offset)->limit($no_of_records_per_page)->get();
            // $total_pages = ceil($total_rows / $no_of_records_per_page);
        $pag['count'] = $total_rows;
        $pag['total_pages'] = $total_pages;
        $pag['pageno'] = $pageno;
        $pag['rows_per_page'] = $no_of_records_per_page;
            /* 
                !for testing only one record  
                $rows = Prospect::where(['prospect_id'=>10021])->get();
                $pag = null;
         */
        return response()->json(['status' => true, 'data' => $rows, 'pag' => $pag]);

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
     * @param  \App\Models\Prospect  $prospect
     * @return \Illuminate\Http\Response
     */
    public function show(Prospect $prospect)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Prospect  $prospect
     * @return \Illuminate\Http\Response
     */
    public function edit(Prospect $prospect)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Prospect  $prospect
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Prospect $prospect)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Prospect  $prospect
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $prospect = Prospect::find($id);
        if ($prospect) {
            $prospect->delete();
            return response()->json(['status' => true, 'message' => 'Prospect Deleted Successfully']);
        } else {
            return response()->json(['status' => false, 'message' => "Opps!! Prospect Could not be deleted"]);
        }
    }
    public function pull_prospects_dec()
    {

        $new_prospects = 0;
        $updated_prospects = 0;
        $db_prospect_ids = Prospect::pluck('prospect_id')->toArray();
        // $db_prospect_ids = DB::table('prospects')->pluck('prospect_id')->toArray();

        $username = "yasir_dev";
        $password = "yyutmzvRpy5TPU";
        $url = 'https://thinkbrain.sticky.io/api/v1/prospect_find';
        $model = new Prospect();

        $startDate = Carbon::createFromFormat('Y-m-d', '2021-12-01');
        $endDate = Carbon::createFromFormat('Y-m-d', '2021-12-31');
        $dateRange = CarbonPeriod::create($startDate, $endDate);
        $dateRange->toArray();

        foreach ($dateRange as $day) {
            $monthDays[] = Carbon::parse($day)->format('m/d/Y');
        }

        foreach ($monthDays as $day) {

            $api_data = json_decode(Http::asForm()->withBasicAuth($username, $password)->accept('application/json')->post(
                $url,
                [
                    'start_date' => $day,
                    'end_date' => $day,
                    'campaign_id' => 'all',
                    'criteria' => 'all',
                    'search_type' => 'all',
                    'return_type' => 'prospect_view'
                ]
            )->getBody()->getContents());
            if ($api_data->response_code == 602) {
                continue;
            }

            $prospect_ids = $api_data->prospect_id;
            $data = $api_data->data;
            $total_prospects = $api_data->total_prospects;

            foreach ($data as $object) {
                $results[] = (array)$object;
            }
            if (isset($total_prospects) && $total_prospects != 0 && $total_prospects <= 10000) {
                foreach ($results as $result) {

                    $prospect = new Prospect();
                    // $result['prospect_id'] = $result['id'];
                    $month = Carbon::parse($result['date_created'])->format('F');
                    $year = Carbon::parse($result['date_created'])->format('Y');
                    $result['month_created'] = $month;
                    $result['year_created'] = $year;
                    $result['notes'] = json_encode($result['notes']);

                    if (in_array($result['prospect_id'], $db_prospect_ids)) {
                        $updated_prospects++;
                        $prospect = Prospect::where(['prospect_id' => $result['prospect_id']])->first();
                        $prospect->update($result);
                    } else {
                        $new_prospects++;
                        $prospect->create($result);
                    }
                }
                $results = null;
                $data = null;
            } else {
                //this part is not updates yet
                $api_data = json_decode(Http::asForm()->withBasicAuth($username, $password)->accept('application/json')->post(
                    $url,
                    [
                        'start_date' => $day,
                        'end_date' => $day,
                        'campaign_id' => 'all',
                        'criteria' => 'all',
                        'search_type' => 'all',
                        'return_type' => 'prospect_view'
                    ]
                )->getBody()->getContents());
                if ($api_data->response_code == 602) {
                    continue;
                }

                $prospect_ids = $api_data->prospect_id;
                $data = $api_data->data;
                $total_prospects = $api_data->total_prospects;

                foreach ($data as $object) {
                    $results[] = (array)$object;
                }
                if (isset($total_prospects) && $total_prospects != 0 && $total_prospects <= 10000) {
                    foreach ($results as $result) {

                        $prospect = new Prospect();
                        // $result['prospect_id'] = $result['id'];
                        $month = Carbon::parse($result['date_created'])->format('F');
                        $year = Carbon::parse($result['date_created'])->format('Y');
                        $result['month_created'] = $month;
                        $result['year_created'] = $year;
                        $result['notes'] = json_encode($result['notes']);

                        if (in_array($result['prospect_id'], $db_prospect_ids)) {
                            $updated_prospects++;
                            $prospect = Prospect::where(['prospect_id' => $result['prospect_id']])->first();
                            $prospect->update($result);
                        } else {
                            $new_prospects++;
                            $prospect->create($result);
                        }
                    }
                    $results = null;
                    $data = null;
                // return response()->json(['status' => false, 'message' => "data too large to be handled", 'Day' => $day]);
                }
            }
        }
        return response()->json(['status' => true, 'New Record in todays API' => $new_prospects, 'Previous prospects to be updated in prospects table' => $updated_prospects]);
    }
    public function pull_prospects()
    {
        $new_prospects = 0;
        $updated_prospects = 0;
        // $db_prospect_ids = DB::table('prospects')->pluck('prospect_id')->toArray();

        $username = "yasir_dev";
        $password = "yyutmzvRpy5TPU";
        $url = 'https://thinkbrain.sticky.io/api/v1/prospect_find';
        $model = new Prospect();

        $startDate = Carbon::createFromFormat('Y-m-d', '2022-02-04');
        $endDate = Carbon::createFromFormat('Y-m-d', '2022-02-28');
        $dateRange = CarbonPeriod::create($startDate, $endDate);
        $dateRange->toArray();

        foreach ($dateRange as $day) {
            $monthDays[] = Carbon::parse($day)->format('m/d/Y');
        }

        foreach ($monthDays as $day) {

            $api_data = json_decode(Http::asForm()->withBasicAuth($username, $password)->accept('application/json')->post(
                $url,
                [
                    'start_date' => $day,
                    'end_date' => $day,
                    'campaign_id' => 'all',
                    'criteria' => 'all',
                    'search_type' => 'all',
                    'return_type' => 'prospect_view'
                ]
            )->getBody()->getContents());
            if ($api_data->response_code == 602) {
                continue;
            }

            $prospect_ids = $api_data->prospect_id;
            $data = $api_data->data;
            $total_prospects = $api_data->total_prospects;

            foreach ($data as $object) {
                $results[] = (array)$object;
            }
            if (isset($total_prospects) && $total_prospects != 0 && $total_prospects <= 10000) {
                $response = $this->save_prospects($results);
                $new_prospects += $response['new_prospects'];
                $updated_prospects += $response['updated_prospects'];
                $results = null;
                $data = null;
            } else {
                $results = $this->get_prospect_with_time($username, $password, $url, $day);
                $response = $this->save_prospects($results);
                $new_prospects += $response['new_prospects'];
                $updated_prospects += $response['updated_prospects'];
                $results = null;
                $data = null;
            }
        }
        return response()->json(['status' => true, 'New Record in todays API' => $new_prospects, 'Previous prospects to be updated in prospects table' => $updated_prospects]);
    }
    public function get_prospect_with_time($username, $password, $url, $day)
    {
        $api_data = json_decode(Http::asForm()->withBasicAuth($username, $password)->accept('application/json')->post(
            $url,
            [
                'start_date' => $day,
                'end_date' => $day,
                'campaign_id' => 'all',
                'criteria' => 'all',
                'start_time' => '00:00:00',
                'end_time' => '12:00:00',
                'search_type' => 'all',
                'return_type' => 'prospect_view'
            ]
        )->getBody()->getContents());

        $prospect_ids = $api_data->prospect_id;
        $data = $api_data->data;
        $total_prospects = $api_data->total_prospects;
        foreach ($data as $object) {
            $results[] = (array)$object;
        }

        $api_data = json_decode(Http::asForm()->withBasicAuth($username, $password)->accept('application/json')->post(
            $url,
            [
                'start_date' => $day,
                'end_date' => $day,
                'campaign_id' => 'all',
                'criteria' => 'all',
                'start_time' => '12:00:01',
                'end_time' => '23:59:59',
                'search_type' => 'all',
                'return_type' => 'prospect_view'
            ]
        )->getBody()->getContents());
        $prospect_ids = $api_data->prospect_id;
        $data = $api_data->data;
        $total_prospects = $api_data->total_prospects;
        foreach ($data as $object) {
            $results[] = (array)$object;
        }
        // dd($results);
        return $results;
    }
    public function save_prospects($results)
    {
        $updated_prospects = 0;
        $new_prospects = 0;
        $db_prospect_ids = Prospect::pluck('prospect_id')->toArray();

        foreach ($results as $result) {

            $prospect = new Prospect();
            $month = Carbon::parse($result['date_created'])->format('F');
            $year = Carbon::parse($result['date_created'])->format('Y');
            $result['month_created'] = $month;
            $result['year_created'] = $year;
            $result['notes'] = json_encode($result['notes']);

            if (in_array($result['prospect_id'], $db_prospect_ids)) {
                $updated_prospects++;
                $prospect = Prospect::where(['prospect_id' => $result['prospect_id']])->first();
                $prospect->update($result);
            } else {
                $new_prospects++;
                $prospect->create($result);
            }
        }
        $response['new_prospects'] = $new_prospects;
        $response['updated_prospects'] = $updated_prospects;
        return $response;
    }
}

