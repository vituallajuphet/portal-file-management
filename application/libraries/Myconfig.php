<?php
class Myconfig {

        protected $CI;

        public $all_departments = array(
          'HR Department',
          'Finance Department',
        );

        // We'll use a constructor, as you can't directly call a function
        // from a property definition.
        public function __construct()
        {
                // Assign the CodeIgniter super-object
                $this->CI =& get_instance();
        }

        // public function foo()
        // {
        //         $this->CI->load->helper('url');
        //         redirect();
        // }
        //
        // public function bar()
        // {
        //         echo $this->CI->config->item('base_url');
        // }


        public function viewable_files()
        {

          return $viewable_files = array(
            'png',
            'jpg',
            'pdf',
            'mp3',
            'mp4',
            'gif',
            'txt',
          );
        }

        // public function __construct($params = array())
        // {
        //   echo "CALLLEDDD";
        //       // $this->CI =& get_instance();
        //       // if(!empty($params)){
        //       //   $this->init($params);
        //       // }
        // }
}
