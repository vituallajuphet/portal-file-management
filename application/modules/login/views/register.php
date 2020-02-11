<div class="container">
     <div class="row">
          <div class="col-md-4 offset-md-4">
               <?php echo form_open('process_register',array("method" => "post")); ?>
                    <div class="form-group">
                         <label>Username</label>
                         <input type="text" class="form-control <?php echo form_error('username') ? 'is-invalid' : ''; ?> " name="username" value="<?php echo set_value('username'); ?>" />
                         <div class="invalid-feedback" <?php echo form_error('username') ? 'style="display:block;"' : ''; ?> >
                              <?php echo form_error ( 'username' ); ?>
                         </div>
                    </div>
                    <div class="form-group">
                         <label>Email</label>
                         <input type="text" class="form-control <?php echo form_error('email') ? 'is-invalid' : ''; ?>" name="email" value="<?php echo set_value('email'); ?>" />
                         <div class="invalid-feedback" <?php echo form_error('email') ? 'style="display:block;"' : ''; ?> >
                              <?php echo form_error ( 'email' ); ?>
                         </div>
                    </div>
                    <div class="form-group">
                         <label>Password</label>
                         <input type="text" class="form-control <?php echo form_error('password') ? 'is-invalid' : ''; ?>" name="password"/>
                         <div class="invalid-feedback" <?php echo form_error('password') ? 'style="display:block;"' : ''; ?> >
                              <?php echo form_error ( 'password' ); ?>
                         </div>
                    </div>
                    <div class="form-group">
                         <label>Confirm Password</label>
                         <input type="text" class="form-control <?php echo form_error('confirm_password') ? 'is-invalid' : ''; ?>" name="confirm_password"/>
                         <div class="invalid-feedback" <?php echo form_error('confirm_password') ? 'style="display:block;"' : ''; ?> >
                              <?php echo form_error ( 'confirm_password' ); ?>
                         </div>
                    </div>
                    <div class="form-group">
                         <input type="submit" class="btn btn-primary btn-block" value="Register"/>
                    </div>
               <?php form_close(); ?>
          </div>
     </div>
</div>
