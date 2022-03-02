<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $pageno = isset($request->page) ? $request->page : 1;
        $no_of_records_per_page = isset($request->per_page) ? $request->per_page : 25;
        $query = Customer::select('id', 'email', 'first_name', 'last_name', 'phone', 'addresses');
        $total_rows = Customer::whereNotNull('id')->count();
        
        if($request->search != ''){
            $query->where('customer_id', 'like', '%' . $request->search . '%')
            ->orWhere('email', 'like', '%'.$request->search.'%')
            ->orWhere('first_name', 'like', '%'.$request->search.'%')
            ->orWhere('last_name', 'like', '%'.$request->search.'%')
            ->orWhere('phone', 'like', '%'.$request->search.'%');
        }

        $data = $query->orderBy('id', 'desc')->SimplePaginate($no_of_records_per_page);
        $total_pages = ceil($total_rows / $data->perPage());
        $pag['count'] = $total_rows;
        $pag['total_pages'] = $total_pages;
        $pag['pageno'] = $pageno;
        $pag['rows_per_page'] = $no_of_records_per_page;
        return response()->json(['status' => true, 'data' => $data, 'pag' => $pag]);
    }
    public function get_customer_detail(Request $request)
    {
        $customerData = Customer::findOrFail($request->id);
        $customerAddress = $customerData->addresses;
        return response()->json(['status' => true, 'data' => $customerData, 'address_data' => $customerAddress]);
    }
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
     * @param  \App\Models\customers  $customers
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\customers  $customers
     * @return \Illuminate\Http\Response
     */
    public function edit()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\customers  $customers
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\customers  $customers
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // dd('die');
        $customer = Customer::find($id);
        if($customer){
            $customer->delete();
            return response()->json(['status' => true, 'message' => 'Customer Deleted Successfully']);
        }else {
            return response()->json(['status' => false, 'message'=>"Opps!! Customer Could not be deleted"]);
        }
    }
    public function refresh_customers()
    {

        $created = 0;
        $updated = 0;
        $db_customers = Customer::pluck('email')->toArray();
        // dd($db_customers);
        $username = "yasir_dev";
        $password = "yyutmzvRpy5TPU";
        $url = 'https://thinkbrain.sticky.io/api/v2/contacts';
        $page = 16053;

        $api_data = Http::withBasicAuth($username, $password)->accept('application/json')->get($url, ['page' => $page]);
        $response['customers'] = $api_data['data'];
        $last_page = $api_data['last_page'];

        // dd($last_page);
        if ($response['customers']) {
            foreach ($response['customers'] as $result) {
                $customer = new Customer();

                $result['customer_id'] = $result['id'];
                $result['custom_fields'] = json_encode($result['custom_fields']);
                $result['addresses'] = json_encode($result['addresses']);
                $result['notes'] = json_encode($result['notes']);

                if (in_array($result['email'], $db_customers)) {
                    $updated++;
                    $customer = Customer::where(['email' => $result['email']])->first();
                    $customer->update($result);
                } else {
                    $created++;
                    $customer->create($result);
                }
            }
            if ($last_page > 1) {
                $page++;
                for ($page; $page <= $last_page; $page++) {

                    $response['customers'] = Http::withBasicAuth($username, $password)->accept('application/json')->get($url, ['page' => $page])['data'];

                    foreach ($response['customers'] as $result) {
                        $customer = new Customer();
                        $result['customer_id'] = $result['id'];
                        $result['custom_fields'] = json_encode($result['custom_fields']);
                        $result['addresses'] = json_encode($result['addresses']);
                        $result['notes'] = json_encode($result['notes']);

                        if (in_array($result['email'], $db_customers)) {
                            $updated++;
                            $customer = Customer::where(['email' => $result['email']])->first();
                            $customer->update($result);
                        } else {
                            $created++;
                            $customer->create($result);
                        }
                        $response = null;
                    }
                }
            }
        }
        return response()->json(['status' => true, 'new customers created' => $created, 'Updated customers' => $updated]);
    }
}