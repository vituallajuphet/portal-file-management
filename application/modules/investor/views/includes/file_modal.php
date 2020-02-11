
<?php // NOTE:  MODAL ________________________________________ ?>

<div id="responsive-modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Contact Department</h4>
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            
            <div class="modal-body">
                <form id="myform" method="post" action="<?=base_url("investor/contact_department")?>">
                    <div class="form-group">
                        <label for="recipient-name" class="control-label">Department:</label>
                        <select name="department" class="form-control custom-select">
                            <?php
                               
                              foreach ($all_departments as $key => $value) {
                                echo "<option value='$value->dept_email|$value->dept_name'>".$value->dept_name."</option>";
                              }
                             ?>
                        </select>
                        <!-- <input type="text" disabled class="form-control custom_bg_color" name="company" value="<?php echo $company_email[0]->company_name.'-'.$company_email[0]->company_email; ?>"> -->
                        <!-- <input type="hidden" class="form-control" name="email" value="<?php echo $company_email[0]->company_email; ?>"> -->
                    </div>
                    <div class="form-group">
                        <label for="recipient-name" class="control-label">Your Email Address:</label>
                        <input readonly required type="text" class="form-control" name="your_email" value="<?php echo $this->session->userdata('email_address');?>" placeholder="Enter your email.">
                    </div>
                    <div class="form-group">
                        <label for="message-text" class="control-label">Message:</label>
                        <textarea placeholder="Enter Message..." required class="form-control" name="message"></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                <button type="submit" name="send_message" id="send_message" form="myform" class="btn btn-primary waves-effect waves-light">Send</button>
            </div>
        </div>
    </div>
</div>
<div id="request-file-modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Request a File</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
                <form id="send_request_form" method="post" action="<?=base_url("investor/send_request_file")?>">
                    <!-- <div class="form-group">
                        <label for="recipient-name" class="control-label">Company:</label>
                        <select class="form-control custom-select">
                            <option value="">Male</option>
                            <option value="">Female</option>
                        </select>
                    </div> -->
                    <div class="form-group">
                        <label for="recipient-name" class="control-label">Department:</label>
                        <!-- <input type="text" class="form-control" name="recipient-name"> -->
                        <select name="department" class="form-control custom-select">
                            <?php
                           
                      
                              foreach ($all_departments as $key => $value) {
                                echo "<option value='$value->dept_email|$value->dept_name'>$value->dept_name</option>";
                              }

                            //   foreach ($all_departments as $key => $value) {
                            //     echo "<option value='$value->dept_email|$value->dept_name'>".$value->dept_name."</option>";
                            //   }
                             ?>
                        </select>
                    </div>
                    <div class="form-group">
                      <label for="message-text" class="control-label">Title:</label>
                        <input type="text" class="form-control" name="title">
                    </div>

                     <div class="form-group">
                      <label for="message-text" class="control-label">Company: </label>
                        <select name="company" required class="form-control custom-select">
                             <option value="">Please select company.</option>
                             <?php 
                                foreach ($company_email as $key) {
                                    echo "<option value='$key->company_id'>$key->company_name</option>";
                                }
                             ?>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="message-text" class="control-label">Comment:</label>
                        <textarea class="form-control" name="comment"></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                <button type="submit" name="send_request" id="send_request" form="send_request_form" class="btn btn-primary waves-effect waves-light"><i class='fas fa-file' ></i> Submit</button>
            </div>
        </div>
    </div>
</div>
