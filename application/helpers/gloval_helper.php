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

    function get_companies(){
        $ci = & get_instance();
        $par["select"] ="*";
        $par["where"] ="company_type='subsidiary'";
        $res=  $ci->MY_Model->getRows("tbl_companies", $par, "obj");
        return $res;
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
    
    
?>
