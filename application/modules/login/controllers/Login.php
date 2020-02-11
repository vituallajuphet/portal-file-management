<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends MY_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->helper('email');
	}
	public function index(){
		 $data["title"] = "Login Account";
		 $data["has_footer"] = "footer_index";
         $this->load_login_page('index', $data);
	}

	public function register(){
        //   $this->load_page('register');
	}

	public function process_register(){
		$post = $this->input->post();
		if(!empty($post)){
			$firstname = $this->input->post("firstname");
			$lastname = $this->input->post("lastname");
			$email = $this->input->post("email");
			$contact = $this->input->post("contact");
			$username = $this->input->post("username");
			$password = $this->input->post("password");
			$confirm_password = $this->input->post("confirm_password");
			$this->form_validation->set_rules('firstname','Firstname','required');
			$this->form_validation->set_rules('lastname','Lastname','required');
			$this->form_validation->set_rules('username','Username','required');
			$this->form_validation->set_rules('contact','Contact','required');
			$this->form_validation->set_rules('email','email','required');
			$this->form_validation->set_rules('password','Password','required');
            $this->form_validation->set_rules('confirm_password','confirm_password','required');
            $_SESSION["register_data"] =$post;
			if($this->form_validation->run() == false){
			 	 $msg = array( "err"=>"error", "message" => "Please input the required field.");
			}else{
				if($password != $confirm_password){
					$msg = array( "err"=>"error", "message" => "Password does not match.");
				}else{

					if(!valid_email($email)){
						$msg = array( "err"=>"error", "message" => "The email address is invalid." );
					}
					elseif($this->user_exists($post)){
						$msg = array( "err"=>"error", "message" => "Email Address or Username is already used." );
					}else{
						$settings['upload_path'] = "./assets/registration_files/";
						$filepath = $settings['upload_path'].$_FILES["file"]["name"];
						if(file_exists($filepath)){
							if(empty($_FILES["file"]["name"])){
								$msg = array( "err"=>"error", "message" => "Please upload the required documents.");
							}else{
								$msg = array( "err"=>"error", "message" => "The file is already exists.");
							}
						}
						else{
							if(upload_file($_FILES, $settings)){
								$set = array(
									'username'=> $username,
									'password'=> password_hash($password, PASSWORD_DEFAULT),
									'user_status'=> 1,
									'user_type'=> "investor",
									'approved'=> 0,
								);
								$this->db->insert("tbl_users",$set);
								$user_id = $this->db->insert_id();
								$set = array(
									'user_id'=> $user_id,
									'firstname'=> $firstname,
									'lastname'=> $lastname,
									'email_address'=> $email,
									'contact_number'=> $contact,
									'profile_picture'=> "",
									'created_date' => date("Y-m-d H:i:s"),
									'updated_date' => date("0000-00-00 00:00:00"),
								);
								$this->db->insert("tbl_user_details",$set);
								$set = array(
									'user_id'=> $user_id,
									'file_name'=> $_FILES["file"]["name"],
									'status'=> 1,
									'approved'=> 0,
								);
								$this->db->insert("tbl_registration_files",$set);
                                $msg = array( "err"=>"success", "message" => "Registered Successfully");
                                unset($_SESSION["register_data"]);
							}
							else{
								$msg = array( "err"=>"error", "message" => "Upload failed");
							}
						}
					}
				}
			}
		}else{
			$msg = array( "err"=>"error", "message" => "Please input the required fields.");
		}
		if(isset($msg)){
				$this->session->set_flashdata("flash_data", $msg);
				redirect(base_url("login#/register"));
		}
	}

	public function process_login(){
		$email = $this->input->post("email");
		$password = $this->input->post("password");
		$this->form_validation->set_rules('email', 'Email', 'required');
		$this->form_validation->set_rules('password','Password','required');
		if($this->form_validation->run() == false){
			$msg = array( "err"=>"error", "message" => "Please check your email and password!");
			$this->session->set_flashdata("flash_data", $msg);
			redirect(base_url("login"));
		}else{
			$res =$this->db->
					select("*")->
					from('tbl_users')->
					join('tbl_user_details', "tbl_user_details.user_id = tbl_users.user_id")->
					where('tbl_user_details.email_address', $email)->
					or_where('tbl_users.username', $email)->
					get()->result();
			if(!empty($res)){
				if (password_verify($password, $res[0]->password)) {
					if($res[0]->user_type =="investor" &&  $res[0]->approved == 0){
						$msg = array( "err"=>"error", "message" => "Your account has not approved yet!" );
					}else{

						$getDept = [];
						if($res[0]->user_type =="cbmc"){
							$user_id = $res[0]->user_id;
							$par["where"] = "user_id = '$user_id' AND status = 1";
							$getDept = getData("tbl_user_dept_details", $par);
						}

						$userdata = array(
							"user_id"=> $res[0]->user_id,
							"firstname"=> $res[0]->firstname,
							"lastname"=> $res[0]->lastname,
							"user_type"=> $res[0]->user_type,
							"username"=> $res[0]->username,
							"approved"=> $res[0]->approved,
							"department"=> $getDept,
							"password"=> $password,
							"profile_picture"=> $res[0]->profile_picture,
							"user_status"=> $res[0]->user_status,
							"email_address"=> $res[0]->email_address,
							"contact_number"=> $res[0]->contact_number,
							"company_id"=> $res[0]->company_id,
							"is_logged"=> true,
							// "logged_in"=> true,
						);
						$this->session->set_userdata($userdata);
						if($res[0]->user_type =="investor"){
							redirect(base_url("files"));
						}elseif ($res[0]->user_type =="admin"){
							redirect(base_url("admin"));
						}else{
							redirect(base_url());
						}
						
					}
				}else{
					$msg = array( "err"=>"error", "message" => "Incorrect Email Address or Password" );
				}
			}else{
				$msg = array( "err"=>"error", "message" => "Incorrect Email Address or Password" );

			}
		}
		if(!empty($msg)){
			$this->session->set_flashdata("flash_data", $msg);
			redirect(base_url("login"));
		}
	}
	public function request_new_password(){
		$email = $this->input->post("email");
		if($email){
			if($this->isEmailExist($email)){
				$msg = array( "err"=>"error", "message" => "We have already sent a link to your email.");
			}else{
				$getUser =$this->db->
					select("*")->
					from('tbl_users')->
					join('tbl_user_details', 'tbl_user_details.user_id = tbl_users.user_id')->
					where('tbl_user_details.email_address', $email)->
					get()->result();
				if(empty($getUser)){
					$msg = array( "err"=>"error", "message" => "This email address is not registered!" );
				}else{
					$permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
					$strkey = substr(str_shuffle($permitted_chars),0 ,30);
					$msglink = base_url('login#/updatepassword'). "/".$strkey;

					$content ="Hi, <strong>".$getUser[0]->firstname."</strong> <br/> <br/>";
					$content .= "Please confirm your password by clicking the link below: <br/> ".  $msglink;
					if(sendemail($email, $content, "Forgot Password")){
						$set = array( 'value' => $strkey, 'status' => 1, 'user_id' =>$getUser[0]->user_id, 'email' => $email );
						$this->db->insert("tbl_forgotpassword_keys", $set);
						$msg = array( "err"=>"success", "message" => "Please check your email to verify your password.");
					}
					else{
						$msg = array( "err"=>"error", "message" => "Unable to send email!");
					}
					$this->session->set_flashdata("flash_data", $msg);
				}
			}
			$this->session->set_flashdata("flash_data", $msg);
			redirect(base_url("login#/forgotpassword"));
		}
	}

	// private function
	private function user_exists ($user){
		$res =$this->db->
			select("email_address")->
			from('tbl_users')->
			join('tbl_user_details', "tbl_user_details.user_id = tbl_users.user_id")->
			where('tbl_user_details.email_address', $user["email"])->
			or_where('tbl_users.username', $user["username"])->
			get()->result();
	   if(!empty($res)){
		  return true;
	   }
  	    return false;
	}

	private function isEmailExist ($email){
		$res =$this->db->
			select("*")->
			from('tbl_forgotpassword_keys')->
			where('email', $email)->
			get()->result();
		if(!empty($res)){
			return true;
		}
		return false;
	}

	public function verify_password_key (){
	  $keys =$this->input->post("passwordkey");
	  if($keys){
		  $res =$this->db->
				select("user_id")->
				from('tbl_forgotpassword_keys')->
				where('value', $keys)->
				get()->result();

		  if(!empty($res)){
			$resp = array( "message" => "success", "code" => 200 );
		  }else{
			 $resp = array( "message" => "failed", "code" => 204 );
		  }
	  }else{
		 $resp = array( "message" => "failed", "code" => 204 );
	  }
	  echo json_encode($resp);
	}

	public function update_new_password (){
	  $keys =$this->input->post("token");
	  $password =$this->input->post("password");
	  if($keys){
		  $res =$this->db->
				select("user_id")->
				from('tbl_forgotpassword_keys')->
				where('value', $keys)->
				get()->result();

		  if(!empty($res)){
			$set = array( 'password'=>  password_hash($password, PASSWORD_DEFAULT) );
			$this->db->
			where("user_id", $res[0]->user_id)->
			update("tbl_users",$set);

			$this->db->
			where("value", $keys)->
			delete("tbl_forgotpassword_keys");

			$resp = array( "message" => "success", "code" => 200 );
		  }else{
			 $resp = array( "message" => "failed", "code" => 204 );
		  }

	  }else{
		 $resp = array( "message" => "failed", "code" => 204 );
	  }
	  echo json_encode($resp);
	}

	// test function
	public function test_here(){
		// $content ="<h1>sample</h1>";
		// if(sendemail("prospteam@gmail.com", $content)){
		// 	echo 1;
		// }else{
		// 	echo 2;
		// }
		$par["select"] = "*";
		$par["where"] = array("tbl_user_company.user_id" => 11);
		$par["join"] = array("tbl_companies" => "tbl_companie.company_id = tbl_user_company.company_id");
		$res = $this->MY_Model->getRows('tbl_user_company',$par);
		echo '<pre>';
		print_r($res);
		echo '</pre>';
		exit;
	}


}
