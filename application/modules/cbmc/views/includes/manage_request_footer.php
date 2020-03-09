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
			is_loading: false,
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
				axios.get(`${self.base_url}api/get_file_request`).then(res =>{
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
				axios.get(`${self.base_url}api/get_files`).then(res =>{
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
			axios.get(`${self.base_url}api/get_approved_request/${req_id}`).then(res =>{
				let resp = res.data;
				if(resp.code == 200){
					req_file.file_data = resp.data
					self.selected_completed_file = req_file;
					$("#view_completed_files").modal();
				}
			})	
		},
		show_delete_request(request_id){ //show delete alert 
			let self = this;

			self.confirm_alert("Are you sure to delete this request?").then(result => {
				let form_data = new FormData();
				form_data.append("request_id", request_id);

				axios.post(`${self.base_url}api/delete_request`, form_data).then(response =>{
					if(response.data.code == 200){
						self.s_alert("Deleted Successfully", "success");
						self.page_reload(1500);
					}
				})

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
					$("#update_status_modal").modal("hide");
					self.is_loading = true;
					formdata.append("frmdata", JSON.stringify(self.frm_status))
					axios.post(`${self.base_url}api/update_request_status`, formdata).then(res =>{
						let resp = res.data;
						self.is_loading = false;
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
				self.s_alert("Please select at least one file", "error")
				return;
			}
			self.confirm_alert("Are you sure to approve this request?").then(res =>{
				if(res == 200){
					let frmdata = new FormData();
					let fdata = {
						"file_ids" :self.check_request_id,
						"request_id" :self.selected_approved_req_id	
					}
					$("#approve_request_form").modal("hide");
					self.is_loading = true;
					frmdata.append("frmdata", JSON.stringify(fdata))
					axios.post(`${self.base_url}api/approve_request_file`, frmdata).then(res =>{
						let resp = res.data;
						if(resp.code == 200){
							self.is_loading = false;
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
		is_file_viewable(file){
			let result 		 = true;
			let file_exe	 =  file.split('.').pop();
			let viewable_exe = ["png", "pdf", "jpg", "jpeg"];
			let res			 = viewable_exe.find(exe => exe == file_exe);

			if(res == "" || res == undefined){
				result = false;
			}
			return result;
			
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
			axios.post(`${self.base_url}api/check_has_file`, frmdata).then(res =>{
				if(res.data.code == 200){
					get_node.checked = false;
					self.s_alert("This investor already has this file", "error");
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
	// jquery in responsive events
	$(document).ready(function(){
		let is_reposive = false;
		let is_reposive2 = false;
		setResponsive();
		$(window).resize(function(){
			setResponsive();
		})

		function setResponsive(){
			let myTable = $("#myTable thead th:last-child");
			let myTable2 = $("#myTable2 thead th:last-child");
			setTimeout(() => {
				is_reposive = (myTable.css("display") == "none")
				is_reposive2 = (myTable2.css("display") == "none")
			}, 1200);
			
		}
		$(document).on("click", ".view_request_details", function(){
			if(is_reposive){
				let r_id = $(this).attr("data");
				myapp.view_request_details(r_id);
			}
		})
		$(document).on("click", ".show_approve_request_frm", function(){
			if(is_reposive){
				let r_id = $(this).attr("data");
				myapp.show_approve_request_frm(r_id);
			}
		})
		$(document).on("click", ".show_update_status", function(){
			if(is_reposive){
				let r_id = $(this).attr("data");
				myapp.show_update_status(r_id);
			}
		})

		$(document).on("click", ".show_delete_user", function(){
			if(is_reposive){
				let r_id = $(this).attr("data");
				alert(r_id)
			}
		})
		$(document).on("click", ".show_completed_details", function(){
			if(is_reposive2){
				let r_id = $(this).attr("data");
				myapp.show_completed_details(r_id);
			}
		})

		$(document).on("click", ".show_delete_request", function(){
			if(is_reposive || is_reposive2){
				let r_id = $(this).attr("data");
				myapp.show_delete_request(r_id);
			}
		})

	})


</script>

