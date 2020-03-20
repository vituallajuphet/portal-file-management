<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends MY_Controller {
	
	protected $will_send_email = true;
	protected $http_response   = array("code"=> 204, "data" => [], "message"=>"");

	public function __construct(){
		parent::__construct();
	}
	
	public function index(){

		redirect(base_url("admin/manage_users"));

	}

	public function profile(){

		$data["title"] 		= "Admin - Profile";
		$data["page_name"]  = "profile";
		$data['has_header'] = "header_index.php";
		$data['has_footer'] = "includes/profile_footer";
		$data['has_modal']  = "includes/profile_modal";

		$this->load_admin_page('pages/Profile',$data);

	}
	
	public function manage_users(){

		$data["title"] 		 = "Admin - Manage Users";
		$data["page_name"]	 = "manage_users";
		$data["has_mod"]	 = "modal/manage_user_mod";
		$data['has_header']	 = "header_index.php";
		$data['has_footer']	 = "includes/manage_user_footer";

		$this->load_admin_page('pages/Manage_users',$data);

	}
	
	
	public function department_user(){

		$data["title"] = "Admin - department users";
		$data["page_name"] = "department_users";
		$data['has_header']= "header_index.php";
		$data["has_mod"] = "modal/dept_user_modal";
		$data['has_footer'] = "includes/manage_dept_user_footer";
		$this->load_admin_page('pages/Manage_dept_user',$data);

	}
	
	public function companies(){

		$data["title"] ="Admin - Companies";
		$data["page_name"] ="companies";
		$data['has_header']="header_index.php";
		$data["has_mod"] = "modal/manage_company_modal";
		$data['has_footer'] = "includes/manage_company_footer";
		$this->load_admin_page('pages/Manage_company',$data);
		
	}
	
	public function manage_request(){

		$data["title"] ="Admin - Requests";
		$data["page_name"] ="file_request";
		$data['has_header']="header_index.php";
		$data["has_mod"] ="modal/manage_request_modal";
		$data['has_footer']="includes/manage_request_footer";
		$this->load_admin_page('pages/Manage_request',$data);

	}
	
	public function manage_files(){

		$data["title"] ="Admin - Manage files";
		$data["page_name"] ="manage_files";
		$data['has_header']="header_index.php";
		$data['has_footer']="includes/manage_file_footer";
		$data["has_mod"] ="modal/manage_file_modal";
		$this->load_admin_page('pages/Manage_files',$data);

	}

	public function manage_events(){

		$data["title"] ="Admin - Manage Events";
		$data["page_name"] = "manage_files";
		$data['has_header']= "header_index.php";
		$data['has_footer']= "includes/manage_events_footer";
		$data["has_mod"] = "modal/manage_event_modal";
		$this->load_admin_page('pages/Manage_events',$data);

	}

	public function view_event($event_id = 0){

		if($event_id == 0){
			redirect(base_url("admin/manage_events"));
		}

		$data["title"] 		="Admin - View Events";
		$data["page_name"]  = "view_events";
		$data['has_header'] = "header_index.php";

		$par["select"] = "*";
		$par["where"] = "event_id = {$event_id} AND event_status = 1";
		$par["join"]  = array("tbl_user_details user_d" => "user_d.user_id = event.fk_user_id");

		$res = getData("tbl_events event", $par, "obj");

		if(!empty($res)){
			$data["post_data"] = $res[0];
		}else{
			redirect(base_url("admin/manage_events"));
		}

		$this->load_admin_page('pages/View_event', $data);

	}
	
	public function investors(){

		$data["title"] 		= "Admin - Investors";
		$data["page_name"]  = "investors";
		$data['has_header'] = "header_index.php";
		$data['has_footer'] = "includes/manage_investors_footer";
		$data["has_mod"] 	= "modal/manage_investors_modal";
		$this->load_admin_page('pages/Manage_investors',$data);

	}

	public function notifications($nofi_id =""){

		if(!empty($nofi_id) && is_numeric($nofi_id)){
			$data["has_notify_id"] = $nofi_id;
			$set 	= array( "is_read" => 1 );
			$where  = array( "notify_id" => $nofi_id );
			updateData("tbl_notification", $set, $where);
		}

		$data["title"] 		= "Admin - Notifications";
		$data["page_name"]  = "notifications";
		$data['has_header'] = "header_index.php";
		$data['has_footer'] = "includes/notification_footer";
		$data["has_mod"] 	= "modal/manage_notification_modal";
		$this->load_admin_page('pages/Notifications',$data);

	}

	public function add_new_file($req_id){

		$_SESSION["add_file"] = $req_id;
		redirect(base_url("admin/manage_files"));

	}
	// ----------------------------------------private functionm ---------------------
	
	private function user_exists ($user){
		
		$user_id = $user['user_id'];
		$email = $user['email_address'];
		$username = $user['username'];

		$par["select"] = "*";
		$par["join"] = array("tbl_user_details" => "tbl_user_details.user_id = tbl_users.user_id" );
		$par["where"] = "tbl_users.user_id != '$user_id' AND (tbl_users.username = '$username' OR tbl_user_details.email_address = '$email')";

		$res = $this->MY_Model->getRows('tbl_users', $par);

		if(!empty($res)){
			return true;
		}
		return false;
	}
	
	// -------------------------------------------API----------------------------
	
	public function api_update_profilepic(){

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
			updateData('tbl_user_details', $set, $where);
			$this->session->set_userdata("profile_picture", $file_name);
			unlink($path.$orig);
			$resp = array("code"=>200, "data" => $file_name);
		}
		
		echo json_encode($resp);
	}
	
	public function api_update_profile(){

		$post = json_decode($this->input->post("fdata"));
		$response = array("code"=>200, "data"=> []);

		if(!empty($post)){
			$checkUser = array( "email_address"=>$post->email_address, "username"=>$post->username, "user_id" => get_user_id());
			if($this->user_exists($checkUser)){
				$response = array("code"=>205, "data"=> []);
			}
			else
			{
				$set = array(
					"username" => $post->username,
					"password" => password_hash($post->password, PASSWORD_DEFAULT),
				);
				$where= array( "user_id" => $post->user_id );
				updateData('tbl_users', $set, $where);

				$set = array(
					"firstname" => $post->firstname,
					"lastname" =>  $post->lastname,
					"email_address" =>  $post->email_address,
					"contact_number" =>  $post->contact_number,
					"updated_date" =>  date("Y-m-d H:i:s")
				);
				updateData('tbl_user_details', $set, $where);

				$userdata = array(
					"user_id"=>	 $post->user_id,
					"firstname"=>  $post->firstname,
					"lastname"=> $post->lastname,
					"user_type"=> $post->user_type,
					"username"=>  $post->username,
					"password"=> $post->password,
					"email_address"=> $post->email_address,
					"contact_number"=> $post->contact_number,
				);

				$this->session->set_userdata($userdata);
				$response = array("code"=>200, "data"=> get_logged_user("json"));
			}
		}
		
		echo json_encode($response);
	}
	
	public function api_getuser($usertype){

		$response = array("code"=>204, "data"=> []);

		if(!empty($usertype)){
			$par["select"] 	= "*";
			$par["where"] 	= "u.user_type = '$usertype'";
			$par["join"]	= array( 
				'tbl_user_details ud' => 'u.user_id = ud.user_id', 
				'tbl_companies c' 	  => 'c.company_id = ud.company_id'  
			);

			$res = getData('tbl_users u', $par);

			if(!empty($res)){
				$response = array("code"=>200, "data"=> $res);
			}
		}

		echo json_encode($response);
	}

	public function api_get_comp_user(){

		$response = array("code"=>204, "data"=> []);

		$par["select"]	= "*";
		$par["where"] 	= "u.user_status = 1 AND u.approved = 1 AND u.user_type = 'subsidiary'" ;
		$par["join"] 	= array( 
			'tbl_user_details ud' => 'u.user_id = ud.user_id', 
		);

		$res = getData('tbl_users u', $par, "obj");

		if(!empty($res)){
			$response = array("code"=>200, "data"=> $res);

			for ($i=0; $i < count($res); $i++) {
				$par2["select"] = "*"; 
				$par2["where"] 	= "user_id = ".$res[$i]->user_id." AND status = 'joined'" ;
				$par2["join"]	= array("tbl_companies" => "tbl_companies.company_id = tbl_user_company.company_id");
				
				$res2 = getData('tbl_user_company', $par2);

				if(!empty($res2)){
					$res[$i]->companies = $res2;
				}
			}

		}

		echo json_encode($response);
	}
	
	// insert department user here
	public function api_save_dept_user (){

		$response	 = array( "code"=>204, "data"=>[], "message"=>"Please Fill-up the required fields!" );
		$post 		 = json_decode($this->input->post("frmdata"));

		if(!empty($post)){
			if(!has_empty($post)){
				$checkUser = array( "email_address"=>$post->email_address, "username"=>$post->username);
				
				if($this->user_exist($checkUser)){
					$response = array( "code"=>204, "data"=>[], "message"=>"Username or Email address is already used!" );
				}
				else{
					$set = array(
						"username"		=> $post->username,
						"password"		=> password_hash($post->password, PASSWORD_DEFAULT),
						"user_status"	=> 1,
						"user_type"		=> "cbmc",
						"approved"		=> 1,
					);

					$last_id = insertData("tbl_users", $set);
					
					$set = array(
						"user_id"			=> $last_id,
						"firstname"			=> ucfirst($post->first_name),
						"lastname"			=> ucfirst($post->last_name),
						"email_address"		=> $post->email_address,
						"contact_number"	=> $post->contact_number,
						"profile_picture"	=> "",
						'created_date' 		=> date("Y-m-d H:i:s"),
						'updated_date' 		=> date("0000-00-00 00:00:00"),
					);
					insertData("tbl_user_details", $set);

					$depts = $post->departments;

					for ($i=0; $i < count($depts); $i++) { 
						$set= array(
							"user_id"=>$last_id,
							"departments"=>$depts[$i]->dept_name,
							"status"=>1,
						);

						insertData("tbl_user_dept_details", $set);
					}

					$response = array( "code"=>200, "data"=>[], "message"=>"Successfully Saved!" );
				}
			}
		}

		echo json_encode($response);
	}

	public function api_update_dept_user(){

		$response = array( "code"=>204, "data"=>[], "message"=>"Please Fill-up the required fields!" );
		$post	  = json_decode($this->input->post("frmdata"));

		if(!empty($post)){
			if(!has_empty($post)){
				$checkUser = array( "email_address"=>$post->email_address, "username"=>$post->username);

				if($this->user_exist($checkUser, $post->user_id)){
					$response = array( "code"=>204, "data"=>[], "message"=>"Username or Email address is already used!" );
				}
				else{
					$set 		= array( "username"=>$post->username );
					$where  	= "user_id =  $post->user_id";
					$updated 	= updateData("tbl_users", $set, $where);

					if($updated){
						$set = array(
							"firstname"		  => ucfirst($post->first_name),
							"lastname"		  => ucfirst($post->last_name),
							"email_address"   => $post->email_address,
							"contact_number"  => $post->contact_number,
							'updated_date' 	  =>  date("Y-m-d H:i:s"),
						);

						updateData("tbl_user_details", $set, $where);
						$deleted = deleteData("tbl_user_dept_details", $where);

						if($deleted){
							$depts = $post->departments;

							for ($i=0; $i < count($depts); $i++) { 
								$set= array(
									"user_id"		=> $post->user_id,
									"departments"	=> $depts[$i]->dept_name,
									"status"		=> 1,
								);
								insertData("tbl_user_dept_details", $set);
							}
						}

						$response = array( "code"=>200, "data"=>[], "message"=>"Updated Successfully" );
					}
				}
			}
		}
		echo json_encode($response);
	}

	public function api_update_comp_user(){

		$response = array( "code"=>204, "data"=>[], "message"=>"Please Fill-up the required fields!" );
		$post	  = json_decode($this->input->post("frmdata"));
		
		if(!empty($post)){
			if(!has_empty($post)){
				$checkUser = array( "email_address"=>$post->email_address, "username"=>$post->username);

				if($this->user_exist($checkUser, $post->user_id)){
					$response = array( "code"=>204, "data"=>[], "message"=>"Username or Email address is already used!" );
				}
				else{
					$set	 = array( "username"=>$post->username );
					$where 	 = "user_id = $post->user_id";
					$updated = updateData("tbl_users", $set, $where);
					
					if($updated){
						$set = array(
							"firstname"		  => ucfirst($post->first_name),
							"lastname"		  => ucfirst($post->last_name),
							"email_address"	  => $post->email_address,
							"contact_number"  => $post->contact_number,
							'updated_date'	  => date("Y-m-d H:i:s"),
						);

						updateData("tbl_user_details", $set, $where);
						$deleted = deleteData("tbl_user_company", $where);

						if($deleted){
							$comps = $post->companies;

							for ($i=0; $i < count($comps); $i++) { 
								$set= array(
									"user_id"		=> $post->user_id,
									"company_id"	=> $comps[$i]->company_id,
									"status"		=> "joined",
								);
								insertData("tbl_user_company", $set);
							}

							$response = array( "code"=>200, "data"=>[], "message"=>"Updated Successfully" );
						}
						
					}
				}
			}
		}

		echo json_encode($response);
	}

	public function api_add_comp_user(){

		$response = array( "code"=>204, "data"=>[], "message"=>"Please Fill-up the required fields!" );
		$post 	  = json_decode($this->input->post("frmdata"));

		if(!empty($post)){
			if(!has_empty($post)){
				$checkUser = array( "email_address"=>$post->email_address, "username"=>$post->username);

				if($this->user_exist($checkUser)){
					$response = array( "code"=>204, "data"=>[], "message"=>"Username or Email address is already used!" );
				}
				else{
					$set = array(
						"username" =>$post->username,
						"password"=>password_hash($post->password, PASSWORD_DEFAULT),
						"user_status"=>1,
						"user_type"=>"subsidiary",
						"approved"=>1,
					);
					
					$last_id = insertData("tbl_users", $set);

					$set = array(
						"user_id"			=> $last_id,
						"firstname"			=> ucfirst($post->first_name),
						"lastname"			=> ucfirst($post->last_name),
						"email_address"		=> $post->email_address,
						"contact_number" 	=> $post->contact_number,
						"profile_picture"	=>"",
						'created_date' 		=> date("Y-m-d H:i:s"),
						'updated_date' 		=> date("0000-00-00 00:00:00"),
					);
					insertData("tbl_user_details", $set);

					$comps = $post->companies;
				
					for ($i=0; $i < count($comps); $i++) { 
						$set= array(
							"user_id"	 =>	$last_id,
							"company_id" =>	$comps[$i]->company_id,
							"status"	 =>	"joined",
						);

						insertData("tbl_user_company", $set);
					}

					$response = array( "code"=>200, "data"=>[], "message"=>"Successfully Saved!" );
				}
			}
		}

		echo json_encode($response);
	}

	private function user_exist ($user, $user_id = ""){

		$par["select"] = "*";
		$email 	 	   = $user['email_address'];
		$username      = $user['username'];
		$par["join"]   = array("tbl_user_details" => "tbl_user_details.user_id = tbl_users.user_id" );
		$par["where"]  = "(tbl_users.username = '$username' OR tbl_user_details.email_address = '$email')";
		
		if(!empty($user_id)){
			$par["where"] .=" AND (tbl_users.user_id != $user_id )";
		}

		$res = $this->MY_Model->getRows('tbl_users', $par);

		if(!empty($res)){
			return true;
		}

		return false;
	}

	
	public function api_delete_user(){
		$user_id  = $this->input->post("user_id");
		$response = array("code"=>204, "data"=> [], "message"=>"There is something wrong");

		if(!empty($user_id)){
			$set = array( "user_status" => 0 );
			$where = "user_id = $user_id AND user_type != 'admin'";
			$update = updateData("tbl_users", $set, $where);

			if($update){
				$response = array("code"=>200, "data"=> [], "message" => "Deleted Successfully");
			}
		}

		echo json_encode($response);
	}

	public function get_restricted_user($file_id){

		$response = array("code"=>204, "data"=> []);
		$par["select"] = "user.user_id, user.user_type, u_details.firstname, u_details.lastname, fk_requested_id, fk_file_id, req.request_status, req.department" ;
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

	public function api_dept_user($usertype){

		$response = array("code"=>204, "data"=> []);

		if(!empty($usertype)){
			$par["select"]	 = "*";
			$par["where"]	 = "u.user_type = '$usertype' AND user_status = 1";
			$par["join"]	 = array( 'tbl_user_details ud' => 'u.user_id = ud.user_id' );
			$res 			 = getData('tbl_users u', $par, "obj");

			if(!empty($res)){
				$c = 0;

				foreach ($res as $key => $value) {
					$user_id 			= $res[$c]->user_id;
					$par2["select"] 	= "*";
					$par2["where"]		= "user_id =  $user_id";
					$dept				= getData('tbl_user_dept_details ', $par2);

					if(!empty($dept)){
						$res[$c]->departments = $dept;   
					}

					$c++;
				}

				$response = array("code"=>200, "data"=> $res);
			}
		}

		echo json_encode($response);
	}

	// Manage Files Functions
	public function save_file_data(){
		$post = $this->input->post();

		if(!empty($post)){
			$settings['upload_path'] = "./uploaded_files/";
			$file_name				 = "file-".time();
			$settings['file_name'] 	 = $file_name;

			if(upload_file($_FILES, $settings)){
				$set = array(
					"file_name"			=> $file_name.$this->upload->data('file_ext'),
					"file_department"	=> $post["department"],
					"file_company_id"	=> 0,
					"file_title"		=> $post["file_title"],
					"added_by"			=> get_user_id(),
					"date_added"		=> date("Y-m-d"),
					'date_updated'		=> date("0000-00-00"),
					"file_status"		=> "published",
					"remarks"			=> $post["remarks"]
				);

				insertData("tbl_files", $set);
				swal_data("File uploaded successfully");
			}
			else{
				$err = $this->upload->display_errors();
				swal_data(strip_tags($err), "error");
			}

			if(!empty($_SESSION["add_file_req_id"])){
				redirect(base_url("admin/manage_request"));
			}
			else{
				redirect(base_url("admin/manage_files"));
			}
			
		}
	}

	public function update_file_data(){
		$post = get_post();

		if(!empty($post)){

			$file_id = $post["file_id"];
			$where	 = "files_id = $file_id";

			if(!empty($_FILES["name"])){
				$settings['upload_path'] = "./uploaded_files/";
				$file_name				 = "file-".time();
				$settings['file_name']	 = $file_name;

				if(upload_file($_FILES, $settings)){
					$set = array(
						"file_name"		  => $file_name.$this->upload->data('file_ext'),
						"file_department" => $post["department"],
						"file_title"	  => ucfirst($post["file_title"]),
						"date_updated" 	  => date("Y-m-d"),
						"remarks"		  => $post["remarks"]
					);

					updateData("tbl_files", $set, $where);
					swal_data("File Updated Successfully");
				}
				else{
					$err = $this->upload->display_errors();
					swal_data(strip_tags($err), "error");
				}	
			}
			else{
				$set = array(
					"file_department" => $post["department"],
					"file_title"	  => ucfirst($post["file_title"]),
					"date_updated" 	  => date("Y-m-d"),
					"remarks"		  => $post["remarks"]
				);
				
				updateData("tbl_files", $set, $where);
				swal_data("File Updated Successfully");
			}
			
			redirect(base_url("admin/manage_files"));
		}
	}

	// Manage Files API functions
	public function api_get_files($result = "json"){

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
	
	public function api_restrict_users(){
		$response = array("code"=> 204, "data" => []);
		$post = json_decode($this->input->post("frmdata"));

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

	public function api_get_archieved_files($result = "json"){

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

	public function api_get_file_users($file_id){
		
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

	public function api_delete_file(){
		$this->update_file_status("archieved", "File Deleted Successfully");
	}
	
	public function api_delete_archieve_file(){
		$this->update_file_status("deleted", "File Deleted Successfully");
	}

	public function api_restore_file(){
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
			$response = array("code"=> 200, "data" => $this->api_get_files("array"), "message" => $msg);	
		}
		echo json_encode($response);
	}

	// Manage Request API functions
	public function api_get_file_request(){
		$this->get_files_request("");
	}

	public function api_get_approved_request($req_id){
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

	public function api_check_has_file(){

		$response = array("code"=> 204);
		$post = json_decode($this->input->post("frmdata"));

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
			
			$par3["where"] = "fk_request_id = {$post->request_id} AND fk_file_id = {$post->files_id}";
			$has_process = getData("tbl_processed_request", $par3);
			if(!empty($has_process)){
				$response = array("code"=> 201);
			}

		}
		echo json_encode($response);
	}
	
	public function api_update_request_status(){
		
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

	// approved request function
	public function api_approve_request_file(){
		$response = array("code"=> 204, "data" => []);
		$post = json_decode($this->input->post("frmdata"));

		if(!empty($post)){
			$file_ids = $post->file_ids;
			$request_id = $post->request_id;

			if(!empty($post->is_checked)){
				$par2["where"] = "fk_request_id = {$request_id} AND  process_status = 'processing'";
				$process_files = getData("tbl_processed_request", $par2 ,"obj" );

				if(!empty($process_files)){
					$c = 0;

					foreach ($process_files as $key) {
						if($key->fk_file_id == 0){
							$set = array(
								"file_title" 		 => $key->process_file_title,
								"file_name" 		 => $key->process_file_name,
								"fk_process_user_id" => $key->fk_process_user_id,
								"fk_request_id" 	 => $key->fk_request_id,
								"date_created" 		 => date("Y-m-d"), 
							);

							insertData("tbl_subsidiary_files", $set);
						}
						else{
							$set = array(
								"fk_requested_id" => $fk_request_id,
								"fk_file_id" => $fk_file_id,
								"fk_approved_user_id" => get_user_id()
							);
							insertData("tbl_requested_files", $set);
						}
					}
				}

			}

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

			deleteData("tbl_processed_request", array("fk_request_id" => $request_id));

			$response = array("code"=> 200, "data" => []);

			if($this->will_send_email){
				$par["select"] = "*";
				$par["where"]  = "req.request_id = $request_id";
				$par["join"]   = array(
					"tbl_requests req" => "req.user_id = u_detail.user_id",
				);

				$resp = getData("tbl_user_details u_detail", $par, "obj");
				send_notification($resp[0]->user_id, "Your request file has been approved");
				$messge = $this->html_email($resp);
				$is_sent = sendemail("prospteam@gmail.com", $messge, "File Request", "CMBC Notification");
			}
		}
		
		echo json_encode($response);
	}

	public function api_delete_request(){

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

	private function get_files_request($status="", $result= "json"){
		$response = array("code"=> 204, "data" => []);
		$par["select"] ="request_id, req.user_id, comment, req.company_id, req.department, 	file_title, requested_date, request_status, 					firstname, lastname, requested_date, comp.company_name, req.date_approved";	
		$par["where"] ="req.request_status != 'Deleted'";

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
			$c = 0;
			foreach ($res as $key) {

				$par2["select"] = "pro.process_id, pro.date_created as p_date, fk_process_user_id, process_file_name, process_file_title, comp.company_id, fk_process_user_id, user_d.firstname, user_d.lastname, company_name, company_email, user_d.email_address";
				$par2["where"]  = "pro.fk_request_id = {$key['request_id']} AND process_status = 'processing'";
				$par2["join"]   = array(
					"tbl_requests req" => "req.request_id = pro.fk_request_id",
					"tbl_user_details user_d" => "user_d.user_id = pro.fk_process_user_id",
					"tbl_companies comp" => "comp.company_id = req.company_id"
				);

				$get_users =  getData("tbl_processed_request pro", $par2);
				$res[$c]["process_details"] = $get_users;
				$c++;
			}

			$response = array("code"=> 200, "data" => $res);
		}

		if($result == "array"){
			return $res;
		}
		else{
			echo json_encode($response);
		}

	}


	// Manage Investors

	public function api_get_investors(){

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

	public function api_approve_investor(){
		
		$response = array("code"=>204, "data"=> []);
		$post = $this->input->post();

		if(!empty($post)){
			$set   = array("approved" => 1);
			$where = "user_id  = {$post['user_id']} AND user_type = 'investor'";

			updateData("tbl_users", $set, $where);

			$response = array("code"=>200, "data"=> []);

			if($this->will_send_email){
				$par["where"] 		= "user_id = {$post['user_id']}";
				$user_data    		= getData("tbl_user_details", $par, "obj");

				// sent notificions helper
				send_notification($user_data[0]->user_id, "Your account has been appoved.");

				$message = "Hi {$user_data[0]->firstname}, <br><br>";
				$message .= "Your account has been approved by the administrator. <br><br><br>";
				$message .= "<a href='".base_url("login")."'>Click this link to login</a>";
				sendemail("prospteam@gmail.com", $message , "Registration Approved", "CMBC Notification");
			}
		}

		echo json_encode($response);

	}

	public function api_update_investor_status(){

		$response	 = array("code"=>204, "data"=> []);
		$user_id	 = $this->input->post("user_id");
		$user_status = $this->input->post("user_status");

		if(!empty($user_id) && isset($user_status)){
			$set   = array("approved" => $user_status);
			$where = "user_id  = {$user_id} AND user_type = 'investor'";

			updateData("tbl_users", $set, $where);

			$response = array("code"=>200, "data"=> []);

			if($this->will_send_email){
				
			}
		}

		echo json_encode($response);

	}

	public function api_assigned_company(){

		$response	 = array("code"=>204, "data"=> []);

		$post = json_decode($this->input->post("frmdata"));

		if(!empty($post->user_id)){

			if(!empty($post->comp_ids)){
				
				foreach ($post->comp_ids as $comp_id) {
					$set = array(
						"user_id" 	 => $post->user_id,
						"company_id" => $comp_id,
						"status" 	 => "joined",
					);
					insertData("tbl_user_company", $set);
				}

				$response	 = array("code"=>200, "data"=> []);
			}

			if(!empty($post->un_comp_ids)){

				foreach ($post->un_comp_ids as $comp_id) {

					$where = "user_id = {$post->user_id} AND company_id = $comp_id";
					deleteData("tbl_user_company", $where);

					$response	 = array("code"=>200, "data"=> []);
				}

			}

		}

		echo json_encode($response);

	}
	
	// manage companies functions

	public function api_save_company(){

		$response = array("code"=>204, "data"=> []);
		$post 	  = json_decode($this->input->post("frmdata"));

		if(!empty($post)){
			if($this->is_exist_company($post)){
				$response 	= array("code"=>204, "message"=> "Email address or company name was already used!");
			}
			else{
				$set = array(
					"company_name" 		=> $post->company_name,
					"address" 			=> $post->address,
					"company_contact"   => $post->company_contact,
					"company_email" 	=> $post->company_email,
					"remarks" 			=> $post->remarks,
					"company_type" 		=> "subsidiary",
					"company_status" 	=> "active",
				);

				insertData("tbl_companies", $set);
				$response = array("code"=>200, "data"=> []);
			}

		}

		echo json_encode($response);

	}

	private function is_exist_company($comp){
		$par["select"] = "*";
		$par["where"] = "company_name = '{$comp->company_name}' OR company_email = '{$comp->company_email}'";
		
		$res = getData("tbl_companies", $par);

		if(!empty($res)){
			return true;
		}
		return false;
	}

	public function api_delete_company(){
		
		$response 	= array("code"=>204, "data"=> []);
		$company_id = $this->input->post("company_id");

		if(!empty($company_id)){
			$set = array("company_status" => "deleted");
			$where = "company_id = {$company_id}";
			updateData("tbl_companies", $set, $where);

			$response = array("code"=>200, "data"=> []);
		}
		
		echo json_encode($response);

	}

	public function api_update_company(){
		
		$response 	= array("code"=>204, "data"=> []);
		$post 	  	= json_decode($this->input->post("frmdata"));
		
		if(!empty($post)){

				$set = array(
					"company_name" 		=> $post->company_name,
					"address" 			=> $post->address,
					"company_contact"   => $post->company_contact,
					"company_email" 	=> $post->company_email,
					"remarks" 			=> $post->remarks,
				);
				$where = "company_id = {$post->company_id}";
				updateData("tbl_companies", $set, $where);

				$response = array("code"=>200, "data"=> []);
		}
		
		echo json_encode($response);

	}

	// notifications

	public function api_delete_notification(){

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

	public function api_update_notification($notify_id){

		if(!empty($notify_id)){

				$set 	= array( "is_read" => 1 );
				$where  = array( "notify_id" => $notify_id );
				updateData("tbl_notification", $set, $where);
				$response = array("code"=>200, "data"=> []);
		}
		
		redirect(base_url("admin/notifications"));
	}

	// manage event

	public function save_event(){

		$post = $this->input->post();
		$post_file = "dummy.jpg";

		if(!empty($_FILES)){
			$settings['upload_path'] = "./assets/uploads/";
			$file_name				 = "post_image-".time();
			$settings['file_name'] 	 = $file_name;

			if(upload_file($_FILES, $settings)){
				$post_file = $file_name.$this->upload->data('file_ext');
			}
		}

		if(!empty($post)){

			$set = array(
				"fk_user_id" 	=> get_user_id(),
				"event_title" 	=> $post["event_title"],
				"event_content" => $post["event_desc"],
				"date_created" 	=> date("Y-m-d"),
				"event_status" 	=> 1,
				"event_image" 	=> $post_file
			);

			insertData("tbl_events", $set);
			swal_data("Successfully Added");
		}
		else{
			swal_data("Saving Failed!", "error");
		}

		redirect(base_url("admin/manage_events"));

	}


	public function update_event(){

		$post = $this->input->post();
		$post_file = "dummy.jpg";
		
		if(!empty($post["image_name"])){
			$post_file = $post["image_name"];
		}

		if(!empty($_FILES)){
			$settings['upload_path'] = "./assets/uploads/";

			if($post_file != "dummy.jpg"){
				unlink($settings['upload_path'].$post_file);
			}
			
			$file_name				 = "post_image-".time();
			$settings['file_name'] 	 = $file_name;

			if(upload_file($_FILES, $settings)){
				$post_file = $file_name.$this->upload->data('file_ext');
			}
		}

		if(!empty($post)){

			$event_id = $post["event_id"];

			$set = array(
				"fk_user_id" 	=> get_user_id(),
				"event_title" 	=> $post["event_title"],
				"event_content" => $post["event_desc"],
				"event_status" 	=> 1,
				"event_image" 	=> $post_file
			);

			updateData("tbl_events", $set, array("event_id" => $event_id));
			swal_data("Updated Successfully");
		}
		else{
			swal_data("Update Failed!", "error");
		}

		redirect(base_url("admin/manage_events"));

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
	
	// for testing only
	public function sent_test_email(){

		exit;
		 $object = (object) [
				'email_address' => 'sample@com',
				'firstname' => "opet",
				'department' => "HR",
				'requested_file' => "test file",
		 ];
		 $arr = [$object];


		$messge = $this->html_email($arr);
		$is_sent = sendemail("prospteam@gmail.com", $messge, "File Request", "CMBC Notification");
		if($is_sent){
			echo 1;	
		}else{
			echo 2;
		}

	}

}
