<script src="<?php echo base_url(); ?>assets/js/vue.js"></script>
<script src="<?php echo base_url(); ?>assets/js/axios.min.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/datatable.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/datatable-bootstrap.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/datatable-responsive.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/raphael.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/morris.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/d3.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/c3.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/dashboard.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/dashutils.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/chart_dash.js"></script>

<script>
    var BASE_URL = "<?= base_url();?>";
</script>

<script>
	
	var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	
	axios.get(`${BASE_URL}api/get_graph_data`).then(res =>{

		let request_data, approved_data, processed_data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

		if(res.data.code == 200){
			let res_data	 = res.data.data
			request_data	 = res_data.requests;
			approved_data 	 = res_data.approved;
			processed_data 	 = res_data.processed;
		
		}

		var config = {
				type: 'line',
				data: {
					labels: MONTHS,
					datasets: [{
						label: 'Requests',
						backgroundColor: "#c5a36f",
						borderColor: "#c5a36f",
						data: request_data,
						fill: false,
					}, {
						label: 'Processed',
						fill: false,
						backgroundColor: "#28a745",
						borderColor: "#28a745",
						data: processed_data,
					},
					{
						label: 'Approved',
						fill: false,
						backgroundColor: "#000a24",
						borderColor: "#000a24",
						data: approved_data,
					}
				]
				},
				options: {
					responsive: true,
					title: {
						display: false,
						text: 'Chart.js Line Chart'
					},
					tooltips: {
						mode: 'index',
						intersect: false,
					},
					hover: {
						mode: 'nearest',
						intersect: true
					},
					scales: {
						xAxes: [{
							display: true,
							scaleLabel: {
								display: false,
								labelString: 'Month'
							}
						}],
						yAxes: [{
							display: true,
							scaleLabel: {
								display: true,
								labelString: 'Value'
							}
						}]
					}
				}
			};

			$(document).ready(function(){
				var ctx = document.getElementById('canvas').getContext('2d');
				window.myLine = new Chart(ctx, config);
			})
		
	})

</script>

<script type="text/javascript" class="init">

var myapp = new Vue({
    el:"#myApp",
    
    data(){
        return {
            base_url:BASE_URL,
            dashdata:{
                files:0,
                request:0,
                investor:0,
                dept_user:0,
                sub_user:0,
                company:0
            }
        }
    },
    methods:{
        get_dashboard_data(){
            return new Promise((resolve, reject)=> {
                axios.get(`${BASE_URL}api/get_dashboard_data/`).then((res)=>{
                    if(res.data.code == 200){
                        this.dashdata = res.data.data;
                         resolve(200);
                    }
                })
            }) 
        },
        <?= $this->load->view("modules/swal_vue_function");?>
    },
    computed:{
        
    },
    watch :{

    },
    mounted(){
        this.get_dashboard_data().then((res)=>{
            // $('#myTable').DataTable();
            console.log(this.dashdata)
        }) 
    }
})

</script>
