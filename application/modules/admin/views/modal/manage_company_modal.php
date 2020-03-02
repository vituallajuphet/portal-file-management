<div id="company_details_modal" class="modal show dept_modal" tabindex="-1" role="dialog" aria-labelledby="vcenter"  aria-modal="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="vcenter"><i class="icon-building"></i> Company Details</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">Company Name</label>
                                <div style="font-weight:bold">{{frmdata.company_name}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">Email Address</label>
                                <div style="font-weight:bold">{{frmdata.company_email}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">Contact Number</label>
                               <div style="font-weight:bold">{{frmdata.company_contact}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">Type</label>
                                <div style="font-weight:bold">{{frmdata.company_type}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">Additional Information / Remarks</label>
                                <div style="font-weight:bold">{{frmdata.remarks}}</div>
                            </div>
                        </div>                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<!-- add modal form, -->
<div id="company_add_modal" class="modal show dept_modal" tabindex="-1" role="dialog" aria-labelledby="vcenter"  aria-modal="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width:400px;">
        <div class="modal-content">
                <form action="#" @submit.prevent="submit_add_form()">
                    <div class="modal-header">
                    <h4 class="modal-title" id="vcenter"><i class="icon-building"></i> Company Details</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label">Company Name</label>
                                <input class="form-control" type="text" required v-model="frmdata.company_name" Placeholder="Enter Company Name">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label">Address</label>
                                <input class="form-control" type="text" required v-model="frmdata.address" Placeholder="Enter Address">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label">Email Address</label>
                                <input class="form-control" type="email" required v-model="frmdata.company_email" Placeholder="Enter Email Address">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label">Contact Number</label>
                               <input class="form-control" type="text" required v-model="frmdata.company_contact" Placeholder="Enter Numbers">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label">Additional Information / Remarks</label>
                                <textarea v-model="frmdata.remarks" class="form-control" placeholder="Enter addional information (Optional)" ></textarea>
                            </div>
                        </div>                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-themes btn-theme" ><i class="fa fa-check"></i> Save</button>
                    <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                </div>
                </form>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<!-- end modal form -->


<!-- add modal form, -->
<div id="company_edit_modal" class="modal show dept_modal" tabindex="-1" role="dialog" aria-labelledby="vcenter"  aria-modal="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width:400px;">
        <div class="modal-content">
                <form action="#" @submit.prevent="submit_edit_form()">
                    <div class="modal-header">
                    <h4 class="modal-title" id="vcenter">Edit Company Details</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label">Company Name</label>
                                <input class="form-control" type="text" required v-model="frmdata.company_name" Placeholder="Enter Company Name">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label">Address</label>
                                <input class="form-control" type="text" required v-model="frmdata.address" Placeholder="Enter Address">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label">Email Address</label>
                                <input class="form-control" type="email" required v-model="frmdata.company_email" Placeholder="Enter Email Address">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label">Contact Number</label>
                               <input class="form-control" type="text" required v-model="frmdata.company_contact" Placeholder="Enter Numbers">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label">Additional Information / Remarks</label>
                                <textarea v-model="frmdata.remarks" class="form-control" placeholder="Enter addional information (Optional)" ></textarea>
                            </div>
                        </div>                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-themes btn-theme" ><i class="fa fa-edit"></i> Update</button>
                    <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                </div>
                </form>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<!-- end modal form -->
