<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Subsidiary extends MY_Controller {

		public function __construct(){
			parent::__construct();
			
		}

		public function index(){

			redirect(base_url("subsidiary/dashboard"));

		}

		public function investors(){

			$data["title"] ="Subsidiary - Investors";
			$data["page_name"]  = "investors";
			$data['has_header'] = "includes/subsidiary/header";
			$data['has_footer'] = "includes/investor_footer";
			$data["has_mod"]    = "modal/investor_modal";
			$this->load_subsidiary_page('pages/investors', $data);

		}

		public function manage_request(){

			$data["title"] ="Subsidiary - Requests";
			$data["page_name"] ="file_request";
			$data['has_header']="includes/subsidiary/header";
			$data["has_mod"] ="modal/manage_request_modal";
			$data['has_footer']="includes/manage_request_footer";
			$this->load_subsidiary_page('pages/Manage_request',$data);
	
		}

		public function profile(){
			$data["title"] ="Subsidiary - Profile";
			$data["page_name"] ="profile";
			$data['has_header']="includes/subsidiary/header";
			$data['has_footer']="includes/profile_footer";
			$data['has_mod']="modal/profile_modal";
			$this->load_subsidiary_page('pages/profile',$data);
		}

		public function dashboard(){
			echo "This page is under development";
		}


		// Manage Request...
		public function sub_upload_file(){

			$post = $this->input->post();
		
			if(!empty($post)){

				$request_id = $post["request_id"];

				$settings['upload_path'] = "./assets/process_files/";
				$file_name				 = "process-file-".time();
				$settings['file_name'] 	 = $file_name;

				if(upload_file($_FILES, $settings)){

					$set = array(
						"fk_request_id" 	 => $request_id,
						"fk_file_id" 		 => 0,
						"fk_process_user_id" => get_user_id(),
						"date_created" 		 =>  date("Y-m-d"),
						"process_file_name"  =>  $file_name.$this->upload->data('file_ext'),
						"process_status" 	 => "pending",
						"process_file_title" => $post["file_title"]
					);

					insertData("tbl_processed_request", $set);
					swal_data("File Uploaded successfully");

					$par["where"]  = "req.request_id = $request_id";
					$par["join"]   = array( 
						"tbl_requests req" => "req.user_id = u_detail.user_id",
						"tbl_companies comp" => "comp.company_id = req.company_id"
					);
					$userdata = getData("tbl_user_details u_detail", $par, "obj");
					$messge = $this->html_email($userdata);
					send_notification($userdata[0]->user_id, "Your request has been processed");
					$is_sent = sendemail("web2.juphetvitualla@gmail.com", $messge, "File Request", "CMBC Notification");

					$pars["where"] = "fk_request_id = {$request_id} AND fk_file_id = 0";
					$file_data	   = getData("tbl_processed_request", $pars, "obj");

					$_SESSION["upload_requested"] = array(
						"req_id" => $request_id,
						"data" 	 => $file_data
					);
				}
				else{
					$err = $this->upload->display_errors();
					swal_data(strip_tags($err), "error");
				}
			
			}else{
				swal_data("Please add a file first!", "error");
			}

			redirect(base_url("subsidiary/manage_request"));

	}
	
	public function update_user_profile(){
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
	
	  // private functions here
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
	  
		// hmtl format
	private function html_email($arr, $msg ="Your requested file has been approved."){
		
		$html ="
			<div>
				Hi {$arr[0]->firstname},
				<br><br>
				We would like to inform you that your requested file has been processed by <strong>{$arr[0]->company_name}</strong>. Once your request has been approved, you will recieve a notification via email. Thank you.
				<br><br>
				Requested File: {$arr[0]->file_title}
				<br><br>
				Sincerely,<br>
				CBMC
				
				</div>
		";

		return $html;

	}
}
