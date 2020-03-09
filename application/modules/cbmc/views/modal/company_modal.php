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
                                <label class="control-label f-bold">Company Name</label>
                                <div >{{frmdata.company_name}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">Email Address</label>
                                <div >{{frmdata.company_email}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">Contact Number</label>
                               <div >{{frmdata.company_contact}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">Type</label>
                                <div >{{frmdata.company_type}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">Additional Information / Remarks</label>
                                <div >{{frmdata.remarks}}</div>
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
