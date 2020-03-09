<?php
    function ajax_response($message, $type){
        $data = array(
            'message' => $message,
            'type' => $type
        );
        echo json_encode($data);
        exit;
    }

    function check_module(){
        $ci = & get_instance();
        $route = $ci->router->fetch_class();
        $user_type = $ci->session->userdata("user_type");
        $allowpage = ["login", "register", "logout", "files", "home"];

        if($route == "api"){
            return 1;
        }
        else{
            if(!in_array($route, $allowpage)){
                if(!empty($user_type)){
                    if($user_type == $route){
                        return 1;
                    }
                    else{
                        return 2;
                    }
                }
           }

        }

        return 3;  
        exit;
    }

    function get_user_id(){
        $ci = & get_instance();
        if($ci->session->has_userdata("user_id")){
            return $ci->session->userdata("user_id");
        }
        exit;
    }

    function get_post(){
        $ci = & get_instance();
        return $ci->input->post();
    }

    function swal_data($msg, $err = "success"){
        $ci = & get_instance();
        $ci->session->set_flashdata("flash_data", array( "err"=>$err, "message" => $msg));
    }

    function sendemail($to_email="", $message ="", $from_name="", $subject="", $type="", $from_email=""){
        $ci = & get_instance();
        if(empty($to_email)){
            $to_email = "prospteam@gmail.com";
        }
        if(empty($from_name)){
            $from_name = "CBMC";
        }
        if(empty($subject)){
            $subject = "Email Notification";
        }
        if(empty($message)){
            $message = "This is a message";
        }
        if(empty($type)){
            $type = "html";
        }

        $settings["mail_type"] = $type;
        $settings["to_email"] = $to_email;
        $settings["from_name"] = $from_name;
        $settings["from_email"] = $from_email;
        $settings["subject"] = $subject;

        $data["content"] = $message;
        $data["title"] = $from_name;
        $data["from_email"] = "prospteam@gmail.com";
        $ci->emaillibrary->initialize($settings);
        if($ci->emaillibrary->sendmail($data)){
            return true;
        }else{
            return false;
        }
        exit;

    }

    function upload_file($files, $setting){
        $ci = & get_instance();
        $config['upload_path']     = "./assets/registration_files/";
        $config['allowed_types']   = 'gif|jpg|png|pdf|docx|doc|zip';
        $config['max_size']        = 9999999999;
        if(!empty($setting)){
            if(!empty($setting["upload_path"])){
                $config['upload_path'] = $setting["upload_path"];
            }
            if(!empty($setting["allowed_types"])){
                $config['allowed_types']     = $setting["allowed_types"];
            }
            if(!empty($setting["max_size"])){
                $config['max_size']     = $setting["max_size"];
            }
            if(!empty($setting["file_name"])){
                $config['file_name']     = $setting["file_name"];
            }
        }
        $ci->load->library('upload', $config);
        $filename = "file";
        if(empty($files["file"])){
            foreach ($files as $file => $value) {
                $filename = $file;
            }
        }
        if ( ! $ci->upload->do_upload("file")){
                return false;
        }
        else{
            return true;
        }
    }
    
    function get_logged_user($typ = "array"){
        $ci = & get_instance();
        if($typ== "array"){
            return $ci->session->userdata();
        }
        else if($typ== "obj"){
            return (object) $ci->session->userdata();
        }
        else if($typ== "json"){
            return json_encode($ci->session->userdata());
        }
        exit;
    }

    function my_profile($key="user_id"){
        $ci = & get_instance();
       $res=  $ci->session->userdata($key);
        if(!empty($res)){
            return $res;
        }
        return "";
    }

    function getData($tbl ="", $par = array(), $r = "array"){
        $ci = & get_instance();
        $res=  $ci->MY_Model->getRows($tbl, $par, $r);
        return $res;
    }

    function insertData($tbl ="", $data = array()){
        $ci = & get_instance();
        $res=  $ci->MY_Model->insert($tbl, $data);
        return $res;
    }

    function updateData($tbl ="", $set, $where = array()){
        $ci = & get_instance();
        $res=  $ci->MY_Model->update($tbl, $set, $where);
        return $res;
    }

    function deleteData($tbl ="", $where = array()){
        $ci = & get_instance();
        $res=  $ci->MY_Model->delete($tbl, $where);
        return $res;
    }

    function batchInsertData($tbl ="", $set = array()){
        $ci = & get_instance();
        $res=  $ci->MY_Model->batch_insert($tbl, $set);
        return $res;
    }

    function has_empty($posts){
        $res = false;
		foreach ($posts as $key => $value) {
			if($value == ""){
				$res = true;
			}
		}
		return $res;
    }

    function get_companies(){
        $ci = & get_instance();
        $par["select"] ="*";
        $par["where"] ="company_type='subsidiary'";
        $res=  $ci->MY_Model->getRows("tbl_companies", $par, "obj");
        return $res;
    }

    function get_file_extension($file){
        $filename = $file["file"]["name"];
        $file_extension = pathinfo($filename, PATHINFO_EXTENSION);
        return $file_extension;
    }

    function get_departments(){
        $ci = & get_instance();
        $par["select"] ="*";
        $par["where"] ="dept_status=1";
        $res=  $ci->MY_Model->getRows("tbl_cmbc_dept", $par, "obj");
        return $res;
    }

     function get_my_company(){
            $ci = & get_instance();
			$response = array("code"=>204, "data"=> []);
			$par["select"] = "*";
			$par["where"] = array("tbl_user_company.user_id" => get_user_id(), "tbl_user_company.status" => "joined");
			$par["join"] = array("tbl_companies" => "tbl_companies.company_id = tbl_user_company.company_id");
            $companies =  $ci->MY_Model->getRows('tbl_user_company',$par, "obj");
			return $companies;
    }
    
    function get_my_notifications(){
        $ci = & get_instance();
        $user_id = $ci->session->userdata("user_id");
        $par["select"] = "*";
        $par["where"] = "fk_user_id_to = $user_id AND notify_status != 'deleted'";
        $par["limit2"] = [3];
        $par["join"] = array(
            "tbl_user_details user_d" => "user_d.user_id = noti.fk_user_id_from",
            "tbl_users user" => "user_d.user_id = user.user_id",
        );

        $res = $ci->MY_Model->getRows("tbl_notification noti", $par, "obj");

        return $res;
    }

    function send_notification($to_id, $message){

        $ci = & get_instance();
        $from_id = $ci->session->userdata("user_id");
        date_default_timezone_set("Asia/Manila");
        $set = array(
            "message" => $message,
            "fk_user_id_from" => $from_id,
            "fk_user_id_to" => $to_id,
            "is_read" => 0,
            'date_created' => date("Y-m-d H:i:s"),
            "notify_status" =>1
        );

        insertData("tbl_notification", $set);
        
    }

    function get_my_department(){

        $ci = & get_instance();
        $par["select"] ="*";
        $par["where"] ="status = 1 AND user_id = ". get_user_id();
        $res=  $ci->MY_Model->getRows("tbl_user_dept_details", $par, "obj");
        return $res;

    }
    
    
?>
