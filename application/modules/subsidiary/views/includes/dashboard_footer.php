<script src="<?php echo base_url(); ?>assets/js/vue.js"></script>
<script src="<?php echo base_url(); ?>assets/js/axios.min.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/datatable.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/datatable-bootstrap.js"></script>
<script  src="<?php echo base_url(); ?>assets/js/module/datatable-responsive.js"></script>

<script>
var BASE_URL = "<?= base_url();?>";
</script>

<script type="text/javascript" class="init">

const paginate_div = {
    template:`
        <div class="paginator">
            <div class="post-card-cont">
                    <div  class="card post-cards" v-for="post in paginatedData">
                        <img class="card-img-top" :src="base_url+'assets/uploads/'+post.event_image" alt="post cards">
                        <div class="card-body">
                            <h4 class="card-title">{{post.event_title}}
                                <span class="card-date">11-22-22</span>
                                <hr>
                            </h4>
                            <div class="card-text post-contents" v-html="excerpt_text(post.event_content)"> </div>
                            <a :href="base_url+'subsidiary/view_event/'+post.event_id" class="btn btn-theme"><i class="fa fa-eye"></i> Read More...</a>
                        </div>
                    </div>           
            </div>
            <div class="nav-paginator">
                <button 
                  :disabled="pageNumber === 0" 
                  @click="prevPage" class="btn-prev btnnav">
                  <i class="fa fa-arrow-left"></i> Previous
              </button>
              <button 
                  :disabled="pageNumber >= pageCount -1" 
                  @click="nextPage" class="btn-next btnnav">
                  Next <i class="fa fa-arrow-right"></i>
              </button>
            </div>
        </div>
    `,
    data (){
        return {
            pageNumber: 0,
            base_url: BASE_URL,
        }
    },
    props:{
        posts:{
            type:Array,
            required:true
        },
        size:{
            type:Number,
            required:false,
            default: 3
        }
   },
   methods:{
      nextPage(){
          this.pageNumber++;
      },
      prevPage(){
        this.pageNumber--;
      },
      excerpt_text(content){

        let res = content;

        if(content.length > 100){
            res = content.substr(0, 100)+"..."
        }       
        return res;
      },
  },
  computed:{
    pageCount(){
      let l = this.posts.length,
          s = this.size;
      return Math.ceil(l/s);
    },
    paginatedData(){
      const start = this.pageNumber * this.size,
            end = start + this.size;
      return this.posts
               .slice(start, end);
    }
  }, 
  mounted(){
    
  }
}

var myapp = new Vue({
    el:"#myApp",
    
    data(){
        return {
            base_url:BASE_URL,
            posts:[],
            size: 3,
            dashboard_data:[]
        }
    },
    methods:{
      getPosts(){
        return new Promise((resolve, reject)=> {
            axios.get(`${this.base_url}api/get_events/`).then((res)=>{
                if(res.data.code == 200){
                    this.posts = res.data.data;
                        resolve(200);
                }
            })
        }) 
      },
      get_dashdata(){
        return new Promise((resolve, reject)=> {
            axios.get(`${this.base_url}investor/get_file_requests/1`).then((res)=>{
                if(res.data.code == 200){
                    this.dashboard_data = res.data.data;
                        resolve(200);
                }
            })
        }) 
      },
     <?= $this->load->view("modules/swal_vue_function");?>


    },
    computed:{
        total_files(){
            let total = this.dashboard_data.filter(file => file.attachments != undefined && file.request_status == 'Completed');

            return total.length
        },
        total_request(){
            let total = this.dashboard_data.filter(file => file.request_status == 'Pending');

            return total.length
        },
        total_processing(){
            let total = this.dashboard_data.filter(file => file.request_status == 'Processing');

            return total.length
        }
    },
    watch :{
       
    },
    mounted(){
        this.getPosts().then((res)=>{ }) 
        this.get_dashdata().then(res=>{ })
    },
    components:{
        paginate_div
    }
})

</script>
