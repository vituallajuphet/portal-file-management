<div id="update_status_modal" class="modal show dept_modal file-modal" tabindex="-1" role="dialog" aria-labelledby="vcenter"  aria-modal="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width: 400px;">
        <div class="modal-content modal-form ">
            <form action="#"  @submit.prevent="submit_update_status()" method="POST" >
                <div class="modal-header">
                    <h4 class="modal-title" id="vcenter"><i class="icon-Edit"></i> Update Request Status </h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <input type="hidden" name="request_id" v-model="frm_status.request_id">
                            <div class="form-group">
                                <label form="file_status" class="control-label">Request ID:</label>
                                <div style="font-weight:bold;">{{frm_status.request_id}}</div>
                            </div>
                        </div> 
                        <div class="col-md-6">
                            <div class="form-group">
                                <label form="file_status" class="control-label">File Title:</label>
                                <div style="font-weight:bold;">{{frm_status.file_title}}</div>
                            </div>
                        </div>     
                        <div class="col-md-12">
                            <div class="form-group">
                                <label form="file_status" class="control-label">Status</label>
                                <select name="status" v-model="frm_status.status" id="file_status" class="form-control">
                                    <option value="">Please select status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                </select>
                            </div>
                        </div>         
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-themes btn-theme" ><i class="fa fa-check"></i> Update</button>
                    <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                </div>
            </form>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<!-- start -->
<div id="approve_request_form" class="modal show dept_modal file-modal" tabindex="-1" role="dialog" aria-labelledby="vcenter"  aria-modal="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width:700px;">
        <div class="modal-content modal-form ">
            <form action="#"  @submit.prevent="submit_approve_form()" method="POST" >
                <div class="modal-header">
                    <h4 class="modal-title" id="vcenter"><i class="icon-File"></i> Please select a file</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12 text-right">
                            <a :href="base_url+'admin/add_new_file/'+selected_approved_req_id" class="btn btn-theme"><i class="fa fa-plus"></i> Add File</a>
                        </div>
                        <div class="col-md-12">
                            <input type="hidden" name="request_id" v-model="selected_approved_req_id" required>
                            <table id="myTable3" class="table   dt-responsive nowrap admin-table" style="width:100%">
                                <!-- <table id="example" class="table " style="width:100%"> -->
                                    <thead>
                                        <tr>
                                            <th>File ID</th>
                                            <th>File Title</th>
                                            <th>Department</th>
                                            <th>Date Added</th>
                                            <th>Action</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="file in files">
                                            <td>{{file.files_id}}</td>
                                            <td>{{file.file_title}}</td>
                                            <td>{{file.file_department}}</td>
                                            <td>{{file.date_added}}</td>
                                            <td class="file-row-select">
                                                <span><input type="checkbox" ref="check_hand" :value="file.files_id" @change = "check_handler(file.files_id)" ></span>
                                                <span><a style="color:#222" :href="base_url+'uploaded_files/'+file.file_name" target="_blank"><i class="fa fa-eye" title="view"></i></a></span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                        </div>      
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-themes btn-theme" ><i class="fa fa-check"></i> Approve</button>
                    <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                </div>
            </form>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- end modal -->

<!-- start -->
<div id="view_completed_files" class="modal show dept_modal file-modal" tabindex="-1" role="dialog" aria-labelledby="vcenter"  aria-modal="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width:700px;">
        <div class="modal-content modal-form ">
                <div class="modal-header">
                    <h4 class="modal-title" id="vcenter"><i class="icon-File"></i> Approved Request Details</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label  class="control-label">Request File Title:</label>
                                <div style="font-weight:bold;">{{selected_completed_file.file_title}}</div>
                            </div>
                        </div>    
                        <div class="col-md-6">
                            <div class="form-group">
                                <label  class="control-label">Status:</label>
                                <div style="font-weight:bold;">{{selected_completed_file.request_status}}</div>
                            </div>
                        </div>  
                        <div class="col-md-6">
                            <div class="form-group">
                                <label  class="control-label">Company Name:</label>
                                <div style="font-weight:bold;">{{selected_completed_file.company_name}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label  class="control-label">Department:</label>
                                <div style="font-weight:bold;">{{selected_completed_file.department}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label  class="control-label">Requested Date:</label>
                                <div style="font-weight:bold;">{{selected_completed_file.requested_date}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label  class="control-label">Approved Date:</label>
                                <div style="font-weight:bold;">{{selected_completed_file.date_approved}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label  class="control-label">Approved By:</label>
                                <div style="font-weight:bold;">
                                {{selected_completed_file.file_data.length != 0 ? selected_completed_file.file_data[0].firstname + ' '+ selected_completed_file.file_data[0].lastname : ''}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label  class="control-label">Investor Name:</label>
                                <div style="font-weight:bold;">{{selected_completed_file.firstname +' '+selected_completed_file.lastname}}</div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label  class="control-label">Attached Files:</label>
                                <div>
                                    <a v-for ="files in selected_completed_file.file_data" :href="base_url+'uploaded_files/'+files.file_name" download class="btn btn-theme mr-2 mb-2">{{files.file_title}} <i class="fa fa-download"></i></a>
                                </div>
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
<!-- end modal -->

<!-- start -->
<div id="view_details_request" class="modal show dept_modal file-modal" tabindex="-1" role="dialog" aria-labelledby="vcenter"  aria-modal="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width:700px;">
        <div class="modal-content modal-form ">
                <div class="modal-header">
                    <h4 class="modal-title" id="vcenter"><i class="icon-File"></i>Request File Details</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label  class="control-label">Request File Title:</label>
                                <div style="font-weight:bold;">{{selected_requested_file.file_title}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label  class="control-label">Status:</label>
                                <div style="font-weight:bold;">{{selected_requested_file.request_status}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label  class="control-label">Company:</label>
                                <div style="font-weight:bold;">{{selected_requested_file.company_name}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label  class="control-label">Investor Name:</label>
                                <div style="font-weight:bold;">{{selected_requested_file.firstname + ' '+ selected_requested_file.lastname}}</div>
                            </div>
                        </div>    
                        <div class="col-md-6">
                            <div class="form-group">
                                <label  class="control-label">Department:</label>
                                <div style="font-weight:bold;">{{selected_requested_file.department}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label  class="control-label">Requested Date:</label>
                                <div style="font-weight:bold;">{{selected_requested_file.requested_date}}</div>
                            </div>
                        </div>
                        
                        <div class="col-md-12">
                            <div class="form-group">
                                <label  class="control-label">Comment / Additional Info:</label>
                                <div style="font-weight:bold;">{{selected_requested_file.comment}}</div>
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
<!-- end modal -->