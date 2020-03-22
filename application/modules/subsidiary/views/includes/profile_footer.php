<script src="<?php echo base_url(); ?>assets/js/croppie.js"></script>
<script>
  var BASE_URL = "<?= base_url();?>";
</script>

<script>
var $uploadCrop,$uploadCrop2;
  let photoChanged = false;
  $(document).ready(function(){
    
    $('#view_upload-demo').hide();
    $('#view_remove_btn').hide();

    $('#view_upload_image').on("change", function(){
      photoChanged = true;
      showfile();
    })

    function showfile(){
       $('#view_upload-demo').show();
        $('img[name="view_test_profile"]').hide();
        $('#view_remove_btn').show();
    }


    $('#view_remove_btn').on('click',function(){
        $('#view_upload-demo').hide();
        $('#view_upload_image').val('');
        $('img[name="view_test_profile"]').show();
        $('#view_remove_btn').hide();
      photoChanged = false;
    });

    function readFile(input,layout) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                if (layout=='view_upload-demo') {
                    $uploadCrop2.croppie('bind', {
                        url: e.target.result
                    });
                }else{
                    $uploadCrop.croppie('bind', {
                        url: e.target.result
                    });
                }
                $(layout).addClass('ready');
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $uploadCrop2 = $('#view_upload-demo').croppie({
        viewport: {
            width: 200,
            height: 200,
            type: 'circle'
        },
        boundary: {
            width: 220,
            height: 222
        }
    });

    $('#view_upload_image').on('change', function () { readFile(this,'view_upload-demo'); });

  })
</script>


<script type="text/javascript" class="init">
 
  var myapp = new Vue({
    el:"#myApp",
    
    data(){
      return {
        base_url:BASE_URL,
        user: <?= get_logged_user("json");?>,
        form_data: <?= get_logged_user("json");?>,
        is_show_pass:false,
        pass:"",
        companies:[],
        is_readonly:true,
        con_password:""
      }
    },
    methods:{
        showpass(){
            this.is_show_pass = !this.is_show_pass
        },
        showCompanies(){
            $("#company_modal").modal();
        },
        showUpdateProfile(){
            $("#updateprofile").modal()
            $('#view_remove_btn').trigger("change")
        },
        editProfile(){
          this.is_readonly = !this.is_readonly;
        },
        submit_profile_pic(){
          if(photoChanged){
            $uploadCrop2.croppie('result', {
                type: 'canvas',
                size: 'original',
            }).then(function (resp) {
                let profile_img = resp;    
                let fdata = new FormData();
                fdata.append("profile_img", profile_img)
                axios.post(`${BASE_URL}api/update_profilepic`, fdata).then(res =>{
                    if(res.data.code==200){
                        Swal.fire( '', 'Updated Successfully', 'success' ).then(ress =>{ 
                          if(ress.value){ location.reload(); } 
                        }) 
                    }else{
                      Swal.fire( '', 'Updated Failed', 'error' )
                    }
                })
            });
          }else{
            Swal.fire( '', 'Please select a picture first', 'error' )
          }
        },
        submit_profile_update(){
          let self = this;
          if(self.form_data.password == self.con_password){
              Swal.fire({
                icon: "warning",
                text: "Are you sure to update?",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
              }).then((result) => {
                if (result.value) {
                    let fdata = new FormData();
                    fdata.append("fdata", JSON.stringify(this.form_data));
                    axios.post(`${BASE_URL}subsidiary/update_user_profile`, fdata).then(res =>{
                      if(res.data.code == 200){
                        self.user = JSON.parse(res.data.data)
                        self.form_data = JSON.parse(res.data.data)
                        Swal.fire( '', 'Successfully Updated', 'success' ).then(ress =>{
                          if(ress.value){
                            location.reload();
                          }
                        }) 
                      }
                      else if(res.data.code == 205){
                        Swal.fire( '', 'Username or Email address is already used', 'error' )
                      }
                    })
                }
              })
          }
          else{
               Swal.fire( '', 'Password does not match', 'error' )
          }
          
        }
        
    },

    computed:{
        getpass(){
            if(this.is_show_pass){
               return this.user.password
            }else{
                return "••••••"
            }
        },
        get_edit_btn_txt(){
          if(this.is_readonly){
            return "Edit";
          }
          return "Cancel";
        },
        getProfilePic(){
            let path = this.base_url+"assets/images/profiles/"
            if(this.user.profile_picture == ""){
              return path+"placeholder.jpg";
            }
           return path+this.user.profile_picture
            
        }
    },

    mounted(){
        let self = this;
        
        axios.get(`${BASE_URL}api/get_my_companies/`).then((resp)=>{
            // const res = resp.data;
            if(resp.data.code == 200){
                self.companies = resp.data.data;
                console.log(self.companies)
            }
        })
    }

  })
</script>


