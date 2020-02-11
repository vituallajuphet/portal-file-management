export default {
    template: `
            <div class="register_div">
               <div class="register_div">
                    <div class="register_top">
                            <div class="row">
                                <div class="col-md-3 register_logo">
                                    <figure class="mlogo" @click="redirectLogin()"><img src="${base_url}assets/images/logo.png" alt="main logo"></figure>
                                </div>
                                <div class="col-md-9 register_txt">
                                    <h2>Sign Up</h2>
                                    <p>Create your account by filling out the form below with required attachment.
                                    </p>
                                </div>
                            </div>
                    </div>
                    <div class="register_form">
                            <form class="mt-4" action="${base_url}login/process_register" method="post" enctype="multipart/form-data">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" v-model="firstname" name="firstname" required class="form-control"  aria-describedby="emailHelp"
                                                placeholder="* First Name">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" v-model="lastname"  name="lastname" required class="form-control"  aria-describedby="emailHelp"
                                                placeholder="* Last Name">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" v-model="email"  name="email"  required class="form-control"  aria-describedby="emailHelp"
                                                placeholder="* Email Address">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" v-model="contact" required name="contact" class="form-control"  aria-describedby="emailHelp"
                                                placeholder="* Contact Number">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" v-model="username"  name="username" required class="form-control"  aria-describedby="emailHelp"
                                                placeholder="* Username">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="password" v-model="password" name="password" autocomplete="on" class="form-control" required  aria-describedby="emailHelp"
                                                placeholder="* Password">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="password" v-model="confirm_password" name="confirm_password" autocomplete="on" class="form-control" required  aria-describedby="emailHelp"
                                                placeholder="* Confirm Password">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="file" id="file" name="file" class="form-control"  aria-describedby="emailHelp"
                                                placeholder="* ">
                                              <label for="file">Upload Requirements</label>
                                        </div>
                                    </div>
                                    <div class="col-md-12 register_footer">
                                        <div class="row">
                                            <div class="col-md-3">
                                                <button type="submit" class="btn btn-primary btn-theme">Register</button>
                                            </div>
                                            <div class="col-md-3 register_login">
                                                <router-link to="/">Already Registered? <span>Click Here to Login!</span></router-link>
                                            </div>
                                            <div class="col-md-6"></div>
                                        </div>
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
        if(register_data.length != 0){
            this.firstname = register_data.firstname
            this.lastname = register_data.lastname
            this.email = register_data.email
            this.contact = register_data.contact
            this.username = register_data.username
            this.password = register_data.password
            this.confirm_password = register_data.confirm_password
        }
    },
    data (){
        return {
            firstname: "",
            lastname: "",
            email: "",
            contact: "",
            username: "",
            password: "",
            confirm_password: ""
        }
    }
}