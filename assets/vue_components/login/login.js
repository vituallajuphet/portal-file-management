
export default { 
    template: `
            <div class="login_div">
                <div class="row">
                    <div class="col-md-6">
                        <figure><img src="${base_url}assets/images/logo.png" alt="main logo"></figure>
                    </div>
                    <div class="col-md-6">
                       <h2>Welcome!</h2>
                       <p>If you already have an account, please enter your details below. If you don't have one yet, please sign up first.
                        </p>
                         <form id="frmLogin" class="mt-4" action="${base_url}login/process_login" method="post">
                            <div class="form-group"> 
                                <input name="email" type="text" class="form-control" required  aria-describedby="emailHelp"
                                    placeholder="* Email Address / Username">
                            </div>
                            <div class="form-group loginpassdiv">
                               <input type="password" name="password" autocomplete="on"  required class="form-control"  aria-describedby="emailHelp"
                                    placeholder="*Password">
                            </div>
                            <div class="forgotPassdiv">
                                <router-link to="/forgotpassword">Forgot Password? Click Here.</router-link>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <button type="submit" class="btn btn-primary btn-theme">Login</button>
                                </div>
                                <div class="col-md-6 register-link">
                                    <router-link to="/register">Not Yet Registered? <small>Click Here to Sign Up!</small></router-link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `,
    methods: {

    },
    mounted() {

    },
    computed :{
        
    }
}

