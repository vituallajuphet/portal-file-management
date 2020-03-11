<script src="<?php echo base_url(); ?>assets/js/vue.js"></script>
<script src="<?php echo base_url(); ?>assets/js/axios.min.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/datatable.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/datatable-bootstrap.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/datatable-responsive.js"></script>

<script>
    var BASE_URL = "<?= base_url();?>";
</script>

<script>
	let selected_company_ids        = [];
	let selected_remove_company_ids = [];

	$(document).ready(function(){

		$(document).on("change", ".add_comp_box", function(){
			let selected_comp_id = $(this).attr("data");
			let is_checked = $(this)[0].checked;
            
			if(is_checked){
				selected_company_ids.push(selected_comp_id)
			}else{
				selected_company_ids = selected_company_ids.filter(ids => ids != selected_comp_id );
			}

		})

		$(document).on("change", ".remove_comp_box", function(){
			let selected_comp_id = $(this).attr("data");
			let is_checked = $(this)[0].checked;

			if(is_checked){
				selected_remove_company_ids.push(selected_comp_id)
			}
            else{
				selected_remove_company_ids = selected_remove_company_ids.filter(ids => ids != selected_comp_id );
			}
		})

	})
</script>

<script type="text/javascript" class="init">

var myapp = new Vue({
    el:"#myApp",
    
    data(){
        return {
            is_loading:false,
            base_url:BASE_URL,
            users:[],
            selected_comp:"",
            check_company_id:[],
            companies: <?=json_encode(get_companies())?>,
            selected_user:[],
            selected_user_id:"",
            frmdata:{
                companies:[],
                reg_file:[],
            }
        }
    },
    methods:{
        getInvestors(){
            return new Promise((resolve, reject)=> {
                axios.get(`${BASE_URL}admin/api_get_investors/`).then((result)=>{
                    this.users = result.data.data;
                    resolve(200);
                })
            }) 
        },
        showApproveInvestor(user_id){
            let self = this;
            this.is_loading = true
            self.confirm_alert("Are you sure to approve this investor?").then(res=>{
                let formdata = new FormData();
                formdata.append("user_id", user_id)

                axios.post(`${BASE_URL}admin/api_approve_investor`, formdata).then((result)=>{
                    if(result.data.code == 200){
                        this.is_loading = false
                        self.s_alert("Approved Successfully", "success");
						self.page_reload(1300);
                    }
                })

            })

        },
        showInvestorDetails(user_id){
            let self = this;

            let user_data = this.users.find(user => user.user_id == user_id)
            this.frmdata  = user_data;

            $("#investor_details_modal").modal();
        },
        show_update_active(user_id, user_status){

            let self = this;
            let status = 1;
            let msg  = "Are you sure to update this investor from Pending to Active?";

            if(user_status  == 1){
                msg    = "Are you sure to update this investor from Active to Disable?";
                status = 2;
            }
            else if(user_status  == 2){
                msg    = "Are you sure to update this investor from Disable to Active?";
                status = 1;
            }
            self.confirm_alert(msg).then(res =>{

                let formdata = new FormData();
                formdata.append("user_id", user_id)
                formdata.append("user_status", status)
                this.is_loading = true
                axios.post(`${BASE_URL}admin/api_update_investor_status`, formdata).then((result)=>{
                    this.is_loading = false
                    if(result.data.code == 200){
                        self.s_alert("Updated Successfully", "success");
						self.page_reload(700);
                    }
                })

            })
        },
        showInvestorCompany(user_id){
            let self = this;

            self.selected_user_id = user_id;

            let user_data = this.users.find(user => user.user_id == user_id)
            self.frmdata          = user_data;

            let dtble = $(".dtatable_cont");
				// reset selected	
				selected_company_ids        = [];
				selected_remove_company_ids = [];
				let html = `
					<table  id="myTable2" class="table dt-responsive nowrap admin-table" style="width:100%">
						<thead>
							<tr>
                                <th>Company ID</th>
                                <th>Company Name</th>
                                <th>Company Email</th>
                                <th>Assigned</th>
                                <th>Select</th>
                            </tr>
						</thead>
					<tbody> `;

				self.companies.map(comp => {
                    let is_assigned = user_data.companies.find(mcomp => mcomp.company_id == comp.company_id);
                    let action_td = `<input type="checkbox" class="add_comp_box" data="${comp.company_id}"> Assign`;
                    let is_joined = "No";

                    if(is_assigned != "" && is_assigned != undefined){
                        action_td =`<input type="checkbox" class="remove_comp_box" data="${comp.company_id}"> Remove`;
                        is_joined = "Yes"
                    }

                    html += `
                        <tr">
                            <td>${comp.company_id}</td>
                            <td>${comp.company_name}</td>
                            <td>${comp.company_email}</td>
                            <td>${is_joined}</td>
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

                $("#edit_investor_company").modal()
                $("#myTable2").DataTable();	
        },
        submitFormAddCompany(){
            let self = this;
            var con_message = "Are you sure to update this investor's company information?";

            // if(selected_company_ids.length == 0 && selected_remove_company_ids != 0){
            //     con_message = "Are you sure to remove this company(s) to this investor?";
            // }
            // else if(selected_company_ids.length != 0 && selected_remove_company_ids != 0){
            //     con_message = "Are you sure to remove and add the selected companies to this investor?";
            // }

            if(selected_company_ids.length == 0 && selected_remove_company_ids == 0){
                self.s_alert("Plaese select at least one company", "error");
                return;
            }

            else{
                self.confirm_alert(con_message).then(res =>{
                    if(res == 200){
                        this.is_loading = true
                        let frmdata = new FormData();
                        let fdata = {
                            user_id     : self.selected_user_id,
                            comp_ids    : selected_company_ids,
                            un_comp_ids : selected_remove_company_ids,
                        }
                        frmdata.append("frmdata", JSON.stringify(fdata))
                        axios.post(`${self.base_url}admin/api_assigned_company`, frmdata).then(res=>{
                            this.is_loading = false
                            let resp = res.data;
                            if(resp.code == 200){
                                
                                self.s_alert("Successfully Updated", "success");
                                self.page_reload(1300);
                            }
                        })
                    }
                })
            }
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

        <?= $this->load->view("modules/swal_vue_function");?>
    },
    computed:{

    },
    mounted(){
        
        this.getInvestors().then((res)=>{
            $('#myTable').DataTable();
             $('#myTable2').DataTable();
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
			let myTable2 = $("#myTable2 thead th:last-child");
			setTimeout(() => {
				is_reposive = (myTable.css("display") == "none")
				is_reposive2 = (myTable2.css("display") == "none")
			}, 1200);
			
		}
		$(document).on("click", ".showInvestorDetails", function(){
			if(is_reposive){
				let r_id = $(this).attr("data");
				myapp.showInvestorDetails(r_id);
			}
		})

        $(document).on("click", ".showInvestorCompany", function(){
			if(is_reposive){
				let i_id = $(this).attr("data");
				myapp.showInvestorCompany(i_id);
			}
		})
        

        $(document).on("click", ".show_update_active", function(){
			if(is_reposive){
				let dta = $(this).attr("data");
                var newdata = dta.split("|") ;
                
				myapp.show_update_active(newdata[0], newdata[1]);
			}
		})


	})

</script>
