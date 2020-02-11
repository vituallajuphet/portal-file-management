<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Files extends MY_Controller {

	  	public function index(){
			redirect(base_url("investor/files"));
			exit;
			if (isset($_POST['send_message'])) {
					// $this->emaillibrary->sendmail($_POST['message-text']);
					$message_content ="Investor name:".$this->session->userdata('firstname')." ".$this->session->userdata('lastname')."<br>";
					$message_content .="Message:".$_POST['message'];
					$department = explode("|",$_POST['department']);
					sendemail($department[0], $message_content,"For ".$department[1],null,null,$_POST['your_email'],false);
					$this->session->set_flashdata("flash_data", array( "err"=>"success", "message" => "Message Sent"));
			}
			if (isset($_POST['send_request'])) {
	
				$res=$this->db->
				select('*')->
				from('tbl_companies')->
				where('company_id',$this->session->userdata('company_id'))->
				get()->result();

				sendemail($res->company_email,'A user requested for a doocument.');

			}

				$data['has_header']="files_index_header.php";
				$data['has_footer']="files_index_footer.php";

				$this->load->library('myconfig');
				$data['viewable_files']=$this->myconfig->viewable_files();
				$data['all_departments']=$this->myconfig->all_departments;

				// GETTING FILES
				$data['files_rows']=$this->db->
					select("*")->
					from('tbl_files')->
					where('file_company_id',$this->session->userdata('company_id'))->
					join('tbl_companies','tbl_companies.company_id = tbl_files.file_company_id')->
					get()->result();

				$data['company_email']=$this->db->
					select("*")->
					where("company_id",$this->session->userdata('company_id'))->
					from('tbl_companies')->get()->result();

      			  $this->load_page('files_index',$data);

		}

}
