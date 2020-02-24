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
			request_files:[],
			completed_files:[],
			files:[],
			check_request_id:[],
			selected_approved_req_id:'',
			is_manage_request:true,
			frm_status:{
				request_id:"",
				status:"",
				file_title:"",
			},
			selected_completed_file:{
				file_data:[]
			},
			selected_requested_file:{
				file_title:"",
				request_status:"",
				company_name:"",
				firstname:"",
				lastname:"",
				department:"",
				requested_date:"",
				comment:""
			},
		}
	},
	methods:{
        get_requests(){
            let self = this;
			return new Promise((resolve, reject)=>{
				axios.get(`${self.base_url}admin/api_get_file_request`).then(res =>{
					let resp = res.data;
					if(resp.code == 200){
						self.request_files = resp.data.filter(file => file.request_status != 'Completed');
						self.completed_files = resp.data.filter(file => file.request_status == 'Completed');
					}
					resolve(200)
				})
			})
		},
		get_files(){
			let self = this;
			return new Promise((resolve, reject)=>{
				axios.get(`${self.base_url}admin/api_get_files`).then(res =>{
					let resp = res.data;
					if(resp.code == 200){
						self.files = resp.data;
					}
					resolve(200)
				})
				
			})
		},
        show_update_status(req_id){
			let self = this;
			let req_file = self.request_files.find(file => file.request_id == req_id);
			self.frm_status.request_id =req_file.request_id
			self.frm_status.status =req_file.request_status
			self.frm_status.file_title =req_file.file_title
            $("#update_status_modal").modal();
		},
		show_approve_request_frm(req_id){
			this.selected_approved_req_id  = req_id;
			$("#approve_request_form").modal();
		},
		show_completed_details(req_id){
			let self = this;
			let req_file = self.completed_files.find(file => file.request_id == req_id);
			// let comp_files = self.completed_files.find(file => file.request_id = req_id);
			axios.get(`${self.base_url}admin/api_get_approved_request/${req_id}`).then(res =>{
				let resp = res.data;
				if(resp.code == 200){
					req_file.file_data = resp.data
					self.selected_completed_file = req_file;
					 $("#view_completed_files").modal();
				}
			})	
		},
		view_request_details(req_id){
			let self = this;
			let req_file = self.request_files.find(file => file.request_id == req_id);
			console.log(req_file)
			self.selected_requested_file.file_title = req_file.file_title;
			self.selected_requested_file.request_status=req_file.request_status
			self.selected_requested_file.company_name=req_file.company_name
			self.selected_requested_file.firstname=req_file.firstname
			self.selected_requested_file.lastname=req_file.lastname
			self.selected_requested_file.department=req_file.department
			self.selected_requested_file.requested_date=req_file.requested_date
			self.selected_requested_file.comment=req_file.comment

			$("#view_details_request").modal();

		},
		submit_update_status(){
			let self = this;
			self.confirm_alert("Are you sure to update the status?").then(res =>{
				if(res == 200){
					let formdata = new FormData();	
					formdata.append("frmdata", JSON.stringify(self.frm_status))
					axios.post(`${self.base_url}admin/api_update_request_status`, formdata).then(res =>{
						let resp = res.data;
						if(resp.code == 200){
							self.s_alert("Status Successfully Updated", "success");
							self.page_reload(1500);
						}
					})
				}
			})
		},
		submit_approve_form(){
			let self = this;
			if(self.check_request_id.length == 0){
				self.s_alert("Please select atleast one file!", "error")
				return;
			}
			self.confirm_alert("Are you sure to save this file(s) and approve this request?").then(res =>{
				if(res == 200){
					let frmdata = new FormData();
					let fdata = {
						"file_ids" :self.check_request_id,
						"request_id" :self.selected_approved_req_id	
					}
					frmdata.append("frmdata", JSON.stringify(fdata))
					axios.post(`${self.base_url}admin/api_approve_request_file`, frmdata).then(res =>{
						let resp = res.data;
						if(resp.code == 200){
							self.s_alert("Request Approved Successfully", "success");
							self.page_reload(1300);
						}
					});
				}
			})
		},
		get_status_class(status){
			if(status == "Processing"){
				return "row-processing";
			}
			else if(status == "Completed"){
				return "row-approved";
			}
			return "";
		},
		check_handler(file_id ){
			let self = this;
			let fdata ={
				request_id:self.selected_approved_req_id,
				files_id :file_id
			}
			let frmdata = new FormData();
			let get_node = this.$refs.check_hand.find(ref => ref.value == file_id);
			if(get_node.checked == false){
				self.check_request_id = self.check_request_id.filter(check => check != file_id)
				console.log(self.check_request_id)
				return;
				
			}
			frmdata.append("frmdata", JSON.stringify(fdata))
			axios.post(`${self.base_url}admin/api_check_has_file`, frmdata).then(res =>{
				if(res.data.code == 200){
					get_node.checked = false;
					self.s_alert("This investor has already this file", "error");
				}
				else{
					self.check_request_id.push(file_id)
					console.log(self.check_request_id)
				}
				
			})
			
			


		},
		<?= $this->load->view("modules/swal_vue_function");?>
	},
	computed:{
			
	},
	mounted(){
        this.get_requests().then(res=>{
            $("#myTable").DataTable();
            $("#myTable2").DataTable();
			
		})
		this.get_files().then(res=>{
            $("#myTable3").DataTable();
        })
		<?php 
			if(!empty($_SESSION["add_file_req_id"])) { ?>
				let req_id = <?=$_SESSION["add_file_req_id"];?>;
				this.show_approve_request_frm(req_id)
				
			<?php 
				unset($_SESSION["add_file_req_id"]);
			}
		?>
	},
	watch:{
		
	}
})
</script>