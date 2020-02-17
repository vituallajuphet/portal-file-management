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
			department: <?= json_encode(get_departments());?>,
			frmdata:{
				first_name:"",
				last_name:"",
				email_address:"",
				username:"",
				contact_number:"",
				password:"cbmc1234",
				departments:[],
			},
			selected_dept:"",
			selected_user:[]
		}
	},
	methods:{
		getRequestData(){
			return new Promise((resolve, reject)=> {
				axios.get(`${BASE_URL}admin/api_dept_user/cbmc`).then((res)=>{
					this.users = res.data.data;
					resolve(200)
				})
			}) 
		},
		show_add_modal(){
			let self = this;
			$("#dept_user_modal").modal();
			self.frmdata.first_name=""
			self.frmdata.last_name=""
			self.frmdata.email_address=""
			self.frmdata.username = ""
			self.frmdata.contact_number=""
			self.frmdata.departments = []
			
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
						setTimeout(() => { location.reload(); }, 1500);
					}
					else{
						self.s_alert(resp.message, "warning");
					}
				})
			})
		},
		show_edit_modal(user_id){
			let self = this;
			$("#dept_edit_modal").modal();
			let users = self.users.find(user => user.user_id == user_id);
			self.frmdata.user_id= user_id
			self.frmdata.first_name= users.firstname
			self.frmdata.last_name=users.lastname
			self.frmdata.email_address=users.email_address
			self.frmdata.username = users.username
			self.frmdata.contact_number=users.contact_number
			self.frmdata.departments = [];
			users.departments.map(dept => {
				let dept_arr = {
					dept_id : dept.user_dept_id,
					dept_name : dept.departments,
				}
				self.frmdata.departments.push(dept_arr);
			})
		},
		
		show_details_modal(user_id){
			let self = this;
			$("#dept_details_modal").modal();
			let users = self.users.find(user => user.user_id == user_id);
            self.selected_user = users;
		},
		remove_dept(dep_id){
			let arr = this.frmdata.departments.filter(dept => dept.dept_id != dep_id);
			this.frmdata.departments = arr;
		},
		submit_add_form(){
			let self = this;
			if(self.frmdata.departments.length == 0) {
                 self.s_alert("Please add at least one department", "warning");
                 return;
            }
			this.confirm_alert("Are you sure to save this user?").then(res=>{
				let formdata = new FormData();
				formdata.append("frmdata", JSON.stringify(self.frmdata))
				axios.post(`${self.base_url}admin/api_save_dept_user`, formdata).then(res => {
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
		submit_edit_form(){
			let self = this;
			if(self.frmdata.departments.length == 0) {
                 self.s_alert("Please add at least one department", "warning");
                 return;
            }
			this.confirm_alert("Are you sure to update this user?").then(res=>{
				let formdata = new FormData();
				formdata.append("frmdata", JSON.stringify(self.frmdata))
				axios.post(`${self.base_url}admin/api_update_dept_user`, formdata).then(res => {
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
	
	mounted(){
		this.getRequestData().then((res)=>{
			$('#myTable').DataTable();
		}) 
		//  $("#verticalcenter").modal()
	},
	watch:{
		// trigerr if  selected dropdown is changed
		selected_dept(dept_name){
			if(dept_name !=""){
				let is_exists =  this.frmdata.departments.find(dept => dept.dept_name == dept_name);
				if(!is_exists){
					let dept_data = this.department.find(dept => dept.dept_name == dept_name);
					this.frmdata.departments.push({dept_id:1,  dept_name:dept_data.dept_name});
				}
				else{
					this.s_alert("This department is already added.", "error");
				}
			}
		}
	}
	
	
})

</script>
