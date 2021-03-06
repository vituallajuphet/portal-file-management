<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api extends MY_Controller {
	
	protected $will_send_email = true;
	protected $http_response   = array("code"=> 204, "data" => [], "message"=>"");

	public function __construct(){
		parent::__construct();
	}
	
	public function index(){

		redirect(base_url("home"));

    }
    
    public function delete_notification(){

		$response 	= array("code"=>204, "data"=> []);
		$notify_id 	= $this->input->post("notify_id");
		
		if(!empty($notify_id)){

				$set = array( "notify_status" => "deleted", );
				$where = array( "notify_id" => $notify_id );
				updateData("tbl_notification", $set, $where);
				$response = array("code"=>200, "data"=> []);
		}
		
		echo json_encode($response);

	}

    public function update_notification($notify_id){

		if(!empty($notify_id)){

				$set 	= array( "is_read" => 1 );
				$where  = array( "notify_id" => $notify_id );
				updateData("tbl_notification", $set, $where);
				$response = array("code"=>200, "data"=> []);
		}

		$get_type = $this->session->userdata("user_type");

		if($get_type == "cbmc"){
			redirect(base_url("cbmc/notifications"));
		}
		else if($get_type == "investor"){
			redirect(base_url("investor/notifications"));
		}
		
	}

	public function my_comp(){
		echo  '<pre>';
		print_r($this->get_my_company());
		echo '</pre>';
		exit;
	}

	private function get_my_company(){
		
		$response 	= array("code"=>204, "data"=> []);
		$my_id  	= get_user_id();

		$par["select"] 	= "*";
		$par["where"] 	= "comp.user_id = {$my_id}  AND status = 'joined'";

		$res = getData("tbl_user_company comp", $par, "obj");

		$comp_arr = [];

		if(!empty($res)){
			
			foreach ($res as $key) {
				array_push($comp_arr, $key->company_id);
			}

		}

		return $comp_arr;

	}

	public function get_sub_investors(){

		$response = array("code"=>204, "data"=> []);

		$par["where"] 		= "user.user_type = 'investor'";
		$par["where_in"] 	= array(
			"col" 	=> "u_comp.company_id",
			"value" => $this->get_my_company()
		);
		$par["group"] 		= "user.user_id";
		$par["join"]		= array( 
			'tbl_user_details user_detail'	=> 'user.user_id = user_detail.user_id',
			'tbl_user_company u_comp' => "u_comp.user_id = user.user_id "
		);

		$result_users = getData('tbl_users user', $par, "obj");

		if(!empty($result_users)){
			
			$c = 0;

			foreach ($result_users as $user) {
				$par2["select"] 	= "company_name, comp.company_id";
				$par2["where"] 		= "user_id = {$user->user_id} ";
				$par2["join"]		= array(
					"tbl_companies comp" => "comp.company_id = user_comp.company_id"
				);
				$companies = getData("tbl_user_company user_comp", $par2, "obj");

				$par3["select"] 	= "file_name";
				$par3["where"] 		= "user_id = $user->user_id";
				$reg_files = getData("tbl_registration_files reg_files", $par3, "obj");

				$result_users[$c]->companies = $companies;
				$result_users[$c]->reg_file = $reg_files;
				unset($result_users[$c]->password);

				$c++;
			}

			$response = array("code"=>200, "data"=> $result_users);
		}

		echo json_encode($response);

	}

	public function get_investors(){

		$response = array("code"=>204, "data"=> []);

		$par["select"] 	= "*";
		$par["where"] 	= "user.user_type = 'investor'";
		$par["join"]	= array( 
			'tbl_user_details user_detail'	=> 'user.user_id = user_detail.user_id'
		);
		$result_users = getData('tbl_users user', $par, "obj");

		if(!empty($result_users)){
			
			$c = 0;

			foreach ($result_users as $user) {
				$par2["select"] 	= "company_name, comp.company_id";
				$par2["where"] 		= "user_id = $user->user_id";
				$par2["join"]		= array(
					"tbl_companies comp" => "comp.company_id = user_comp.company_id"
				);
				$companies = getData("tbl_user_company user_comp", $par2, "obj");

				$par3["select"] 	= "file_name";
				$par3["where"] 		= "user_id = $user->user_id";
				$reg_files = getData("tbl_registration_files reg_files", $par3, "obj");

				$result_users[$c]->companies = $companies;
				$result_users[$c]->reg_file = $reg_files;
				unset($result_users[$c]->password);

				$c++;
			}

			$response = array("code"=>200, "data"=> $result_users);
		}

		echo json_encode($response);

	}

	// manage request API

	public function get_file_request(){
		$this->get_files_request("");
	}

	public function get_sub_request_file(){
		$param  = array(
			"company_ids" => $this->get_my_company()
		);

		$this->get_files_request("", "json", $param);
	}

	public function get_sub_files(){

		$par["where"] = "subsidiary";
		$this->get_files("json", $par);

	}

	public function test_here(){

		// $par["where"] = "subsidiary";
		// echo '<pre>';
		// print_r();
		// echo '</pre>';
		exit;

	}


	public function get_files($result = "json", $params = array()){

		$response = array("code"=> 204, "data" => []);

		$par["select"] = "file.files_id, file.file_name, file_department, file_company_id, file.file_title, date_added, file_status, user.user_id,   firstname, lastname, remarks";	
		$par["where"]  = "file.file_status = 'published'";
		$par["join"]   = array(
			"tbl_users user"		 		=> "user.user_id = file.added_by",
			"tbl_user_details user_d" 		=> "user.user_id = user_d.user_id",
		);

		if(!empty($params)){
			if(!empty($params["where"])){
				if($params["where"] == "subsidiary"){
					$comp = $this->get_my_company();
					$par["select"] .= ", req.company_id, req.request_id";
					$par["where_in"]["col"] = "req.company_id";
					$par["where_in"]["value"] = $comp;
					$par["where"]  = "req.request_status = 'Completed'";
					$par["group"] = "file.files_id";
					
					$par["join"]   = array(
						"tbl_users user"		 		=> "user.user_id = file.added_by",
						"tbl_user_details user_d" 		=> "user.user_id = user_d.user_id",
						"tbl_requested_files req_file"  => "file.files_id = req_file.fk_file_id",
						"tbl_requests req" 				=> "req.request_id = req_file.fk_requested_id"
					);
				}	
			}
		}


		$res = getData("tbl_files file", $par);

		if(!empty($res)){
			$response = array("code"=> 200, "data" => $res);
		}

		if($result == "array"){
			return $res;
		}else{
			echo json_encode($response);
		}
	}

	private function get_files_request($status="", $result= "json", $params = array()){
		
		$response = array("code"=> 204, "data" => []);
		$par["select"] = "request_id, req.user_id, comment, req.company_id, req.department, file_title, requested_date, request_status, firstname, lastname, requested_date, comp.company_name, req.date_approved";	
		$par["where"]  = "req.request_status != 'Deleted'";

		if(!empty($params)){
			if(!empty($params["company_ids"])){
				$par["where_in"]["col"] = "comp.company_id";
				$par["where_in"]["value"] = $params["company_ids"];
			}
		}

		if(!empty($status)){
			$par["where"] ="req.request_status = '$status' AND req.request_status != 'Deleted'";
		}

		$par["join"] = array(
			"tbl_users user" 		  => "user.user_id = req.user_id",
			"tbl_user_details user_d" => "user.user_id = user_d.user_id",
			"tbl_companies comp" 	  => "comp.company_id = req.company_id",
		);
		
		$res = getData("tbl_requests req", $par);


		if(!empty($res)){
			$response = array("code"=> 200, "data" => $res);
		}

		if($result == "array"){
			return $res;
		}
		else{
			echo json_encode($response);
		}

	}

	public function get_approved_request($req_id){
		$response = array("code"=> 204, "data" => []);

		if(!empty($req_id)){
			$par["select"] = "requested_file_id, files_id, file_name, file_department, file_company_id, file_title, date_added, 							  date_updated, file_status, remarks, u_detail.firstname, u_detail.lastname, user.user_id";
			$par["where"]  = "req_file.fk_requested_id = $req_id";
			$par["join"]   = array(
				"tbl_files file" 			=> "file.files_id = req_file.fk_file_id",
				"tbl_users user" 			=> "user.user_id = req_file.fk_approved_user_id",
				"tbl_user_details u_detail" => "user.user_id = u_detail.user_id"
			);

			$res = getData("tbl_requested_files req_file" , $par, "obj");

			if(!empty($res)){
				$response = array("code"=> 200, "data" => $res);
			}
		}
		echo json_encode($response);
	}

	public function delete_request(){

		$post = $this->input->post();

		if(!empty($post)){
			$request_id = $post["request_id"];

			$where 	 = "request_id = {$request_id}";
			$set	 = array( "request_status" => "Deleted");
			updateData("tbl_requests", $set, $where);

			$this->http_response = array("code" => 200);

		}

		echo json_encode($this->http_response);
	}



	public function check_has_file(){

		$response = array("code"=> 204);
		$post 	  = json_decode($this->input->post("frmdata"));

		if(!empty($post)){
			$par["select"]  = "user.user_id";
			$par["where"]   = "req.request_id = $post->request_id";
			$par["join"] 	= array(
				"tbl_requests req" => "req.user_id = user.user_id",
			);
			$res = getData("tbl_users user", $par, "obj");

			if(!empty($res)){
				$user_id = $res[0]->user_id;
				
				$par["select"] ="req.user_id";
				$par["where"] ="req.user_id = $user_id AND req.request_status = 'Completed' AND req_file.fk_file_id = $post->files_id";
				$par["join"] =array(
					"tbl_requested_files req_file" => "req_file.fk_requested_id = req.request_id"
				);
				$res2 = getData("tbl_requests req", $par, "obj");
				if(!empty($res2)){
					$response = array("code"=> 200);
				}
			}	

		}
		echo json_encode($response);
	}

	public function approve_request_file(){
		$response = array("code"=> 204, "data" => []);
		$post = json_decode($this->input->post("frmdata"));

		if(!empty($post)){
			$file_ids = $post->file_ids;
			$request_id = $post->request_id;

			foreach ($file_ids as $file_id) {
				$set = array(
					"fk_requested_id" => $request_id,
					"fk_file_id" => $file_id,
					"fk_approved_user_id" => get_user_id()
				);
				insertData("tbl_requested_files", $set);
			}

			$set = array(
				"request_status" => "Completed",
				"date_approved" => date("Y-m-d"),
			);
			$where = array("request_id" => $request_id);
			updateData('tbl_requests', $set, $where);
			$response = array("code"=> 200, "data" => []);

			if($this->will_send_email){
				$par["select"] = "*";
				$par["where"]  = "req.request_id = $request_id";
				$par["join"]   = array(
					"tbl_requests req" => "req.user_id = u_detail.user_id",
				);
				$resp = getData("tbl_user_details u_detail", $par, "obj");
				$messge = $this->html_email($resp);
				$is_sent = sendemail("prospteam@gmail.com", $messge, "File Request", "CMBC Notification");
			}
		}
		
		echo json_encode($response);
	}

	public function update_request_status(){
		
		$post = json_decode($this->input->post("frmdata"));
		$response = array("code"=> 204, "data" => []);

		if(!has_empty($post)){
			$set = array( "request_status" => $post->status );
			$where = array("request_id" => $post->request_id);
			updateData("tbl_requests", $set, $where);

			if($this->will_send_email){
				$par["select"] = "*";
				$par["where"] = "req.request_id = $post->request_id";
				$par["join"] =array(
					"tbl_requests req" => "req.user_id = u_detail.user_id",
				);
				if($post->status == "Processing"){

					$resp = getData("tbl_user_details u_detail", $par, "obj");
					// sent notifucaton
					send_notification($resp[0]->user_id, "Your request has been processed");
					$app_txt = "Your requested file has been proccessed.";
					$messge = $this->html_email($resp, $app_txt);
					$is_sent = sendemail($resp[0]->email_address, $messge, "File Request", "CMBC Notification");
				}
			}
			$response = array("code"=> 200, "data" => []);
		}

		echo json_encode($response);
	}
	
	// manage files

	public function get_file_users($file_id){
		
		$response = array("code"=> 204, "data" => []);
		$par["select"] = "*";
		$par["join"]   = array(
			"tbl_requested_files req_file"=> "req_file.fk_requested_id = req.request_id"
		);
		$par["where"]  = array("req_file.fk_file_id == $file_id");

		$res = getData("tbl_requests req", $par, "obj");

		if(!empty($res)){
			$response = array("code"=> 200, "data" => $res);
		}

		echo json_encode($response);
	}

	public function get_archieved_files($result = "json"){

		$response = array("code"=> 204, "data" => []);

		$par["select"] = "files_id, file_name, file_department, file_company_id, file_title, date_added, date_updated, file_status, user.					  user_id, firstname, lastname, remarks";	
		$par["where"]  = "file.file_status = 'archieved'";
		$par["join"]   = array(
			"tbl_users user" 		  => "user.user_id = file.added_by",
			"tbl_user_details user_d" => "user.user_id = user_d.user_id",
		);

		$res = getData("tbl_files file", $par);

		if(!empty($res)){
			$response = array("code"=> 200, "data" => $res);
		}

		if($result == "array"){
			return $res;
		}else{
			echo json_encode($response);
		}
	} 

	public function get_files_cbmc($result = "json"){

		$response = array("code"=> 204, "data" => []);

		$par["select"] = "files_id, file_name, file_department, file_company_id, file_title, date_added, file_status, user.user_id, 						  firstname, lastname, remarks";	
		$par["where"]  = "file.file_status = 'published'";
		$par["join"]   = array(
			"tbl_users user"		  => "user.user_id = file.added_by",
			"tbl_user_details user_d" => "user.user_id = user_d.user_id",
		);

		$res = getData("tbl_files file", $par);

		if(!empty($res)){
			$response = array("code"=> 200, "data" => $res);
		}

		if($result == "array"){
			return $res;
		}else{
			echo json_encode($response);
		}
	}

	public function restrict_users(){

		$response = array("code"=> 204, "data" => []);
		$post 	  = json_decode($this->input->post("frmdata"));

		if(!empty($post->file_id)){
			if(!empty($post->users_id)){
				$par ["select"]   = "request_id, user_id";
				$par ["where_in"] = array(
					"col"   => "req.user_id",
					"value" => $post->users_id
				);
				$par["join"] = array(
					"tbl_requested_files req_file" => "req_file.fk_requested_id = req.request_id"
				);
				$par["where"] = "(req.request_status = 'Completed' AND req_file.fk_file_id = $post->file_id)";
				$req_data 	  = getData("tbl_requests req", $par, "obj");

				// set restrictions
				if(!empty($req_data)){
					foreach ($req_data as $request) {
						$set = array(
							"file_id" => $post->file_id,
							"request_id" => $request->request_id,
							"user_id" => $request->user_id,
							"status" => "Restricted",
						);

						insertData("tbl_restricted_user", $set);
					}
					
					$response = array("code"=> 200);
				}
			}
			// unrestrict
			if(!empty($post->un_res_users_id)){
				
				$par2 ["select"]	 = "request_id, user_id";
				$par2 ["where_in"] 	 = array(
					"col" 	=> "req.user_id",
					"value" => $post->un_res_users_id
				);
				$par2["join"] = array(
					"tbl_requested_files req_file" => "req_file.fk_requested_id = req.request_id"
				);
				$par2["where"] = "(req_file.fk_file_id = $post->file_id)";

				$req_data2 = getData("tbl_requests req", $par2, "obj");
				
				if(!empty($req_data2)){
					foreach ($req_data2 as $request) {
						$where = array(
							"file_id" 	 => $post->file_id,
							"request_id" => $request->request_id,
							"user_id" 	 => $request->user_id,
						);

						deleteData("tbl_restricted_user", $where);
					}

					$response = array("code"=> 200);
				}
			}
		}
		
		echo json_encode($response);
	}

	public function cbmc_delete_file(){
		$this->update_file_status("archieved", "File Deleted Successfully");
	}

	public function delete_archieve_file(){
		$this->update_file_status("deleted", "File Deleted Successfully");
	}

	public function restore_file(){
		$this->update_file_status("published", "File Restored Successfully");
	}

	private function update_file_status($status, $msg){
		$response = array("code"=> 204, "data" => [], "message"=>"Failed");
		$post = get_post();	
		if(!empty($post)){
			$set = array(
				"file_status" => $status,
				"date_updated" => date("Y-m-d")
			);
			$where = array("files_id" => $post["file_id"]);
			updateData("tbl_files", $set, $where);
			$response = array("code"=> 200, "data" => $this->get_files_cbmc("array"), "message" => $msg);	
		}
		echo json_encode($response);
	}
	
	public function get_restricted_user($file_id){

		$response = array("code"=>204, "data"=> []);
		$par["select"] = "user.user_id, user.user_type, u_details.firstname, u_details.lastname, fk_requested_id, fk_file_id, req.							  request_status, req.department" ;
		$par["where"]  = "user.user_status = 1 AND user.user_type != 'admin' AND req_file.fk_file_id = $file_id";
		$par["join"]   = array( 
						 'tbl_user_details u_details' => 'user.user_id = u_details.user_id',
						 'tbl_requests req' => 'req.user_id = u_details.user_id',
						 'tbl_requested_files req_file' => 'req_file.fk_requested_id = req.request_id',
		);

		$res = getData('tbl_users user', $par, "obj");
	
		if(!empty($res)){
			$c = 0;

			foreach ($res as $user) {
				$par2["select"]		 ="*";
				$par2["where"]		 ="user_id = $user->user_id AND file_id = $file_id";
				$res[$c]->req_status ="Completed";
				$res2				 = getData("tbl_restricted_user", $par2, "obj"); 

				if(!empty($res2)){
					$res[$c]->req_status ="Restricted";
				}

				$c++;
			}

			$response = array("code"=>200, "data"=>$res);
		}

		echo json_encode($response);
	}


	// manage subsidiary
	public function get_sub_uploaded_files($req_id, $has_return = false){

		$response = array("code"=>204, "data"=> []);
		if(!empty($req_id)){

			$pars["where"] = "fk_request_id = {$req_id} AND fk_file_id = 0";
			$res	   = getData("tbl_processed_request", $pars, "obj");
			$response = array("code"=>200, "data"=> $res);
		}

		if($has_return){
			return $res;
		}else{
			echo json_encode($response);
		}

		
	}

	public function get_sub_process_file($req_id){

		$response = array("code"=>204, "data"=> []);
		$file_data = [];
		if(!empty($req_id)){

			$pars["where"] = "fk_request_id = {$req_id} AND process_status = 'processing'";
			$results = getData("tbl_processed_request", $pars, "obj");
			
			if(!empty($results)){
				$c = 0;
				foreach ($results as $key ) {
					$file_data[$c] = $key;
					$file_data[$c]->is_uploaded = 1;
					if($key->fk_file_id != 0){

						$par["where"] = "file.files_id = $key->fk_file_id";
						
						$files = getData("tbl_files file", $par, "obj");
						if(!empty($files)){
							$file_data[$c]->process_file_title = $files[0]->file_title;
							$file_data[$c]->process_file_name = $files[0]->file_name;
							$file_data[$c]->is_uploaded = 0;
						}
					}
					
					$c++;
				}
			}
			$response = array("code"=>200, "data"=> $file_data);
		}

	
		  echo json_encode($response);

	}

	public function sub_process_request(){ //process request from subsidiary account

		$response = array("code"=> 204, "data" => []);
		$post = json_decode($this->input->post("frmdata"));

		if(!empty($post)){
			$file_ids = $post->file_ids;
			$request_id = $post->request_id;
			$uploaded_files = $post->uploaded_files;

			if(!empty($file_ids)){
				foreach ($file_ids as $file_id) {
					$set = array(
						"fk_request_id" => $request_id,
						"fk_file_id" => $file_id,
						"fk_process_user_id" => get_user_id(),
						"date_created" =>  date("Y-m-d"),
						"process_file_name" =>  "",
						"process_status" => "processing",
					);
					
					insertData("tbl_processed_request", $set);
				}
			}
			
			if(!empty($uploaded_files)){
				foreach ($uploaded_files as $file) {
					$set = array(
						"process_status" => "processing",
					);
					$where = array(
						"process_id" => $file->process_id,
						"process_status" => "pending",
					);

					updateData("tbl_processed_request", $set, $where);
				}
			}
			
			$set = array(
				"request_status" => "Processing",
			);
			$where = array("request_id" => $request_id);
			updateData('tbl_requests', $set, $where);
			$response = array("code"=> 200, "data" => []);

			if($this->will_send_email){
				$par["select"] = "*";
				$par["where"]  = "req.request_id = $request_id";
				$par["join"]   = array(
					"tbl_requests req" => "req.user_id = u_detail.user_id",
				);
				$resp = getData("tbl_user_details u_detail", $par, "obj");
				$messge = $this->html_email($resp);
				$is_sent = sendemail('web2.juphetvitualla@gmail.com', $messge, "File Request", "CMBC Notification");
			}
		}
		
		echo json_encode($response);
	}

	public function delete_sub_uploaded_file(){
		$response = array("code"=>204, "data"=> []);
		
		$pro_id = $this->input->post("pro_id");
		$req_id = $this->input->post("req_id");
		$file_name = $this->input->post("filename");

		if(!empty($pro_id) && !empty($req_id) && !empty($file_name)){
			$where= "process_id = {$pro_id}";
			deleteData("tbl_processed_request", $where);
			
			$this->delete_process_file($file_name);
			$resp = $this->get_sub_uploaded_files($req_id, true);
			$response = array("code"=>200, "data"=> $resp);
		}
		echo json_encode($response);

	}

	public function check_process_file(){

		$response = array("code"=> 204);
		$post 	  = json_decode($this->input->post("frmdata"));

		if(!empty($post)){
			$par["select"]  = "user.user_id";
			$par["where"]   = "req.request_id = $post->request_id";
			$par["join"] 	= array(
				"tbl_requests req" => "req.user_id = user.user_id",
			);
			$res = getData("tbl_users user", $par, "obj");

			if(!empty($res)){
				$user_id = $res[0]->user_id;
				
				$par["select"] ="req.user_id";
				$par["where"] ="req.user_id = $user_id AND pro_file.fk_file_id = $post->files_id";
				$par["join"] =array(
					"tbl_processed_request pro_file" => "pro_file.fk_request_id = req.request_id"
				);
				$res2 = getData("tbl_requests req", $par, "obj");
				if(!empty($res2)){
					$response = array("code"=> 200);
				}
			}	

		}
		echo json_encode($response);
	}

	private function delete_process_file($filename){
		$file = "./assets/process_files/".$filename;
		unlink($file);
		return true;
	}

	// manage events

	public function get_events($params = array()){

		$response = array("code"=> 204, "data" => []);

		$par["where"] = "event_status = 1 ";
		$par["join"] = array(
			"tbl_user_details user_d" => "user_d.user_id = event.fk_user_id"
		);
		
		$res = getData("tbl_events event", $par, "obj");

		if(!empty($res)){
			$response = array("code"=> 200, "data" => $res);
		}

		echo json_encode($response);

	}

	public function delete_event(){

		$response = array("code"=> 204, "data" => []);

		$post = $this->input->post();

		if(!empty($post)){
			
			$set 	= array("event_status" => 3);
			$where  = array("event_id" => $post["event_id"]);

			updateData("tbl_events", $set, $where);

			$response = array("code"=> 200, "data" => []);

		}

		echo json_encode($response);

	}

	public function get_dashboard_data (){
		
		$response = array("code"=> 204, "data" => []);
		
		// files 
		$par["where"] = "file_status = 'published'";
		$par["select"] = "files_id";
		$dash_data["files"] = count(getData("tbl_files", $par));

		// reqquest
		$par["where"] = "request_status = 'Pending'";
		$par["select"] = "request_id";
		$dash_data["request"] = count(getData("tbl_requests", $par));

		// investors
		$par["where"] = "user_type = 'investor' AND user_status = 1 AND approved = 1";
		$par["select"] = "user_id";
		$dash_data["investor"] = count(getData("tbl_users", $par));

		// investors
		$par["where"] = "user_type = 'cbmc' AND user_status = 1 AND approved = 1";
		$par["select"] = "user_id";
		$dash_data["dept_user"] = count(getData("tbl_users", $par));

		// investors
		$par["where"] = "user_type = 'subsidiary' AND user_status = 1 AND approved = 1";
		$par["select"] = "user_id";
		$dash_data["sub_user"] = count(getData("tbl_users", $par));

		$par["where"] 		  = "company_status = 'active' AND company_type = 'subsidiary'";
		$par["select"]        = "company_id";
		$dash_data["company"] = count(getData("tbl_companies", $par));

		$response = array("code"=> 200, "data" => $dash_data);

		echo json_encode($response);

	}

	public function get_graph_data($resp = "data"){


		$response = array("code" => 204, "data" => []);
	// loop each month   
		$cur_year	   = date("Y");
		
		$req_arr = [];
		for ($i=1; $i <= 12 ; $i++) { 
			$par["select"] = "request_id, requested_date";
			$par["where"]  = "YEAR(requested_date) = {$cur_year} AND MONTH(requested_date) = {$i}";
			$res = getData("tbl_requests", $par);
			$total = 0;
			if(!empty($res)){
				$total = count($res);
			}
			array_push($req_arr, $total);
		}

		$app_arr = [];
		for ($i=1; $i <= 12 ; $i++) { 
			$par["select"] = "request_id, requested_date";
			$par["where"]  = "YEAR(requested_date) = {$cur_year} AND MONTH(requested_date) = {$i} AND request_status = 'Completed'";
			$res = getData("tbl_requests", $par);
			$total = 0;
			if(!empty($res)){
				$total = count($res);
			}

			array_push($app_arr, $total);
		}
		
		$proc_arr = [];
		for ($i=1; $i <= 12 ; $i++) { 
			$par["select"] = "request_id, requested_date";
			$par["where"]  = "YEAR(requested_date) = {$cur_year} AND MONTH(requested_date) = {$i} AND request_status = 'Processing'";
			$res = getData("tbl_requests", $par);
			$total = 0;
			if(!empty($res)){
				$total = count($res);
			}

			array_push($proc_arr, $total);
		}

		$graph_data = array(
			"requests" => $req_arr,
			"approved" => $app_arr,
			"processed" => $proc_arr,
		);
		
		$response = array("code" => 200, "data" => $graph_data);

		echo json_encode($response);
		
	}

	public function get_pie_graph_data(){

			$cur_date = date("Y-m-d");

			$req_count = 0;
			$par["select"] = "request_id, requested_date";
			$par["where"]  = "requested_date = '{$cur_date}'";
			$res = getData("tbl_requests", $par);
			if(!empty($res)){
				$req_count = count($res);
			}

			$app_count = 0;
			$par["select"] = "request_id, requested_date";
			$par["where"]  = "requested_date = '{$cur_date}' AND request_status = 'Completed'";
			$res = getData("tbl_requests", $par);
			if(!empty($res)){
				$app_count = count($res);
			}

			$pro_count = 0;
			$par["select"] = "request_id, requested_date";
			$par["where"]  = "requested_date = '{$cur_date}' AND request_status = 'Processing'";
			$res = getData("tbl_requests", $par);
			if(!empty($res)){
				$pro_count = count($res);
			}

			$pie_data = array(
				"req_count" => $req_count,
				"app_count" => $app_count,
				"pro_count" => $pro_count,
			);

			$response = array( "code" => 200, "data" => $pie_data );

			echo json_encode($response);

	}

	public function get_my_companies(){
		$response = array("code"=>204, "data"=> []);

		$par["select"] = "*";
		$par["where"] = array("tbl_user_company.user_id" => get_user_id(), "tbl_user_company.status" => "joined");
		$par["join"] = array("tbl_companies" => "tbl_companies.company_id = tbl_user_company.company_id");
		$companies = $this->MY_Model->getRows('tbl_user_company',$par, "obj");

		if (!empty($companies)){
			$response = array("code" =>200, "data" => $companies);
		}

		echo json_encode($response);
	}

	public function update_profilepic(){
            $post = $this->input->post();
			$resp = array("code"=>204, "data" => []);
			
            if(!empty($post)){
                  $orig = $this->session->userdata("profile_picture");
                  $path = "./assets/images/profiles/";
                  $image_parts = explode(";base64,", $post['profile_img']);
                  $image_type_aux = explode("image/", $image_parts[0]);
                  $image_type = $image_type_aux[1];
                  $image_base64 = base64_decode($image_parts[1]);
                  $file_name = "profile-".time(). '.png';
                  $file = $path . $file_name;
                  file_put_contents($file, $image_base64);
                  $set = array( "profile_picture" => $file_name );
                  $where = array("user_id" => get_user_id());
                  $this->MY_Model->update('tbl_user_details', $set, $where);
                  $this->session->set_userdata("profile_picture", $file_name);
                  unlink($path.$orig);
                  $resp = array("code"=>200, "data" => $file_name);
			}
			
            echo json_encode($resp);
	  }
	  
	  

	// hmtl format
	private function html_email($arr, $msg ="Your requested file has been approved."){

		$html ="
			<div>
				Hi ".$arr[0]->firstname.",
				<br><br>
				Requested File: ".$arr[0]->file_title." <br><br>
				$msg
				<br><br><br>
				Sincerely, <br>
				".$arr[0]->department."
			</div>
		";

		return $html;

	}

	public function test_email(){
			sendemail("web2.juphetvitualla@gmail.com", "test email", "File Request", "CMBC Notification");

			redirect(base_url());
	}


}
