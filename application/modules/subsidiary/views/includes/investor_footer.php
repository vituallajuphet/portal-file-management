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
            is_loading:false,
            base_url:BASE_URL,
            users:[],
            frmdata:{
                companies:[],
                reg_file:[],
            }
        }
    },
    methods:{
        getInvestors(){
            return new Promise((resolve, reject)=> {
                axios.get(`${BASE_URL}api/get_sub_investors/`).then((result)=>{
                    this.users = result.data.data;
                    resolve(200);
                })
            }) 
        },
        get_status(status_id){

            let status_string = ""

            if(status_id == 0){
                status_string = "Pending"
            }
            else if(status_id == 1){
                status_string = "Active"
            }
            else if(status_id == 2){
                status_string = "Disabled"
            }

            return status_string;
        },
    
        showInvestorDetails(user_id){
            let self = this;
            let user_data = this.users.find(user => user.user_id == user_id)
            this.frmdata  = user_data;
            
            $("#investor_details_modal").modal();
        },
        <?= $this->load->view("modules/swal_vue_function");?>
    },
    computed:{
        
    },
    mounted(){
        
        this.getInvestors().then((res)=>{
            $('#myTable').DataTable();
        }) 
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
		$(document).on("click", ".showInvestorDetails", function(){
			if(is_reposive){
				let user_id = $(this).attr("data");
				myapp.showInvestorDetails(user_id);
			}
		})


	})

</script>
