<script src="<?php echo base_url(); ?>assets/js/vue.js"></script>
<script src="<?php echo base_url(); ?>assets/js/axios.min.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/datatable.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/datatable-bootstrap.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/datatable-responsive.js"></script>
<script src="https://cdn.ckeditor.com/4.14.0/standard/ckeditor.js"></script>

<script>
    var BASE_URL = "<?= base_url();?>";

    $(document).ready(function(){
        CKEDITOR.replace( 'event_content' );
        CKEDITOR.replace( 'event_content2' );
    })
</script>



<script type="text/javascript" class="init">

var myapp = new Vue({
    el:"#myApp",
    
    data(){
        return {
            base_url:BASE_URL,
            posts:[],
            has_file : false,
            frm:{
                event_title:"",
                event_id:"",
                image_name:""
            }
        }
    },
    methods:{
        getRequestData(){
            return new Promise((resolve, reject)=> {
                axios.get(`${BASE_URL}api/get_events/`).then((res)=>{
                    if(res.data.code == 200){
                        this.posts = res.data.data;
                         resolve(200);
                    }
                })
            }) 
        },
        show_add_modal(){
            $("#event_add_modal").modal();
        },
        show_details_modal(event_id){
                
        },
        event_edit_modal(event_id){
            let post = this.posts.find(post => post.event_id == event_id);

            if(post !== undefined){
                CKEDITOR.instances['event_content2'].setData(post.event_content)
            }
            
            this.frm.event_title = post.event_title;
            this.frm.event_id = post.event_id;
            this.frm.image_name = post.event_image;

            $("#event_edit_modal").modal();

        },
        show_delete_user(event_id){
            let self = this;

            self.confirm_alert("Are you sure to delete this event?").then(res =>{

                let frmdata = new FormData();
                frmdata.append("event_id", event_id);

                axios.post(`${self.base_url}api/delete_event`, frmdata).then(res =>{
                    if(res.data.code == 200){
                        self.s_alert("Deleted Successfully!", "success");
                        self.page_reload(500);
                    }
                })

            })
        },
        get_post_status(title){

            let stat = (title == 1 ) ? "Published" : "Pending";
            return stat;
            
        },
        file_handler(){
           let post_file = this.$refs;

           if(post_file.file_post.files.length > 0){
                this.has_file = true; 
           }

        },  
        submit_add_event(){
            let self = this;
            let msg  = "Are sure to publish this event?"

            if(!self.has_file){
                msg  = "Are sure to publish this event with an image?"
            }

            let cont_data = CKEDITOR.instances.event_content.getData();

            $("#event_desc").val(cont_data);
            
            self.confirm_alert(msg).then(res =>{
                $("#submit_add_form").submit();
            })

        },
        submit_update_event(){
            let self = this;
            let msg  = "Are sure to update this event?"

            // if(!self.has_file){
            //     msg  = "Are sure to publish this event with an image?"
            // }

            let cont_data = CKEDITOR.instances.event_content2.getData();

            $("#event_desc2").val(cont_data);
            
            self.confirm_alert(msg).then(res =>{
                $("#submit_update_form").submit();
            })

        },
        <?= $this->load->view("modules/swal_vue_function");?>
    },
    computed:{
        
    },
    watch :{

    },
    mounted(){
        this.getRequestData().then((res)=>{
            $('#myTable').DataTable();
        }) 
    }
})




</script>
