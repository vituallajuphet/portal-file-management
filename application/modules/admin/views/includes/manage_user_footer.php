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
        users:[],
        selected_comp:"",
        companies: <?=json_encode(get_companies())?>,
        frmdata:{
          companies:[]
        }
      }
    },
    methods:{
      getRequestData(){
        return new Promise((resolve, reject)=> {
          axios.get(`${BASE_URL}admin/api_getuser/subsidiary`).then((res)=>{
            this.users = res.data.data;
            resolve(200);
          })
        }) 
      },
      show_modal_edit(userid){
        // alert(1)
      },
      view_user(userid){

      },
      show_delete_user(userid){

      },
      show_add_modal(){
        $("#manage_user_mod").modal();
      },
      remove_comp(comp_id){
        let arr = this.frmdata.companies.filter(comp => comp.company_id != comp_id);
        this.frmdata.companies = arr;
      },
      submit_form(){

      }
    },
    computed:{

    },
    watch :{
      selected_comp (to){
        let comp_id = to;
        let is_exists =  this.frmdata.companies.find(comp => comp.company_id == comp_id);
        if(!is_exists){
          let comp_data = this.companies.find(comp => comp.company_id == comp_id);
          this.frmdata.companies.push({company_id:comp_id,  company_name:comp_data.company_name});
        }else{
          Swal.fire({ icon: 'error', text: 'This company is already added.', })
        }

        
      }
    },
    mounted(){
      this.getRequestData().then((res)=>{
        $('#myTable').DataTable();
      }) 
    }
  })

</script>
