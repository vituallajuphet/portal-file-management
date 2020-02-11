<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Logout extends MY_Controller {

	public function index(){
        $session_data = array( "user_id", "firstname", "lastname", "user_type", "approved", "user_status", "email_address", "contact_number", "is_logged", );
		$this->session->unset_userdata($session_data);
		redirect(base_url('login'));
	}
}
