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
			$("#dept_user_modal").modal();
		},
		show_delete_user(user_id){
			let self = this;
			Swal.fire({
				icon: "warning",
				text: "Are you sure to delete?",
				showCancelButton: true,
				confirmButtonColor: '#000616',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes'
			}).then((result) => {
				if (result.value) {
					self.s_alert("Deleted Successfully", "success");
				}
			})
		},
		show_edit_modal(user_id){
			$("#dept_edit_modal").modal();
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
		selected_dept(dep_id){
			if(dep_id !=""){
				let is_exists =  this.frmdata.departments.find(dept => dept.dept_id == dep_id);
				if(!is_exists){
					let dept_data = this.department.find(dept => dept.dept_id == dep_id);
					this.frmdata.departments.push({dept_id:dep_id,  dept_name:dept_data.dept_name});
				}else{
					this.s_alert("This department is already added.", "error");
				}
			}
		}
	}
	
	
})

</script>
