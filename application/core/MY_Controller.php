<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Controller extends MX_Controller {

	public function __construct(){
		$route = $this->router->fetch_class();
		if(check_module() == 2){
			echo "<p style='text-align: center;  font-size: 20px;  margin: 30px 0 0;  color: red;'>You are not authorize to access this page.</p> ";
			
			exit;
		}
		else if(check_module() == 3){
			if($route == 'login'){
				if($this->session->has_userdata('is_logged')){
					redirect(base_url());
				}
			} else {
				if(!$this->session->has_userdata('is_logged')){
					redirect(base_url('login'));
				}
			}
		}
		
	}

	public function load_page($page,$data = array()){
		$this->load->view('includes/head',$data);
		$this->load->view('includes/nav',$data);
		$this->load->view($page,$data);
		$this->load->view('includes/footer',$data);
	}

	public function load_investor_page($page,$data = array()){
		$this->load->view('includes/investor/head',$data);
		$this->load->view('includes/investor/nav',$data);
		$this->load->view($page,$data);
		$this->load->view('includes/investor/footer',$data);
	}

	public function load_login_page($page,$data = array(), $component =""){
		$this->load->view('includes/guest/head',$data);
		$this->load->view($page,$data);
		$this->load->view('includes/guest/footer',$data);
	}
	public function load_admin_page($page,$data = array(), $component =""){
		$this->load->view('includes/admin/header',$data);
		$this->load->view($page,$data);
		$this->load->view('includes/admin/footer',$data);
	}

	public function load_cbmc_page($page,$data = array(), $component =""){
		$this->load->view('includes/cbmc/header',$data);
		$this->load->view($page,$data);
		$this->load->view('includes/admin/footer',$data);
	}

	

}
