<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Logout extends MY_Controller {

	public function index(){
        $session_data = array( "user_id", "firstname", "lastname", "user_type", "approved", "user_status", "email_address", "contact_number", "is_logged", "logged_in", "company_id");
		$this->session->unset_userdata($session_data);
		$this->session->unset_userdata("logged_in");
		

		redirect(base_url('login'));
	}
}
