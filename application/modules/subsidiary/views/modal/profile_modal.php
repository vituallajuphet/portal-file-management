<div id="company_modal" class="modal show" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-modal="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Companies </h4>
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            
            <div class="modal-body">
               <!-- start -->
                    <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Company Name</th>
                                    <th>Email Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="comp in companies">
                                    <td>{{comp.company_name}}</td>
                                    <td>{{comp.company_email}}</td>
                                </tr>
                            </tbody>
                        </table>
               <!-- end -->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<div id="updateprofile" class="modal show" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-modal="true">
    <div class="modal-dialog">
        <div class="modal-content">
                <form action="#" id="formprofile" @submit.prevent="submit_profile_pic()">
                    <div class="modal-header">
                <h4 class="modal-title">Update Profile Picture </h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                
                <div class="modal-body">
                <!-- start -->
                        <div class="my-0 row form-group">
                            <div class="col-md-12">
                                <button class="btn waves-effect waves-light btn-outline-danger" id="view_remove_btn" type="button" style=" float: right; margin-right: 40px; "><i class="fa fa-times"></i> Reset</button>
                                <img class="view_test_profile" name="view_test_profile" :src="getProfilePic" style="display:block;margin-bottom:10px;" alt="profile_image">
                                <div id="view_upload-demo"></div>
                                <input type="file" class= name="view_upload_image" id="view_upload_image" />
                                <label for="view_upload_image" id="upload_label"><i class="fa fa-upload"></i>  Browse file</label>
                                <input type="hidden" id="view_imagebase64" name="view_imagebase64" />
                            </div>
                        </div>
                <!-- end -->
                </div>
                <div class="modal-footer update-form">
                    <button type="submit" class="btn btn-primary">Update</button>
                    <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                </div>
            </form>
        </div>
    </div>
</div>