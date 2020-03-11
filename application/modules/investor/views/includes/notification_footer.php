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
            notifications:<?= json_encode(get_my_notifications())?>,
            frmdata:{

            }
        }
    },
    methods:{
        show_delele_noti(noti_id){
            let self = this;

            self.confirm_alert("are you sure to delete this message?").then(res=>{
                
                let formdata = new FormData();
                formdata.append("notify_id", noti_id);
                axios.post(`${self.base_url}api/delete_notification`, formdata).then(res =>{
                    if(res.data.code == 200){
                        self.s_alert("Deleted Successfully", "success")
                        self.page_reload(500);
                    }
                })
            })
        },
        show_notify_details(noti_id){
            let self = this;

            let noti = self.notifications.find(notify => notify.notify_id == noti_id);

            self.frmdata = noti;

            $("#notification_details").modal();

        },
        <?= $this->load->view("modules/swal_vue_function");?>

        
    },
    computed:{
        
    },
    watch :{
        selected_comp (to){
            let comp_id = to;
            let is_exists =  this.frmdata.companies.find(comp => comp.company_id == comp_id);
            if(!is_exists){
                let comp_data = this.companies.find(comp => comp.company_id == comp_id);
                this.frmdata.companies.push({company_id:comp_id,  company_name:comp_data.company_name});
            }else{
                Swal.fire({ icon: 'error', text: 'This company is already added.', })
            }
            
            
        }
    },
    mounted(){
        // this.getRequestData().then((res)=>{
        //     $('#myTable').DataTable();
        // }) 
            let table = $('#myTable').DataTable();
            table.order( [ 0, 'desc' ] ) .draw();

        <?php
            if(!empty($has_notify_id)){
                ?>  
                      let noti_id = <?= $has_notify_id;?>;
                      let is_existed = this.notifications.find(notify => notify.notify_id == noti_id);

                      if(is_existed != undefined && is_existed != ""){
                        this.show_notify_details(noti_id);
                      }
                    
                <?php
            }
        ?>
    }
})

</script>
