<script src="<?php echo base_url(); ?>assets/js/vue.js"></script>
<script src="<?php echo base_url(); ?>assets/js/axios.min.js"></script>
<!-- <script type="text/javascript" language="javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script> -->
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/responsive/2.2.3/js/dataTables.responsive.min.js"></script>

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
