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

	}
	
	
})

	// jquery in responsive events
	$(document).ready(function(){
		let is_reposive = false;
		setResponsive();
		$(window).resize(function(){
			setResponsive();
		})

		function setResponsive(){
			let myTable = $("#myTable thead th:last-child");
			setTimeout(() => {
				is_reposive = (myTable.css("display") == "none")
			}, 1200);
			
		}
		$(document).on("click", ".show_details_modal", function(){
			if(is_reposive){
				let c_id = $(this).attr("data");
				myapp.show_details_modal(c_id);
			}
		})

	})

</script>
