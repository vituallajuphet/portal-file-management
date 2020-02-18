<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends MY_Controller {
	
	public function __construct(){
		parent::__construct();
	}
	
	public function index(){
		// $data["title"] ="Administrator";
		// $data["page_name"] ="home";
		// $data['has_header']="header_index.php";
		// $data['has_footer']="footer_index.php";
		// $this->load_admin_page('pages/Admin_index',$data);
		redirect(base_url("admin/manage_users"));
	}
	public function profile(){
		$data["title"] ="Admin - Profile";
		$data["page_name"] ="profile";
		$data['has_header']="header_index.php";
		$data['has_footer']="includes/profile_footer";
		$data['has_modal']="includes/profile_modal";
		$this->load_admin_page('pages/Profile',$data);
	}
	
	public function manage_users(){
		$data["title"] ="Admin - Manage Users";
		$data["page_name"] ="manage_users";
		$data["has_mod"] ="modal/manage_user_mod";
		$data['has_header']="header_index.php";
		$data['has_footer']="includes/manage_user_footer";
		$this->load_admin_page('pages/Manage_users',$data);
	}
	
	
	public function department_user(){
		$data["title"] ="Admin - department users";
		$data["page_name"] ="department_users";
		$data['has_header']="header_index.php";
		$data["has_mod"] ="modal/dept_user_modal";
		$data['has_footer']="includes/manage_dept_user_footer";
		$this->load_admin_page('pages/Manage_dept_user',$data);
	}
	
	public function companies(){
		$data["title"] ="Admin - Companies";
		$data["page_name"] ="companies";
		$data['has_header']="header_index.php";
		// $data['has_footer']="includes/manage_dept_user_footer";
		// $this->load_admin_page('pages/manage_dept_user',$data);
		$this->load_admin_page('includes/development',$data);
		
	}
	
	public function manage_request(){
		$data["title"] ="Admin - Requests";
		$data["page_name"] ="file_request";
		$data['has_header']="header_index.php";
		// echo "This page is under development";
		// $data['has_footer']="includes/manage_dept_user_footer";
		$this->load_admin_page('includes/development',$data);
	}
	
	public function manage_files(){
		$data["title"] ="Admin - Manage files";
		$data["page_name"] ="manage_files";
		$data['has_header']="header_index.php";
		$data['has_footer']="includes/manage_file_footer";
		$this->load_admin_page('pages/Manage_files',$data);
		// $data['has_footer']="includes/manage_dept_user_footer";
		// $this->load_admin_page('pages/manage_dept_user',$data);
	}
	
	public function investors(){
		$data["title"] ="Admin - Investors";
		$data["page_name"] ="investors";
		$data['has_header']="header_index.php";
		// echo "This page is under development";
		// $data['has_footer']="includes/manage_dept_user_footer";
		$this->load_admin_page('includes/development',$data);
	}
	// ----------------------------------------private functionm ---------------------
	
	private function user_exists ($user){
		$par["select"] = "*";
		$user_id = $user['user_id'];
		$email = $user['email_address'];
		$username = $user['username'];
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
			$this->MY_Model->update('tbl_user_details', $set, $where);
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
			else{
				$set = array(
					"username" => $post->username,
					"password" => password_hash($post->password, PASSWORD_DEFAULT),
				);
				$where= array( "user_id" => $post->user_id );
				$this->MY_Model->update('tbl_users', $set, $where);
				$set = array(
					"firstname" => $post->firstname,
					"lastname" =>  $post->lastname,
					"email_address" =>  $post->email_address,
					"contact_number" =>  $post->contact_number,
					"updated_date" =>  date("Y-m-d H:i:s")
				);
				$this->MY_Model->update('tbl_user_details', $set, $where);
				$userdata = array(
					"user_id"=> $post->user_id,
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
			$par["select"] = "*";
			$par["where"] = "u.user_type = '$usertype'";
			$par["join"] = array( 
				'tbl_user_details ud' => 'u.user_id = ud.user_id', 
				'tbl_companies c' => 'c.company_id = ud.company_id'  
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
		$par["select"] = "*";
		$par["where"] = "u.user_status = 1 AND u.approved = 1 AND u.user_type = 'subsidiary'" ;
		$par["join"] = array( 
			'tbl_user_details ud' => 'u.user_id = ud.user_id', 
		);
		$res = getData('tbl_users u', $par, "obj");
		if(!empty($res)){
			$response = array("code"=>200, "data"=> $res);
			for ($i=0; $i < count($res); $i++) {
				$par2["select"] ="*"; 
				$par2["where"] = "user_id = ".$res[$i]->user_id." AND status = 'joined'" ;
				$par2["join"]= array("tbl_companies" => "tbl_companies.company_id = tbl_user_company.company_id");
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
		$response = array( "code"=>204, "data"=>[], "message"=>"Please Fill-up the required fields!" );
		$post = json_decode($this->input->post("frmdata"));
		if(!empty($post)){
			if(!has_empty($post)){
				$checkUser = array( "email_address"=>$post->email_address, "username"=>$post->username);
				if($this->user_exist($checkUser)){
					$response = array( "code"=>204, "data"=>[], "message"=>"Username or Email address is already used!" );
				}
				else{
					$set = array(
						"username"=>$post->username,
						"password"=>password_hash($post->password, PASSWORD_DEFAULT),
						"user_status"=>1,
						"user_type"=>"cbmc",
						"approved"=>1,
					);
					$last_id = insertData("tbl_users", $set);
					$set = array(
						"user_id"=>$last_id,
						"firstname"=>ucfirst($post->first_name),
						"lastname"=>ucfirst($post->last_name),
						"email_address"=>$post->email_address,
						"contact_number"=>$post->contact_number,
						"profile_picture"=>"",
						'created_date' => date("Y-m-d H:i:s"),
						'updated_date' => date("0000-00-00 00:00:00"),
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
		$post = json_decode($this->input->post("frmdata"));
		if(!empty($post)){
			if(!has_empty($post)){
				$checkUser = array( "email_address"=>$post->email_address, "username"=>$post->username);
				if($this->user_exist($checkUser, $post->user_id)){
					$response = array( "code"=>204, "data"=>[], "message"=>"Username or Email address is already used!" );
				}
				else{
					$set = array( "username"=>$post->username );
					$where ="user_id =  $post->user_id";
					$updated = updateData("tbl_users", $set, $where);
					if($updated){
						$set = array(
							"firstname"=>ucfirst($post->first_name),
							"lastname"=>ucfirst($post->last_name),
							"email_address"=>$post->email_address,
							"contact_number"=>$post->contact_number,
							'updated_date' => date("Y-m-d H:i:s"),
						);
						updateData("tbl_user_details", $set, $where);
						$deleted = deleteData("tbl_user_dept_details", $where);
						if($deleted){
							$depts = $post->departments;
							for ($i=0; $i < count($depts); $i++) { 
								$set= array(
									"user_id"=>$post->user_id,
									"departments"=>$depts[$i]->dept_name,
									"status"=>1,
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
		$post = json_decode($this->input->post("frmdata"));
		if(!empty($post)){
			if(!has_empty($post)){
				$checkUser = array( "email_address"=>$post->email_address, "username"=>$post->username);
				if($this->user_exist($checkUser, $post->user_id)){
					$response = array( "code"=>204, "data"=>[], "message"=>"Username or Email address is already used!" );
				}
				else{
					$set = array( "username"=>$post->username );
					$where ="user_id =  $post->user_id";
					$updated = updateData("tbl_users", $set, $where);
					if($updated){
						$set = array(
							"firstname"=>ucfirst($post->first_name),
							"lastname"=>ucfirst($post->last_name),
							"email_address"=>$post->email_address,
							"contact_number"=>$post->contact_number,
							'updated_date' => date("Y-m-d H:i:s"),
						);
						updateData("tbl_user_details", $set, $where);
						$deleted = deleteData("tbl_user_company", $where);
						if($deleted){
							$comps = $post->companies;
							for ($i=0; $i < count($comps); $i++) { 
								$set= array(
									"user_id"=>$post->user_id,
									"company_id"=>$comps[$i]->company_id,
									"status"=>"joined",
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
		$post = json_decode($this->input->post("frmdata"));
		if(!empty($post)){
			if(!has_empty($post)){
				$checkUser = array( "email_address"=>$post->email_address, "username"=>$post->username);
				if($this->user_exist($checkUser)){
					$response = array( "code"=>204, "data"=>[], "message"=>"Username or Email address is already used!" );
				}
				else{
					$set = array(
						"username"=>$post->username,
						"password"=>password_hash($post->password, PASSWORD_DEFAULT),
						"user_status"=>1,
						"user_type"=>"subsidiary",
						"approved"=>1,
					);
					$last_id = insertData("tbl_users", $set);
					$set = array(
						"user_id"=>$last_id,
						"firstname"=>ucfirst($post->first_name),
						"lastname"=>ucfirst($post->last_name),
						"email_address"=>$post->email_address,
						"contact_number"=>$post->contact_number,
						"profile_picture"=>"",
						'created_date' => date("Y-m-d H:i:s"),
						'updated_date' => date("0000-00-00 00:00:00"),
					);
					insertData("tbl_user_details", $set);
					$comps = $post->companies;
					for ($i=0; $i < count($comps); $i++) { 
						$set= array(
							"user_id"=>$last_id,
							"company_id"=>$comps[$i]->company_id,
							"status"=>"joined",
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
		$email = $user['email_address'];
		$username = $user['username'];
		$par["join"] = array("tbl_user_details" => "tbl_user_details.user_id = tbl_users.user_id" );
		$par["where"] = "(tbl_users.username = '$username' OR tbl_user_details.email_address = '$email')";
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
		$user_id = $this->input->post("user_id");
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

	public function api_dept_user($usertype){
		$response = array("code"=>204, "data"=> []);
		if(!empty($usertype)){
			$par["select"] = "*";
			$par["where"] = "u.user_type = '$usertype' AND user_status = 1";
			$par["join"] = array( 'tbl_user_details ud' => 'u.user_id = ud.user_id' );
			$res = getData('tbl_users u', $par, "obj");
			if(!empty($res)){
				$c = 0;
				foreach ($res as $key => $value) {
					$user_id = $res[$c]->user_id;
					$par2["select"] = "*";
					$par2["where"] = "user_id =  $user_id";
					$dept = getData('tbl_user_dept_details ', $par2);
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
	// 
	
}
