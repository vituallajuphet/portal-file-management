<script src="<?php echo base_url(); ?>assets/js/vue.js"></script>
<script src="<?php echo base_url(); ?>assets/js/axios.min.js"></script>
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
            is_loading:false,
            base_url:BASE_URL,
            users:[],
            frmdata:{
                companies:[],
                reg_file:[],
            }
        }
    },
    methods:{
        getInvestors(){
            return new Promise((resolve, reject)=> {
                axios.get(`${BASE_URL}api/get_investors/`).then((result)=>{
                    this.users = result.data.data;
                    resolve(200);
                })
            }) 
        },
    
        showInvestorDetails(user_id){
            let self = this;

            let user_data = this.users.find(user => user.user_id == user_id)
            this.frmdata  = user_data;

            $("#investor_details_modal").modal();
        },
        <?= $this->load->view("modules/swal_vue_function");?>
    },
    computed:{
        
    },
    mounted(){
        
        this.getInvestors().then((res)=>{
            $('#myTable').DataTable();
        }) 
    }
})

</script>
