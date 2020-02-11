<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Investor extends MY_Controller {

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

				// GETTING FILES
				$data['files_rows']=$this->db->
					select("*")->
					from('tbl_files')->
					where('file_company_id',$this->session->userdata('company_id'))->
					join('tbl_companies','tbl_companies.company_id = tbl_files.file_company_id')->
					get()->result();

				$data['company_email']= get_my_company();

				// get companies
				$par["select"] = "*";
				$par["join"] = array("tbl_user_company"=> "tbl_companies.company_id = tbl_user_company.company_id") ;
				$par["where"] = array( "tbl_user_company.user_id" => get_user_id(), "tbl_user_company.status"=>"joined" );
				$data["comp"] = $this->MY_Model->getRows('tbl_companies',$par, "obj");
				
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

		public function contact_department(){
				// $this->emaillibrary->sendmail($_POST['message-text']);
				$department = explode("|",$_POST['department']);
				$message_content = "For: $department[1] Department<br/>";
				$message_content .="Investor name: ".$this->session->userdata('firstname')." ".$this->session->userdata('lastname')."<br><br>";
				$message_content .="Message: ".$_POST['message'];
				
				sendemail($department[0], $message_content,"Contact Department",null,null,$_POST['your_email'],false);
				$this->session->set_flashdata("flash_data", array( "err"=>"success", "message" => "Message Sent"));
				$res = array('msg'=>'Message sent', 'err' => false);
				$this->session->set_flashdata('results', $res );
				redirect(base_url("investor/files"));
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

				sendemail($comp_email,'An investor requested for a document.');
				sendemail($dept[0],'A investor requested for a document.');
				$set = array(
					"comment"=> $comment,
					"company_id"=> $post['company'],
					"department"=> $dept[1],
					"file_title"=> $title,
					"requested_date"=> date("Y-m-d"),
					"request_status"=> "Pending",
				);
				$this->MY_Model->insert('tbl_requests', $set);
				$this->session->set_flashdata("flash_data", array( "err"=>"success", "message" => "Request Sent"));
				$msgs = array('msg'=>'Request Sent', 'err' => false);
				$this->session->set_flashdata('results', $msgs );
				redirect(base_url("investor/files"));
			}
		}

		// private function 

		// api request functions
		public function get_file_requests(){
				$res = [];
				$my_id = $this->session->userdata("user_id");
				$param["where"] = array("user_id"=> $my_id, "status "=> "joined");
				$param["select"] = "company_id";
				$getCom = $this->MY_Model->getRows("tbl_user_company", $param, "obj");
				$my_comp = [];
			 if(!empty($getCom)){
				foreach ($getCom as $comp) {
					array_push($my_comp, $comp->company_id);
				}
			 }
				$request_data = $this->db->
					select("*")->
					from('tbl_requests r')->
					join('tbl_companies c', "r.company_id = c.company_id")->
					where_in("r.company_id", $my_comp)->
					get()->result();
				if(!empty($request_data)){
					$results = $request_data;
					foreach ($results as $result) {
						if($result->request_status == "Completed"){
							$r_id = $result->request_id;
							$approvedData = $this->db->
									select("*")->
									from('tbl_files f')->
									join('tbl_requested_files rf', "f.files_id = rf.fk_file_id")->
									join('tbl_requests r', "r.request_id = rf.fk_requested_id ")->
									join('tbl_companies c', "r.company_id = c.company_id")->
									where("r.request_id", $r_id)->
									get()->result();
							if(!empty($approvedData)){
								$get_attached = $this->db->
									select("file_name")->
									from('tbl_files f')->
									join('tbl_requested_files rf', "f.files_id = rf.fk_file_id")->
									where('rf.fk_requested_id', $r_id)->
									get()->result_array();
									$approvedData[0]->{"attachments"} = $get_attached;
						 	}
						    array_push($res, $approvedData[0]);
						}else{
							array_push($res, $result);
						}
					}
				}
				 echo json_encode($res);
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
				
	// test function
	public function test_here(){
		$content ="<h1>sample</h1>";
		if(sendemail("prospteam@gmail.com", $content)){
			echo 1;
		}else{
			echo 2;
		}

		exit;
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
		
	}

	public function request_a_file(){
		
	}

}
