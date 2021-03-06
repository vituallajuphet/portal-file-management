<script src="<?php echo base_url(); ?>assets/js/vue.js"></script>
<script src="<?php echo base_url(); ?>assets/js/axios.min.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/datatable.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/datatable-bootstrap.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/datatable-responsive.js"></script>

<script>
    var BASE_URL = "<?= base_url();?>";
	var dtable, dtable2 = "";
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
				comment:"",
				process_details:[]
			},
			uploaded_files:[]
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
			let self = this;
			this.selected_approved_req_id  = req_id;
			$("#approve_request_form").modal();
			axios.get(`${self.base_url}api/get_sub_process_file/${req_id}`).then(res =>{
				if(res.data.code == 200){
					self.uploaded_files = res.data.data;
				}
			})
		},
		show_completed_details(req_id){
			let self = this;
			let req_file = self.completed_files.find(file => file.request_id == req_id);
			axios.get(`${self.base_url}admin/api_get_approved_request/${req_id}`).then(res =>{
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
				$(".preloader").show();
				let form_data = new FormData();
				form_data.append("request_id", request_id);

				axios.post(`${self.base_url}admin/api_delete_request`, form_data).then(response =>{
					if(response.data.code == 200){
						$(".preloader").hide();
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
			self.selected_requested_file.process_details=req_file.process_details
			$("#view_details_request").modal();

		},
		submit_update_status(){
			let self = this;
			self.confirm_alert("Are you sure to update the status?").then(res =>{
				if(res == 200){
					let formdata = new FormData();	
					$(".preloader").show();
					formdata.append("frmdata", JSON.stringify(self.frm_status))
					axios.post(`${self.base_url}admin/api_update_request_status`, formdata).then(res =>{
						let resp = res.data;
						$(".preloader").hide();
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

			let checkbox = $(".check_mark_proccess");
			let is_checked = true;
			let message = "Are you sure to approve this request?";

			if(self.check_request_id.length == 0 && checkbox[0] == undefined){
				self.s_alert("Please select at least one file", "error")
				is_checked = false;
				return;
			}
			
			if(checkbox[0] != undefined){
				if(self.check_request_id.length == 0 && !checkbox[0].checked){
					self.s_alert("Please select at least one file", "error")
					is_checked = false;
					return;
				}
				if(checkbox != undefined && !checkbox[0].checked){
					message 	= "Are you sure not to include to prepared files?";
					is_checked  = false;
				}
			}
			
			self.confirm_alert(message).then(res =>{
				if(res == 200){
					let frmdata = new FormData();
					let fdata = {
						"file_ids" 	 :self.check_request_id,
						"request_id" :self.selected_approved_req_id,
						"is_checked" :is_checked
					}
					$(".preloader").show();
					frmdata.append("frmdata", JSON.stringify(fdata))
					axios.post(`${self.base_url}admin/api_approve_request_file`, frmdata).then(res =>{
						let resp = res.data;
						$(".preloader").hide();
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
			axios.post(`${self.base_url}admin/api_check_has_file`, frmdata).then(res =>{
				if(res.data.code == 200){
					get_node.checked = false;
					self.s_alert("This investor already has this file", "error");
				}
				else if(res.data.code == 201){
					get_node.checked = false;
					self.s_alert("This file is already prepared", "error");
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
           dtable = $("#myTable").DataTable();
           dtable2 =  $("#myTable2").DataTable();
			
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

		$.fn.dataTable.ext.search.push(
			function( settings, data, dataIndex ) {

				var dateFrom = $('#date_from').val()
				var dateTo   = $('#date_to').val()

				var dateFrom2 = $('#date_from2').val()
				var dateTo2 = $('#date_to2').val()

				let date_added = data[5];
				let date_added2 = data[5];

				if ( dateFrom != "" &&  dateTo != ""){
					let dfrom = new Date(dateFrom);
					let dto = new Date(dateTo);
					let d_added = new Date(date_added);
					
					if((dfrom.getTime() <= d_added.getTime()) && (dto.getTime() >= d_added.getTime()) ){
						return true;
					}
					return false;
				}

				if ( dateFrom2 != "" &&  dateTo2 != ""){
					let dfrom2 = new Date(dateFrom2);
					let dto2 = new Date(dateTo2);
					let d_added2 = new Date(date_added);
					
					if((dfrom2.getTime() <= d_added2.getTime()) && (dto2.getTime() >= d_added2.getTime()) ){
						return true;
					}
					return false;
				}

				return true;
			}
		);

		$('#date_from, #date_to').change( function() {
			$('#date_from2, #date_to2').val("")
			dtable.draw();
		} );

		$('#date_from2, #date_to2').change( function() {
			$('#date_from, #date_to').val("")
			dtable2.draw();
		} );

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

