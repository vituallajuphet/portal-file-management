<script src="<?php echo base_url(); ?>assets/js/vue.js"></script>
<script src="<?php echo base_url(); ?>assets/js/axios.min.js"></script>
<!-- <script type="text/javascript" language="javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script> -->
<script  src="<?php echo base_url(); ?>assets/js/module/datatable.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/datatable-bootstrap.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/datatable-responsive.js"></script>

<script>
  var BASE_URL = "<?= base_url();?>";
</script>

<script type="text/javascript" class="init">
  $(document).ready(function() {
   
  } );
</script>

<script type="text/javascript" class="init">
  var myapp = new Vue({
    el:"#myApp",
    
    data(){
      return {
        base_url:BASE_URL,
        files: <?= json_encode($files_rows)?>,
        selected_file:[]
      }
    },
    methods:{
      showFile(req_id){
        let self = this;
        let get_file = self.files.find(file => file.request_id == req_id );
        console.log(get_file)
        this.selected_file = get_file;
        $("#view-file-modal").modal();
      },
      submit_request(){
        let self = this;
        self.confirm_alert("Are you sure to send this request?").then(res =>{
            $(".preloader").show();
            $("#send_request_form").submit();
        })
      },
       submit_contact_dept(){
        let self = this;
        self.confirm_alert("Are you sure to send this message?").then(res =>{
            $(".preloader").show();
            $("#myform").submit();
        })
      },
      <?= $this->load->view("modules/swal_vue_function");?>
    },
    computed:{
       getFiles(){
         return this.files;
       }
    },
    mounted(){
        $('#myTable').DataTable();
        console.log(this.files)
    }

  })
</script>
