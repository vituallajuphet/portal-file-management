export default {
    template: `
            <div class="updatepassword">
                <div class="row">
                    <div class="col-md-12">
                        <figure class="mlogo" @click="redirectLogin()"><img src="${base_url}assets/images/logo.png" alt="main logo"></figure>
                    </div>
                    <div class="col-md-12">
                       <h2>Reset Password</h2>
                         <form id="frmnewpassword" @submit.prevent="submitForm()" class="mt-4" action="#" method="post">
                            <div class="form-group"> 
                                <input name="password" type="password" v-model="password" autocomplete="on" class="form-control" required  aria-describedby="emailHelp"
                                    placeholder="* New Password">
                            </div>
                            <div class="form-group"> 
                                <input name="newpassword" type="password" v-model="conpassword" autocomplete="on" class="form-control" required  aria-describedby="emailHelp"
                                    placeholder="* Confirm New Password">
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <button type="submit" class="btn btn-primary btn-theme">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `,
    methods: {
        submitForm(){
            let self = this;
            if (this.password == "" || this.conpassword==""){
                Swal.fire({ icon: 'error',  text: 'Please input the required fields.' })
            } else if (this.password != this.conpassword){
                Swal.fire({ icon: 'error', text: 'Password does not match.' })
            } else{
                if (this.password.length <= 5){
                    Swal.fire({ icon: 'error', text: 'Password must be greater than 6 letters.' })
                }else{
                    Swal.fire({
                        title: 'Are you sure to reset your password?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes'
                    }).then((result) => {
                        if (result.value) {
                            let token = this.$route.params.token;
                            let frmdata = new FormData()
                            frmdata.append("password", this.password);
                            frmdata.append("token", token);
                            axios.post(`${base_url}login/update_new_password`, frmdata).then(function (res) {
                                if (res.data.code == 200) {
                                    Swal.fire({
                                        icon: 'success', title: 'Successfully Updated'
                                    }).then(() => {
                                        self.$router.push({ name: "login" })
                                    })
                                } else {
                                    Swal.fire({ icon: 'error',text: 'Updating password failed.' })
                                }
                            })
                        }
                    }) 
                }
            }
        },
        redirectLogin(){
            this.$router.push({name:"login"});
        }
    },
    data () {
        return {
            password: "",
            conpassword: "",
        }
    },
    mounted() {
        let token = this.$route.params.token;
        let frmdata = new FormData()
        frmdata.append("passwordkey", token);
        let self= this;
        axios.post(`${base_url}login/verify_password_key`, frmdata).then(function(res){
            if(res.data.code != 200){
                Swal.fire({
                    icon: 'error',
                    text: 'This link is already expired.',
                }).then(function () {
                    self.$router.push({ name: "login" })
                })
            }
        })
    },
    computed: {

    }
}