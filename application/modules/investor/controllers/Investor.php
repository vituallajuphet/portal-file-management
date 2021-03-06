<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Investor extends MY_Controller {
	
	// Replace to true to send email notifications
	protected $willSendEmail = true;

	public function index(){
		redirect(base_url("investor/files"));
	}
	// manage requests 
	public function manage_request()
	{
		$data["title"] ="Investor Manage Requests";
		$data["page_name"] ="InvestorRequest";
		$data['has_header']="Request_header";
		$data['has_footer']="Request_footer";
		$data['has_modal']="includes/file_modal";
		
		$data['all_departments']=get_departments();
		$data['company_email']= get_my_company();
		
		$this->load_investor_page('Request_index',$data);
	}
	// files page here
	public function files(){
		$data['has_header']="files_index_header.php";
		$data['has_footer']="files_index_footer.php";
		$data['has_modal']="includes/file_modal";
		$data["title"] = "Files";
		$this->load->library('myconfig');
		$data['viewable_files']=$this->myconfig->viewable_files();
		
		$data['all_departments']=get_departments();
		$response = [];
		$my_comp = get_my_company();
		if(!empty($my_comp)){
			$arr_comp = [];
			foreach ($my_comp as $key => $value) {
				array_push($arr_comp, $value->company_id);
			}
			$par["select"] = "*";
			$par["where"] = "request_status = 'Completed' AND user_id = ".get_user_id();
			$par["where_in"] = array(
				"col" => "req.company_id",
				"value" => $arr_comp,
			);
			$par["join"] =array(
				"tbl_companies comp" => "comp.company_id = req.company_id"
			);

			$response = getData("tbl_requests req", $par, "obj");

			$par["where_in"] = null;

			$arr=[];

			if(!empty($response)){
				$c = 0;

				foreach ($response as $key => $value) {
					$par["select"] = "*";
					$par["where"] = "req_file.fk_requested_id = $value->request_id AND file.file_status != 'deleted'";
					
					$par["join"] = array(
						"tbl_files file" => "file.files_id = req_file.fk_file_id"
					);

					$requested_file = getData("tbl_requested_files req_file", $par, "obj");


					$par3["select"] = "*";
					$par3["where"]  = "sub_file.fk_request_id = $value->request_id";
					$sub_files 		= getData("tbl_subsidiary_files sub_file", $par3, "obj");

					$get_restricted = [];
					$get_files = [];

					if(!empty($requested_file)){
						$cc=0;

						foreach ($requested_file as $key) {
							$par2["select"] ="*";
							$par2["where"]  ="file_id =  ".$key->files_id." AND request_id = ".$key->fk_requested_id;
							$resp = getData("tbl_restricted_user", $par2, "obj");

							if(!empty($resp)){
								array_push($get_restricted, $requested_file[$cc] );
							}
							else{
								array_push($get_files, $requested_file[$cc] );
							}
							
							$cc++;
						}
					}

					if(!empty($sub_files)){
						$cc = 0;
						foreach ($sub_files as $key) {
							
							array_push($get_files, $sub_files[$cc] );
							$cc++;
						}
					}

					$response[$c]->restricted = $get_restricted;
					$response[$c]->file_data = $get_files;
					
					$c++;
				}
			}
		}

		$data["files_rows"] = $response;
		$data['company_email']= get_my_company();		
		// get companies
		$par2["select"] = "*";
		$par2["join"] = array("tbl_user_company"=> "tbl_companies.company_id = tbl_user_company.company_id") ;
		$par2["where"] = array( "tbl_user_company.user_id" => get_user_id(), "tbl_user_company.status"=>"joined" );
		$data["comp"] = $this->MY_Model->getRows('tbl_companies',$par2, "obj");
		
		$this->load_page('files_index',$data);
	}
	
	public function profile(){
		$data["title"] ="Investor Profile";
		$data["page_name"] ="profile";
		$data['has_header']="Request_header";
		$data['has_modal']="includes/profile_modal";
		$data['has_footer']="includes/profile_footer";
		// $data['has_modal']="includes/investor/modal";
		$this->load_investor_page('profile',$data);
	}
	
	public function notifications($nofi_id =""){

		if(!empty($nofi_id) && is_numeric($nofi_id)){
			$data["has_notify_id"] = $nofi_id;
			$set 	= array( "is_read" => 1 );
			$where  = array( "notify_id" => $nofi_id );
			updateData("tbl_notification", $set, $where);
		}

		$data["title"] 		= "Investor - Notifications";
		$data["page_name"]  = "notifications";
		$data['has_header']	= "Request_header";
		$data['has_footer'] = "includes/notification_footer";
		$data["has_mod"] 	= "modal/notification_modal";
		$this->load_investor_page('pages/notifications',$data);

	}	

	public function dashboard(){

		$data["title"] 		= "Investor - Dashboard";
		$data["page_name"]  = "Dashboard";
		$data['has_header']	= "Request_header";
		$data['has_footer'] = "includes/dashboard_footer";
		$this->load_investor_page('pages/dashboard',$data);

	}	

	public function contact_department(){
		// $this->emaillibrary->sendmail($_POST['message-text']);
		$department = explode("|",$_POST['department']);
		$message_content = "For: $department[1] Department<br/>";
		$message_content .="Investor name: ".$this->session->userdata('firstname')." ".$this->session->userdata('lastname')."<br><br>";
		$message_content .="Message: ".$_POST['message'];
		if($this->willSendEmail){
			sendemail($department[0], $message_content,"Contact Department",null,null,$_POST['your_email'],false);
		}
		$this->session->set_flashdata("flash_data", array( "err"=>"success", "message" => "Message Sent"));
		$res = array('msg'=>'Message sent', 'err' => false);

		send_notification(1, "Investor send you an email.");

		$this->session->set_flashdata('results', $res );
		redirect(base_url("investor/files"));
	}
	
	public function view_event($event_id = 0){

		if($event_id == 0){
			redirect(base_url("investor/dashboard"));
		}

		$data["title"] 		= "Investor - Dashboard";
		$data["page_name"]  = "Dashboard";
		$data['has_header']	= "Request_header";
		

		$par["select"] = "*";
		$par["where"] = "event_id = {$event_id} AND event_status = 1";
		$par["join"]  = array("tbl_user_details user_d" => "user_d.user_id = event.fk_user_id");

		$res = getData("tbl_events event", $par, "obj");

		if(!empty($res)){
			$data["post_data"] = $res[0];
		}
		else{
			redirect(base_url("investor/dashboard"));
		}

		$this->load_investor_page('pages/view_event',$data);

	}
	
	private function get_cbmc_dept_email($dept = ""){

		$par["select"] 	= "*";
		$par["where"] 	= "user_dept.departments = '{$dept}' AND user.user_type = 'cbmc'";
		$par["join"] 	= array(
			"tbl_users user" 			 => "user_dept.user_id = user.user_id",	
		 	"tbl_user_details u_details" => "u_details.user_id = user.user_id",	
		);

		$res = getData("tbl_user_dept_details user_dept", $par, "obj");
		
		return $res;
	} 

	public function send_request_file(){
		$post = $this->input->post();
		if(!empty($post)){
			$dept_email = $post["department"];
			$title = $post["title"];
			$comment = $post["comment"];
			$par["select"] ="*";
			$par["where"] ="company_id = ".$post['company']."";
			$resp = getData("tbl_companies", $par, "obj");
			$comp_email = $resp[0]->company_email;
			
			$dept = explode("|",$post['department']);
			
			if($this->willSendEmail){
				
				$dept_user = $this->get_cbmc_dept_email($dept[1]);

				if(!empty($dept_user)){
					foreach ($dept_user as $d_user) {
						send_notification($d_user->user_id, "Investor requested a file");
					}
				}
				
				send_notification(1, "Investor requested a file");
				
				$from_info = array(
					"firstname" => $dept[1]. " Department",
					"file_title" => $title,
				);
				
				sendemail($comp_email, $html_msg, "File Request", "CBMC Notification");

				$from_info = array(
					"firstname" => "Admin",
					"file_title" => $title,
				);
				$html_msg = $this->html_msg($from_info);
				sendemail("prospteam@gmail.com", $html_msg, "File Request", "CBMC Notification");
				// sendemail($dept[0],'A investor requested for a document.');

			}
			
			$set = array(
				"comment"=> $comment,
				"user_id"=> get_user_id(),
				"company_id"=> $post['company'],
				"department"=> $dept[1],
				"file_title"=> $title,
				"requested_date"=> date("Y-m-d"),
				'date_approved' => date("0000-00-00"),
				"request_status"=> "Pending",
			);
			insertData('tbl_requests', $set);
			swal_data("Request Sent", "success");
			redirect(base_url("investor/files"));
		}
	}
	
	private function html_msg($arr = array(), $msg = "An investor requested a file."){

		$user_data = get_logged_user();	

		$html ="
			<div>
				Hi <strong>".$arr["firstname"]."</strong>,
				<br><br>
				An investor <strong>{$user_data["firstname"]} {$user_data["lastname"]}</strong> requested a file.
				<br><br><br>
			</div>
		";

		return $html;

	}

	// private function 
	
	// api request functions
	public function get_file_requests($pars = 0){
		$res = [];
		$my_id = $this->session->userdata("user_id");

		$param["where"] = array("user_id"=> $my_id, "status "=> "joined");
		$param["select"] = "company_id";
		$getCom = getData("tbl_user_company", $param, "obj");
		$my_comp = [];

		if(!empty($getCom)){

			foreach ($getCom as $comp) {
				array_push($my_comp, $comp->company_id);
			}

			$request_data = $this->db->
			select("*")->
			from('tbl_requests r')->
			join('tbl_companies c', "r.company_id = c.company_id")->
			where_in("r.company_id", $my_comp)->
			where("r.user_id", $my_id)->
			get()->result();

			if(!empty($request_data)){
				$results = $request_data;

				foreach ($results as $result) {

					if($result->request_status == "Completed"){
						$r_id = $result->request_id;

						$is_sub_prepared = false;
						$has_file = false;

						$ret_data = [];

						$approvedData = $this->db->
						select("*")->
						from('tbl_files f')->
						join('tbl_requested_files rf', "f.files_id = rf.fk_file_id")->
						join('tbl_requests r', "r.request_id = rf.fk_requested_id ")->
						join('tbl_companies c', "r.company_id = c.company_id")->
						where("r.request_id", $r_id)->
						get()->result();

						$par3["select"] = "*";
						$par3["where"]  = "fk_request_id = $r_id";
						$par3["join"]	= array(
							"tbl_requests req" => "req.request_id = sub_file.fk_request_id",
							"tbl_companies comp" => "comp.company_id = req.company_id",
						);
						$sub_data = getData("tbl_subsidiary_files sub_file", $par3, "obj");

				
						if(!empty($approvedData)){
							$get_attached = $this->db->
							select("file_name, file_title, f.files_id, rf.fk_requested_id")->
							from('tbl_files f')->
							join('tbl_requested_files rf', "f.files_id = rf.fk_file_id")->
							where('rf.fk_requested_id', $r_id)->
							get()->result_array();

							$get_restricted = [];

							if(!empty($get_attached)){
								$has_file = true;
								$c=0;

								foreach ($get_attached as $key) {
									$par2["select"] = "*";
									$par2["where"] = "file_id =  ".$key["files_id"]." AND request_id = ".$key["fk_requested_id"]."";
									$resp = getData("tbl_restricted_user", $par2, "obj");
									
									if(!empty($resp)){
										array_push($get_restricted, $get_attached[$c] );
										unset($get_attached[$c]);	
									}
									
									$c++;
								}
								
							}

							$approvedData[0]->{"restricted"} = $get_restricted;
							$approvedData[0]->{"attachments"} = $get_attached;
				
						}
						
						// sub data here
						
						if(!empty($sub_data)){
							
							$attachments = [];
							$c = 0;
							foreach ($sub_data as $key) {
								
								$file_meta = array(
									"file_name" => $key->file_name,
									"file_title" => $key->file_title,
									"fk_request_id" => $key->fk_request_id,
									"sub_file_id" => $key->sub_file_id,
								);

								
								if($has_file){
									array_push($approvedData[0]->attachments, $file_meta );
								}

								$c++;
							}
						}

						array_push($res, $approvedData[0]);
						
					}
					else{
						array_push($res, $result);
					}
				}
			}
		}

		if($pars == 1){
			$resp  = array("code" => 200, "data" => $res);
		}else{
			$resp = $res;
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
	
	private function user_exists ($user){
		$par["select"] = "*";
		$user_id = $user['user_id'];
		$email = $user['email_address'];
		$username = $user['username'];
		$par["join"] = array("tbl_user_details" => "tbl_user_details.user_id = tbl_users.user_id" );
		$par["where"] = "tbl_users.user_id != '$user_id' AND (tbl_users.username = '$username' OR tbl_user_details.email_address = '$email')";
		$res=$this->MY_Model->getRows('tbl_users', $par);
		if(!empty($res)){
			return true;
		}
		return false;
	}
	

	
	public function api_update_propic(){
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
	
	public function send_message_investor(){
		// sendemail("prospteam@gmail.com", "this is a test");
	}
	
	public function request_a_file(){
		
	}


	public function get_dashboard_data(){
		


	}
	
}
