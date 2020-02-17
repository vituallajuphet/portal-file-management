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
        show_modal_edit(user_id){
            let self = this;
            $("#manage_user_edit_mod").modal();
			let users = self.users.find(user => user.user_id == user_id);
			self.frmdata.user_id= user_id
			self.frmdata.first_name= users.firstname
			self.frmdata.last_name=users.lastname
			self.frmdata.email_address=users.email_address
			self.frmdata.username = users.username
			self.frmdata.contact_number=users.contact_number
			self.frmdata.companies = [];

			users.companies.map(comp => {
				let company_data = {
			    	company_id:comp.company_id,
					company_name:comp.company_name
				}
				self.frmdata.companies.push(company_data);
			})
            
        },
        view_user(userid){
            $("#view_user_details_modal").modal();
            let self = this;
            let users = self.users.find(user => user.user_id == userid);
            self.selected_user = users;
        },
        show_delete_user(user_id){
			let self = this;
			this.confirm_alert("Are you sure to delete?").then(res=>{
				let formdata = new FormData();
				formdata.append("user_id", user_id)
				axios.post(`${self.base_url}admin/api_delete_user`, formdata).then(res => {
					let resp = res.data;
					if(resp.code == 200){
						self.s_alert(resp.message, "success");
						setTimeout(() => { location.reload(); }, 1200);
					}
					else{
						self.s_alert(resp.message, "warning");
					}
				})
			})
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
                 self.s_alert("Please add atleast one company", "warning");
                 return;
            }
            this.confirm_alert("Are you sure to save this user?").then(res=>{
                let formdata = new FormData();
                formdata.append("frmdata", JSON.stringify(self.frmdata))
                axios.post(`${self.base_url}admin/api_add_comp_user`, formdata).then(res => {
                    let resp = res.data;
                    if(resp.code == 200){
                        self.s_alert(resp.message, "success");
                        setTimeout(() => { location.reload(); }, 1200);
                    }
                    else{
                        self.s_alert(resp.message, "warning");
                    }
                })
            })
        },
        submit_edit_form(){
            let self = this;
            if(self.frmdata.companies.length == 0) {
                 self.s_alert("Please add atleast one company", "warning");
                 return;
            }
            this.confirm_alert("Are you sure to update this user?").then(res=>{
                let formdata = new FormData();
                formdata.append("frmdata", JSON.stringify(self.frmdata))
                axios.post(`${self.base_url}admin/api_update_comp_user`, formdata).then(res => {
                    let resp = res.data;
                    if(resp.code == 200){
                        self.s_alert(resp.message, "success");
                        setTimeout(() => { location.reload(); }, 1200);
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
