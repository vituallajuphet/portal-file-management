<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Controller extends MX_Controller{

	public function __construct(){
		parent::__construct();
		$this->checkLoggedin();
	}

	public function load_login_page($page,$data = array()){
		$this->load->view('includes/header.php');
		$this->load->view($page,$data);
		$this->load->view('includes/footer.php');
	}

	public function load_payment_page($page,$data = array()){
		$this->load->view($page,$data);
	}

	public function checkLoggedin(){
		// if(!$this->session->userdata('logged_in') == 1){
		// 	redirect(base_url('login'));
		// }else{
		// 	// redirect(base_url());
		// }
	}

//	public function load_page($page,$data = array()){
//		$data['title'] = $this->router->fetch_class() == 'Home' ? "Student" : $this->router->fetch_class();
//		$data['u'] = $this->MY_Model->Query("users_tbl","*",array("users_tbl.user_id" => $_SESSION['user_id']),array("users_details_tbl" => "users_tbl.user_id = users_details_tbl.fk_user_id"),"row");
//		$this->load->view('../../includes/head.php',$data);
//		$this->load->view('../../includes/nav.php');
//		$this->load->view('../../includes/partial-head.php',$data);
//		$this->load->view($page,$data);
//		$this->load->view('../../includes/partial-footer.php');
//		$this->load->view('../../includes/footer.php');
//	}

	public function load_page($data = array()){
		$id = $this->session->userdata('user_id');
		$data['user'] = $this->MY_Model->getRows("users_details_tbl","",array("fk_user_id" => $id),"","row");
		$data['profilePicture'] = $this->MY_Model->getRows("profile_picture_tbl","",array("fk_user_id" => $id),"","row");
		$data['profilePictureAdmin'] = $this->MY_Model->getRows("admin_profile_picture_tbl","",array("fk_user_id" => $id),"","row");
		$this->load->view('app',$data);
	}

	public function getNavigation(){
		$this->load->view('../../includes/navigation.php');
	}

	public function insertData($table,$data_post){
		$data = array();
		$insert_data = array();
		foreach($data_post as $key => $value){
			$data[$key] = $key;
			$insert_data[$data[$key]] = $this->input->post($data[$key]);
		}

		return $this->MY_Model->insert($table,$insert_data);
	}




}
