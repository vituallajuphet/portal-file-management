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
			frmdata:{
				company_name: "",
				address: "",
				company_contact: "",
				company_email: "",
				remarks: "",
			},
			selected_comp_id:"",
			companies: <?= json_encode(get_companies());?>,
		}
	},
	methods:{
        
        show_details_modal(company_id){
            let self = this;

            let company = self.companies.find(comp => comp.company_id == company_id);
            self.frmdata = company;

            $("#company_details_modal").modal();
        },
		show_add_modal(company_id){
            let self = this;
			self.frmdata = {};
            $("#company_add_modal").modal();
        },

		show_edit_modal(company_id){
            let self = this;
			
			self.selected_comp_id = company_id;

			let company = self.companies.find(comp => comp.company_id == company_id);
			self.frmdata.company_id = company_id
			self.frmdata 			= company;

            $("#company_edit_modal").modal();
        },
		show_delete_company(comp_id){
			let self = this;
			self.confirm_alert("Are you sure to delete this company?").then(res =>{
			
			let formdata = new FormData();
			formdata.append("company_id", comp_id);
				
			axios.post(`${self.base_url}admin/api_delete_company`, formdata).then(result =>{
				if(result.data.code == 200){
					self.s_alert("Deleted Successfully!", "success");
					self.page_reload(1300)
				}
			})

			})
		},
		submit_add_form(){
			let self = this;

			self.confirm_alert("Are you sure to save this company?").then(res =>{
				
				let formdata = new FormData();
				formdata.append("frmdata", JSON.stringify(self.frmdata));

				axios.post(`${self.base_url}admin/api_save_company`, formdata).then(result =>{
					if(result.data.code == 200){
						self.s_alert("Saved Successfully!", "success");
						self.page_reload(800)
					}
					else{
						self.s_alert(result.data.message, "error");
					}
				})
			})
		},

		submit_edit_form(){
			let self = this;

			self.confirm_alert("Are you sure to update this company?").then(res =>{
				
				let formdata = new FormData();
				formdata.append("frmdata", JSON.stringify(self.frmdata));

				axios.post(`${self.base_url}admin/api_update_company`, formdata).then(result =>{
					if(result.data.code == 200){
						self.s_alert("Updated Successfully!", "success");
						self.page_reload(800)
					}
				})
			})
		},
		

		<?= $this->load->view("modules/swal_vue_function");?>
		
	},
	computed:{
		activeCompanies (){
			return this.companies.filter(comp => comp.company_status != 'deleted');
		}
	},
	
	mounted(){
		// this.getCompanyData().then((res)=>{
		// 	$('#myTable').DataTable();
		// }) 
        $('#myTable').DataTable();
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
