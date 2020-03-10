<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cbmc extends MY_Controller {

	public function index(){
			redirect(base_url("cbmc/profile"));
	}

	public function profile(){
		$data["title"] ="CBMC - Profile";
		$data["page_name"] ="profile";
		$data['has_header']="includes/cbmc/header";
		$data['has_footer']="includes/profile_footer";
		$data['has_modal']="includes/profile_modal";
		$this->load_cbmc_page('pages/profile',$data);
	}


      public function investors(){
		$data["title"] ="CBMC - Investors";
		$data["page_name"] ="investors";
		$data['has_header']="includes/cbmc/header";
            $data['has_footer']="includes/investor_footer";
            $data['has_modal']="modal/investor_modal";
		$this->load_cbmc_page('pages/investors',$data);
      }
      
      public function companies(){
		$data["title"] ="CBMC - Companies";
		$data["page_name"] ="companies";
		$data['has_header']="includes/cbmc/header";
            $data['has_footer']="includes/company_footer";
            $data['has_modal']="modal/company_modal";
		$this->load_cbmc_page('pages/companies',$data);
	}

     public function manage_request(){

		$data["title"] ="CBMC - Requests";
		$data["page_name"] ="file_request";
		$data['has_header']="includes/cbmc/header";
		$data["has_mod"] ="modal/manage_request_modal";
		$data['has_footer']="includes/manage_request_footer";
		$this->load_cbmc_page('pages/Manage_request',$data);

      }
      
      public function manage_files(){

		$data["title"] ="CBMC - Files";
		$data["page_name"] ="files";
		$data['has_header']="includes/cbmc/header";
		$data["has_mod"] ="modal/manage_file_modal";
		$data['has_footer']="includes/manage_file_footer";
		$this->load_cbmc_page('pages/Manage_files',$data);

		
	  }

	  public function notifications($nofi_id =""){

		if(!empty($nofi_id) && is_numeric($nofi_id)){
			$data["has_notify_id"] = $nofi_id;
			$set 	= array( "is_read" => 1 );
			$where  = array( "notify_id" => $nofi_id );
			updateData("tbl_notification", $set, $where);
		}

		$data["title"] ="CBMC - Notifications";
		$data["page_name"] ="notifications";
		$data['has_header']="includes/cbmc/header";
		$data["has_mod"] ="modal/manage_notification_modal";
		$data['has_footer']="includes/notification_footer";
		$this->load_cbmc_page('pages/Notifications',$data);
	}

	
// api here
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
	  
		

      // manage files

      public function save_file_data(){
		$post = $this->input->post();

		if(!empty($post)){
			$settings['upload_path'] = "./uploaded_files/";
			$file_name		       = "file-".time();	
			$settings['file_name'] 	 = $file_name;

			if(upload_file($_FILES, $settings)){
				$set = array(
					"file_name"			=> $file_name.$this->upload->data('file_ext'),
					"file_department"	      => $post["department"],
					"file_company_id"	      => 0,
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
				redirect(base_url("cbmc/manage_request"));
			}
			else{
				redirect(base_url("cbmc/manage_files"));
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
			
			redirect(base_url("cbmc/manage_files"));
		}
	}

	// manage request
	  public function add_new_file($req_id){

		$_SESSION["add_file"] = $req_id;
		redirect(base_url("cbmc/manage_files"));

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


}
