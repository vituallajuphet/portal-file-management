 <script>
 var register_data = [];
<?php
    if(isset($_SESSION["register_data"])){
        ?> register_data = JSON.parse('<?= json_encode($_SESSION["register_data"])?>'); <?php
        unset($_SESSION["register_data"]);
    }
?>
   </script>
<script type="module">  

  import login from '<?= base_url()?>assets/vue_components/login/login.js';   
  import register from '<?= base_url()?>assets/vue_components/login/register.js';   
  import forgotpassword from '<?= base_url()?>assets/vue_components/login/forgotpassword.js';   
  import updatepassword from '<?= base_url()?>assets/vue_components/login/updatepassword.js';   

    const routes = [
        {path: '*',  redirect: "/"},
        {path: '/',  name:'login', component: login},
        {path: '/register', name:'register', component: register},
        {path: '/forgotpassword', name:'forgotpassword', component: forgotpassword},
        {path: '/updatepassword/:token', name:'updatepassword', component: updatepassword, props: true}
    ];
    const router = new VueRouter({
        scrollBehavior() {
            return { x: 0, y: 0 };
        },
        history:true,
    
        routes:routes,
    })
    // router guard here
    router.beforeEach((to, from, next) => {
        if(to.path == "/updatepassword" || to.path == "/updatepassword/"){
            if (to.params.token == "" || to.params.token == undefined)
            {
                next(from);
            }
        }else{
            switch (to.name) {
                case "login":
                    document.title ="Login Account"
                    break;
                case "register":
                    document.title ="Register Account"
                    break;
                case "forgotpassword":
                    document.title ="Forgot Password"
                    break;
                case "updatepassword":
                    document.title ="New Password"
                    
                    break;
                default:
                    break;
            }
            next()
        }
        
    })
    // main app
    var app = new Vue({
            el:"#myApp",
            data (){
                return {
                   name:"asd" 
                }
            },
            mounted(){
               
            },
            router:router 
    })
</script>

