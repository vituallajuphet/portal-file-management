<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Subsidiary extends MY_Controller {

		public function __construct(){
			parent::__construct();
			
		}

		public function index(){

			redirect(base_url("subsidiary/investors"));

		}

		public function investors(){

			$data["title"] ="Subsidiary - Investors";
			$data["page_name"] ="investors";
			$data['has_header']="includes/subsidiary/header";
			$data['has_footer']="includes/investor_footer";
			$this->load_subsidiary_page('pages/investors', $data);

		}

		public function manage_request(){

			$data["title"] ="Subsidiary - Requests";
			$data["page_name"] ="file_request";
			$data['has_header']="includes/i/header";
			$data["has_mod"] ="modal/manage_request_modal";
			$data['has_footer']="includes/manage_request_footer";
			$this->load_subsidiary_page('pages/Manage_request',$data);
	
		}

		public function dashboard(){
			echo "This page is under development";
		}

}
