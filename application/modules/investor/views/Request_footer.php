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

  var myapp = new Vue({
    el:"#myApp",
    
    data(){
      return {
        base_url:BASE_URL,
        file_requests:[],
        modaldata :{
            file_title:"",
            file_status:"",
            company:"",
            department:"",
            requested_date:"",
            comment:"",
            attachment_files:[],
        }
      }
    },
    methods:{
      getRequestData(){
        return new Promise((resolve, reject)=> {
          axios.get(`${BASE_URL}investor/get_file_requests`).then((res)=>{
            this.file_requests = res.data;
            resolve(200)
          })
        }) 
      },
      viewDetails(req_id){
         let res = this.file_requests.find((req) => req.request_id == req_id);
         if(res){
           this.modaldata.file_title = res.file_title;
           this.modaldata.file_status = res.request_status;
           this.modaldata.company = res.company_name;
           this.modaldata.department = res.department;
           this.modaldata.requested_date = res.requested_date;
           this.modaldata.comment = res.comment;
           this.modaldata.attachment_files = res.attachments;
           $("#verticalcenter").modal()
         }
      },
      downloadFile(req_id){
       alert(req_id)
      },
      get_row_class(status){
        let ret = "";
        if(status == "Completed"){
          ret = "row-completed"
        }
        else if(status == "Processing"){
          ret = "row-processed"
        }
        return ret;
      }
    },

    computed:{
     
    },

    mounted(){
      this.getRequestData().then((res)=>{
        $('#myTable').DataTable();
      }) 
      //  $("#verticalcenter").modal()
    }

  })

</script>
