<?php

namespace App\Http\Controllers;

use App\Models\MidGroup;
use App\Models\Mid;
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
        $data = Profile::where('global_fields->mid_group', '!=', '')->whereNotNull('global_fields->mid_group')->get();

        foreach ($data as $key => $profile) {
            $mid_groups[$key]['name'] = $profile->global_fields->mid_group;
        }
        $mid_groups = array_unique(array_column($mid_groups, 'name'));
        $result = [];
        foreach ($mid_groups as $key => $mid_group_name) {
            $result[$key]['group_name'] = $mid_group_name;
            $result[$key]['assigned_mids'] = Profile::where('global_fields->mid_group', '=', $mid_group_name)->count();
            $result[$key]['mids_data'] = Profile::where('global_fields->mid_group', '=', $mid_group_name)->get();
        }
        // dd(json_decode($result[0]['mids_data']));
        $result = array_values($result);
        return response()->json(['status' => true, 'data' => $result]);
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
}
