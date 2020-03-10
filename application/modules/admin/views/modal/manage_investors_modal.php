<div id="investor_details_modal" class="modal show dept_modal" tabindex="-1" role="dialog" aria-labelledby="vcenter"  aria-modal="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="vcenter"><i class="icon-User"></i> Investor Information</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="text-center mb-5">
                                <figure style="max-width:200px;margin: 0 auto;">
                                    <img style="border: 1px solid #9c9ea2; border-radius: 50%;width:100%;" :src="base_url+'assets/images/profiles/'+(frmdata.profile_picture != '' ? frmdata.profile_picture : 'dummyprofile.png')" alt="profile">
                                </figure>
                            </div>
                            <hr>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">First Name</label>
                                <div style="">{{frmdata.firstname}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">Last Name</label>
                                <div style="">{{frmdata.lastname}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">Email Address</label>
                                <div style="">{{frmdata.email_address}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">Status</label>
                                <div style="">{{frmdata.approved == 1 ? 'Approved' : 'Pending'}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">Contact Number</label>
                                <div style="">{{frmdata.contact_number}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group" v-if="frmdata.reg_file.length != 0">
                                <label class="control-label f-bold">Files / Documents</label>
                                <div style="" v-for="file in frmdata.reg_file"><a :href="base_url+'assets/registration_files/'+file.file_name" download class="btn btn-theme"><i class="fa fa-download"></i> Download File</a></div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group" v-if="frmdata.companies.length != 0">
                                <label class="control-label f-bold">Company</label>
                                <div style="" v-for="comp in frmdata.companies">{{comp.company_name}}</div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-theme waves-effect" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>
                </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<div id="edit_investor_company" class="modal show dept_modal" tabindex="-1" role="dialog" aria-labelledby="vcenter"  aria-modal="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
                <form action="#" @submit.prevent="submitFormAddCompany()">
                    <div class="modal-header">
                        <h4 class="modal-title" id="vcenter"><i class="icon-Building"></i> Company Information</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="control-label f-bold">Assigned Company</label>
                                    <div v-if="frmdata.companies.length > 0" style="" v-for="comp in frmdata.companies">{{comp.company_name}}</div>
                                    <div v-if="frmdata.companies.length == 0" style="font-size: 13px; color: #df7272;">This investor has no company yet.</div>
                                    <input type="hidden" name="user_id" :value="selected_user_id">
                                </div>
                                <hr>
                            </div>
                            <div class="col-md-12">
                                    <label for="">Please Select Companies</label>
                                    <div class="dtatable_cont"></div>
                            </div> 
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-theme">Submit</button>
                        <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                    </div>
                </form>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

