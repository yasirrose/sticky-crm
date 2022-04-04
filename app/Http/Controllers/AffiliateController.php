<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use App\Models\Affiliate;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class AffiliateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Affiliate::all();
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
     * @param  \App\Models\Affiliate  $affiliate
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $affiliate = Affiliate::where(['network_affiliate_id' => $id])->first();
        return response()->json(['status' => true, 'data' => $affiliate]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Affiliate  $affiliate
     * @return \Illuminate\Http\Response
     */
    public function edit(Affiliate $affiliate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Affiliate  $affiliate
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Affiliate $affiliate)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Affiliate  $affiliate
     * @return \Illuminate\Http\Response
     */
    public function destroy(Affiliate $affiliate)
    {
        //
    }
    public function pull_affiliates()
    {
        $new_affiliates = 0;
        $updated_affiliates = 0;
        $db_network_affiliate_ids = Affiliate::all()->pluck('network_affiliate_id')->toArray();
        $key = "X-Eflow-API-Key";
        $value = "nH43mlvTSCuYUOgOXrRA";
        $url = 'https://api.eflow.team/v1/networks/affiliates';
        $api_data = json_decode(Http::withHeaders([$key => $value])->accept('application/json')->get($url)->body());
        $affiliates = $api_data->affiliates;
        $paging = $api_data->paging;

        if ($affiliates) {
            foreach ($affiliates as $affiliate) {
                if (in_array($affiliate->network_affiliate_id, $db_network_affiliate_ids)) {
                    $update = Affiliate::where(['network_affiliate_id' => $affiliate->network_affiliate_id])->first();
                    $update->update((array)$affiliate);
                    $updated_affiliates++;
                } else {
                    Affiliate::create((array)$affiliate);
                    $new_affiliates++;
                }
            }
            return response()->json(
                [
                    'status' => true,
                    'data' => [
                        'New Affiliates: ' => $new_affiliates,
                        'Updates Affiliates: ' => $updated_affiliates
                    ]
                ]
            );
        }
    }
}
