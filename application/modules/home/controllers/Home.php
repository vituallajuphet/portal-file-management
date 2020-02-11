<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends MY_Controller {

		public function index(){
			$user_type = $this->session->userdata("user_type");
			if($user_type == "investor"){
				redirect(base_url("investor"));
			}
			else if($user_type == "admin"){
				redirect(base_url("admin"));
			}
			else if($user_type == "cbmc"){
				redirect(base_url("cbmc"));
			}
			else{
				redirect(base_url("login"));
			}

		}

}
