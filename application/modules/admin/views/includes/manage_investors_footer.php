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
            base_url:BASE_URL,
            users:[],
            selected_comp:"",
            companies: <?=json_encode(get_companies())?>,
            selected_user:[],
        }
    },
    methods:{
        getInvestors(){
            return new Promise((resolve, reject)=> {
                axios.get(`${BASE_URL}admin/api_get_investors/`).then((result)=>{
                    this.users = result.data.data;
                    resolve(200);
                })
            }) 
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
