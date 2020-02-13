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
                first_name:"",
                last_name:"",
                email_address:"",
                username:"",
                contact_number:"",
                password:"cbmc1234",
                companies:[]
            }
        }
    },
    methods:{
        getRequestData(){
            return new Promise((resolve, reject)=> {
                axios.get(`${BASE_URL}admin/api_get_comp_user/`).then((res)=>{
                    this.users = res.data.data;
                    resolve(200);
                })
            }) 
        },
        show_modal_edit(userid){
            $("#manage_user_edit_mod").modal();
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
            let self = this;
            if(self.frmdata.companies.length == 0) {
                 self.s_alert("Please assign a company first!", "warning");
                 return;
            }
            this.confirm_alert("Are you sure to save this user?").then(res=>{
                let formdata = new FormData();
                formdata.append("frmdata", JSON.stringify(self.frmdata))
                axios.post(`${self.base_url}admin/api_add_comp_user`, formdata).then(res => {
                    let resp = res.data;
                    if(resp.code == 200){
                        self.s_alert(resp.message, "success");
                        setTimeout(() => { location.reload(); }, 1500);
                    }
                    else{
                        self.s_alert(resp.message, "warning");
                    }
                })
            })
        },
        <?= $this->load->view("modules/swal_vue_function");?>
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
