<?php

namespace App\Http\Controllers;

use App\Models\MidGroup;
use App\Models\Mid;
use App\Models\Order;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class MidGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = MidGroup::all();
        foreach ($data as $key => $group) {
            $profiles = Profile::where('global_fields->mid_group', '=', $group['group_name']);
            $group['assigned_mids'] = $profiles->count();
            $group['assigned_mid_ids'] = $profiles->pluck('profile_id')->toArray();
            $group['mids_data'] = $profiles->get();
        }
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
     * @param  \App\Models\MidGroups  $midGroups
     * @return \Illuminate\Http\Response
     */
    public function show(MidGroups $midGroups)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MidGroups  $midGroups
     * @return \Illuminate\Http\Response
     */
    public function edit(MidGroups $midGroups)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MidGroups  $midGroups
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MidGroups $midGroups)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MidGroups  $midGroups
     * @return \Illuminate\Http\Response
     */
    public function destroy(MidGroups $midGroups)
    {
        //
    }
    public function refresh_mids_groups()
    {
        $db_mid_group_names = MidGroup::pluck('group_name')->toArray();
        $data = Profile::where('global_fields->mid_group', '!=', '')->whereNotNull('global_fields->mid_group')->get();

        foreach ($data as $key => $profile) {
            $mid_groups[$key]['name'] = $profile->global_fields->mid_group;
        }
        $mid_groups = array_unique(array_column($mid_groups, 'name'));
        $result = [];
        $created = 0;
        $updated = 0;

        foreach ($mid_groups as $key => $mid_group_name) {
            $result['group_name'] = $mid_group_name;
            $profiles = Profile::where('global_fields->mid_group', '=', $mid_group_name);
            $result['assigned_mids'] = $profiles->count();
            $result['assigned_mid_ids'] = $profiles->pluck('profile_id')->toArray();
            // $result['mids_data'] = $profiles->get();
            // dd($result['assigned_mid_ids']);
            $gross_revenue = Mid::whereIn('gateway_id' , $result['assigned_mid_ids'])->sum('current_monthly_amount');
            $result['gross_revenue'] = $gross_revenue;
            $result['target_bank_balance'] =  $result['gross_revenue'] * 0.2;
            if (in_array($result['group_name'], $db_mid_group_names)) {
                $group = MidGroup::where(['group_name'=>$result['group_name']])->first();
                $group->update($result);
                $updated++;
            } else {
                $model = new MidGroup();
                $model->create($result);
                $created++;
            }
            $result = [];
        }
        return response()->json(['status' => true, 'data'=>['new' => $created, 'updated' => $updated]]);
    }
}
