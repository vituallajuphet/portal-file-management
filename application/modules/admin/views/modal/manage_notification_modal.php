<div id="notification_details" class="modal show dept_modal" tabindex="-1" role="dialog" aria-labelledby="vcenter"  aria-modal="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width:500px">
        <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="vcenter"><i class="icon-building"></i> Notifications Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                               <label class="control-label">From:</label>
                               <div style="font-weight:bold">{{frmdata.firstname + ' ' +frmdata.lastname}}</div>
                            </div>
                        </div>
                        <div class="col-md-6"></div>
                        <div class="col-md-6">
                            <div class="form-group">
                               <label class="control-label">Date:</label>
                               <div style="font-weight:bold">{{frmdata.date_created}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">User Type</label>
                                  <div style="font-weight:bold">{{frmdata.user_type}}</div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <label class="control-label">Message:</label>
                            <div style="font-weight:bold">{{frmdata.message}}</div>
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
