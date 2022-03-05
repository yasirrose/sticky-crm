<?php

namespace App\Http\Controllers;

use App\Models\MidGroup;
use Illuminate\Http\Request;

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
