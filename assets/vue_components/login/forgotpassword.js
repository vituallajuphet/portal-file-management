
export default {
    template: `
            <div class="forgotpassword">
                <div class="row">
                    <div class="col-md-12">
                        <figure class="mlogo" @click="redirectLogin()"><img src="${base_url}assets/images/logo.png" alt="main logo"></figure>
                    </div>
                    <div class="col-md-12">
                       <h2>Reset your password</h2>
                       <p>Enter your user account's verified email address and we will send you a password reset link. </p>
                         <form id="frmforgotpass" class="mt-4" action="${base_url}login/request_new_password" method="post">
                            <div class="form-group"> 
                                <input name="email" type="email" class="form-control" required  aria-describedby="emailHelp"
                                    placeholder="* Email Address">
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
        redirectLogin() {
            this.$router.push({ name: "login" });
        }
    },
    mounted() {

    },
    computed: {

    }
}