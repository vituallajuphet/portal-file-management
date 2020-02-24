<script src="<?php echo base_url(); ?>assets/js/vue.js"></script>
<script src="<?php echo base_url(); ?>assets/js/axios.min.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/datatable.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/datatable-bootstrap.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/datatable-responsive.js"></script>

<script>
var BASE_URL = "<?= base_url();?>";
var hasFile = false;
</script>

<script>
let selected_user_ids =[];
let selected_un_restrict_ids = [];
$(document).ready(function(){
	$("#upload_file").change(function(){
		hasFile = true;
		$(".hasFile").show();
	})
	$("#upload_file2").change(function(){
		hasFile = true;
		$(".hasFile").show();
	})

	
	$(document).on("change", ".restrict_box", function(){
		let selected_id = $(this).attr("data");
		let is_checked = $(this)[0].checked;
		if(is_checked){
			selected_user_ids.push(selected_id)
		}else{
			selected_user_ids = selected_user_ids.filter(ids => ids != selected_id );
		}
	})

	$(document).on("change", ".un_restrict_box", function(){
		let selected_id = $(this).attr("data");
		let is_checked = $(this)[0].checked;
		if(is_checked){
			selected_un_restrict_ids.push(selected_id)
		}else{
			selected_un_restrict_ids = selected_un_restrict_ids.filter(ids => ids != selected_id );
		}
	})

	
})

</script>

<script type="text/javascript" class="init">
var myapp = new Vue({
	el:"#myApp",
	data(){
		return {
			base_url:BASE_URL,
			files:[],
			check_user_id:[],
			archieved_files:[],
			departments:<?= json_encode(get_departments());?>,
			selected_file_id:"",
			selected_restrict_file_id:"",
			users:[],
			frmdata:{
				file_title:"",
				remarks:"",
				department:""
			},
			file_details:{},
				archieved_table_shown: false
			}	
		},
		methods:{
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
			get_arc_files(){
				let self = this;
				return new Promise((resolve, reject)=>{
					axios.get(`${self.base_url}admin/api_get_archieved_files`).then(res =>{
						let resp = res.data;
						if(resp.code == 200){
							self.archieved_files = resp.data;
						}
						resolve(200)
					})
					
				})
			},
			show_file_details(file_id){
				let self = this;
				let file_data = self.files.find(file => file.files_id == file_id);
				self.file_details = file_data;
				this.selected_restrict_file_id = file_id
				axios.get(`${self.base_url}admin/api_get_file_users/${file_id}`).then(res =>{
					let resp = res.data;
					if(resp.code == 200){

					}
				})
				$("#view_details_modal").modal();
			},
			show_add_modal(){
				let self = this;
				$("#file_modal").modal();
				hasFile = false;
				$(".hasFile").hide();
				self.frmdata.file_title =""
				self.frmdata.remarks =""
				self.frmdata.department =""
				self.selected_file_id = ""
			},
			show_edit_modal(file_id){
				let self = this;
				let file_data = self.files.find(file => file.files_id == file_id);
				self.frmdata.file_title =file_data.file_title
				self.frmdata.remarks =file_data.remarks
				self.frmdata.department =file_data.file_department
				self.selected_file_id = file_id
				$("#file_edit_modal").modal();
			},
			show_delete_file(file_id){
				let self = this;
				let formdata = new FormData();
				formdata.append("file_id", file_id);
				self.confirm_alert("Are you sure to delete this file?").then(res =>{
					if(res == 200){
						axios.post(`${self.base_url}admin/api_delete_file`, formdata).then(res=> {
							let resp = res.data;
							if(resp.code == 200){
								self.s_alert("Deleted Successfully", "success");
								setTimeout(() => {
									location.reload();
								}, 1500);
							}
						})		   
					}
				})
			},
			show_delete_archieve(file_id){
				let self = this;
				let formdata = new FormData();
				formdata.append("file_id", file_id);
				self.confirm_alert("Are you sure to delete permnently this file?").then(res =>{
					if(res == 200){
						axios.post(`${self.base_url}admin/api_delete_archieve_file`, formdata).then(res=> {
							let resp = res.data;
							if(resp.code == 200){
								self.s_alert("Deleted Successfully", "success");
								setTimeout(() => {
									location.reload();
								}, 1500);
							}
						})		   
					}
				})
			},
			show_archieved(){
				this.archieved_table_shown = !this.archieved_table_shown;
				setTimeout(() => {
					$('#myTable2').DataTable();
				}, 2000);
			},
			show_restore_file(file_id){
				let self = this;
				let formdata = new FormData();
				formdata.append("file_id", file_id);
				self.confirm_alert("Are you sure to restore this file?").then(res =>{
					if(res == 200){
						axios.post(`${self.base_url}admin/api_restore_file`, formdata).then(res=> {
							let resp = res.data;
							if(resp.code == 200){
								self.s_alert("File Restored Successfully", "success");
								setTimeout(() => {
									location.reload();
								}, 1500);
							}
						})		   
					}
				})
			},
			show_restrict_user(){
				let dtble = $(".dtatable_cont");
				// reset selected	
				selected_user_ids = [];
				selected_un_restrict_ids = [];
				let html = `
					<table  id="myTable3" class="table dt-responsive nowrap admin-table" style="width:100%">
						<thead>
							<tr>
								<th>User ID</th>
								<th>Full Name</th>
								<th>User Type</th>
								<th>Request Status</th>
								<th>Action</th>
							</tr>
						</thead>
					<tbody> `;
				
				let self = this;
				axios.get(`${self.base_url}admin/get_restricted_user/${self.selected_restrict_file_id}`).then(res=>{
					let resp = res.data;
					if(resp.code==200){
						self.users = resp.data
						self.users.map(user => {
							let action_td = `<input type="checkbox" class="restrict_box" data="${user.user_id}"> Restrict`;
							if(user.request_status == "Restricted"){
								action_td =`<input type="checkbox" class="un_restrict_box" data="${user.user_id}"> Remove`
							}
							html += `
								<tr">
									<td>${user.user_id}</td>
									<td>${user.firstname +' '+user.lastname}</td>
									<td>${user.user_type}</td>
									<td>${user.request_status}</td>
									<td>
										${action_td}
									</td>
								</tr>
							`;
						})
						html += `
							</tbody>
						</table>`;
						dtble.html(html);
						$("#restrict_user_form").modal();
						$("#myTable3").DataTable();	
					}
					else{
						self.s_alert("No users/investor that been restricted on this file", "error")
					}
					
				})
			},
			restrict_handler(user_id){
				
			},
			submit_restrict_form(){
				let self = this;
				if(selected_user_ids.length == 0 && selected_un_restrict_ids == 0){
					self.s_alert("Please select at least one user", "error");
					return;
				}
				else{
					self.confirm_alert("Are you sure to proceed for this updates?").then(res =>{
						if(res == 200){
							let frmdata = new FormData();
							let fdata = {
								file_id : self.selected_restrict_file_id,
								users_id: selected_user_ids,
								un_res_users_id: selected_un_restrict_ids,
							}
							frmdata.append("frmdata", JSON.stringify(fdata))
							axios.post(`${self.base_url}admin/api_restrict_users`, frmdata).then(res=>{
								let resp = res.data;
								if(resp.code == 200){
									self.s_alert("Successfully Updated", "success");
									$("#restrict_user_form").modal("hide");
								}
							})
						}
					})
				}
			},
			submit_add_form(){
				let self = this;
				if(!hasFile){
					self.s_alert("Please add a file first", "error");
					return;
				}
				self.confirm_alert("Are you sure to save this file?").then(res =>{
					if(res == 200){
						$("#frm_add_file").submit();
					}
				})
			},
			submit_edit_form(){
				let self = this;
				if(!hasFile){
					self.s_alert("Please add a file first", "error");
					return;
				}frm_add_file
				self.confirm_alert("Are you sure to update this file?").then(res =>{
					if(res == 200){
						$("#frm_edit_file").submit();
					}
				})
			},
			<?= $this->load->view("modules/swal_vue_function");?>
		},
		computed:{
			
		},
		mounted(){
			this.get_files().then((res)=>{
				$('#myTable').DataTable();		
			});
			this.get_arc_files().then((res)=>{
				$('#myTable2').DataTable();		
			}); 
			// execute if add_file form request page is added
			<?php if(!empty($_SESSION["add_file"])){
				$_SESSION["add_file_req_id"] = $_SESSION["add_file"];
				?>
					this.show_add_modal();
				<?php
				unset($_SESSION["add_file"]);
			}?>
		},
		watch:{
			check_user_id(res){
				alert(res);
			}
		}
	})
	</script>
	