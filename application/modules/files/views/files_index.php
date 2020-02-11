<!-- ============================================================== -->
<!-- Page wrapper  -->
<!-- ============================================================== -->

<div class="page-wrapper">
   <div class="main_con">
        <div class="container-fluid">
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h3 class="text-themecolor">Files
                   </h3>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="<?= base_url(); ?>">Home</a></li>
                        <li class="breadcrumb-item active">files</li>
                    </ol>
                </div>
                <div class="col-md-7 align-self-center text-right d-none d-md-block">
                    <button type="button" class="btn btn-theme " data-toggle="modal" data-target="#responsive-modal" ><i class='fas fa-envelope' ></i> Contact Department</button>
                    <button type="button" class="btn btn-theme " data-toggle="modal" data-target="#request-file-modal" ><i class='fas fa-file' ></i> Request a File</button>
                    <!-- <button type="button" class="btn btn-theme model_img img-responsive"><i class='fas fa-envelope' data-toggle="modal" data-target="#responsive-modal" ></i> Request A File</button> -->
                    <!-- <img src="../assets/images/alert/model.png" alt="default" data-toggle="modal" data-target="#responsive-modal" class="model_img img-responsive" /> -->

                </div>
            </div>

            <!-- ============================================================== -->
            <!-- Start Page Content -->
            <!-- ============================================================== -->

            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-body">

                    <table id="example" class="table   dt-responsive nowrap " style="width:100%">
                    <!-- <table id="example" class="table " style="width:100%"> -->
                        <thead>
                            <tr>
                                <th>File Name</th>
                                <th>Department</th>
                                <th>Company</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            <?php

                            foreach ($files_rows as $key => $value) {
                              echo "<tr>";
                              echo "<td>$value->file_name</td>";
                              echo "<td>$value->file_department</td>";
                              echo "<td>$value->company_name</td>";
                              if (in_array(explode(".",$value->file_name)[1] , $viewable_files)) {
                                echo "<td class='action_td'><a class='btn' target='_blank' href='".base_url()."uploaded_files/$value->file_name'><i class='fas fa-eye'></i> </a><a class='btn' href='".base_url()."uploaded_files/$value->file_name' download><i class='fas fa-download' ></i> </a></td>";
                              }else{
                                echo "<td class='action_td'><a class='btn' href='".base_url()."uploaded_files/$value->file_name' download><i class='fas fa-download' ></i> </a></td>";
                              }
                              echo "</tr>";
                            }
                             ?>
                        </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <!-- ============================================================== -->
            <!-- End PAge Content -->
            <!-- ============================================================== -->
        </div>
   </div>
</div>


<?php // NOTE:  MODAL ________________________________________ ?>

<div id="responsive-modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Contact Department</h4>
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            
            <div class="modal-body">
                <form id="myform" method="post">
                    <div class="form-group">
                        <label for="recipient-name" class="control-label">Department:</label>
                        <select name="department" class="form-control custom-select">
                            <?php
                              foreach ($all_departments as $key => $value) {
                                echo "<option value='prospteam@gmail.com|$value|'>$value</option>";
                              }
                             ?>
                        </select>
                        <!-- <input type="text" disabled class="form-control custom_bg_color" name="company" value="<?php echo $company_email[0]->company_name.'-'.$company_email[0]->company_email; ?>"> -->
                        <!-- <input type="hidden" class="form-control" name="email" value="<?php echo $company_email[0]->company_email; ?>"> -->
                    </div>
                    <div class="form-group">
                        <label for="recipient-name" class="control-label">You Email:</label>
                        <input readonly required type="text" class="form-control" name="your_email" value="<?php echo $this->session->userdata('email_address');?>" placeholder="Enter your email.">
                    </div>
                    <div class="form-group">
                        <label for="message-text" class="control-label">Message:</label>
                        <textarea required class="form-control" name="message"></textarea>
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
                <form id="send_request_form" method="post">
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
                                echo "<option value='$value'>$value</option>";
                              }
                             ?>
                        </select>
                    </div>
                    <div class="form-group">
                      <label for="message-text" class="control-label">Title:</label>
                        <input type="text" class="form-control" name="title">
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
