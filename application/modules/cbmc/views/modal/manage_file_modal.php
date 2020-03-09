<div id="file_modal" class="modal show dept_modal file-modal" tabindex="-1" role="dialog" aria-labelledby="vcenter"  aria-modal="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content modal-form ">
            <form action="<?=base_url("cbmc/save_file_data")?>" id="frm_add_file" @submit.prevent="submit_add_form()" method="POST" enctype="multipart/form-data">
                <div class="modal-header">
                    <h4 class="modal-title" id="vcenter"><i class="icon-File"></i> Add File </h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label f-bold">File Title</label>
                                <input required v-model="frmdata.file_title" required type="text" name="file_title" class="form-control" placeholder="Enter file title here">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label f-bold">Department</label>
                                <select name="department" v-model="frmdata.department" required id="" class="form-control">
                                    <option value="">Please select a department</option>
                                    <option v-for="dept in departments" :value="dept.departments">{{dept.departments}}</option>
                                    <option value="N/A">N/A</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label f-bold">Select a File</label><br>
                                <input id="upload_file" required name="file" type="file" class="form-control">
                                <label for="upload_file"><i class="fa fa-upload"></i>  Browse a file</label>
                                <span  class="text-success hasFile" style="display:none;color: #282b29 !important; font-weight: bold; font-size: 14px;">  </span> 
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label f-bold">Remarks / Additional Information</label>
                                <textarea v-model="frmdata.remarks" name="remarks" placeholder="Enter additional information (Optional)" name="name"rows="4" class="form-control"></textarea>
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

<!-- edit modal -->
<div id="file_edit_modal" class="modal show dept_modal file-modal" tabindex="-1" role="dialog" aria-labelledby="vcenter"  aria-modal="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content modal-form ">
            <form action="<?=base_url("cbmc/update_file_data")?>" id="frm_edit_file" @submit.prevent="submit_edit_form()" method="POST" enctype="multipart/form-data">
                <div class="modal-header">
                    <h4 class="modal-title" id="vcenter"><i class="icon-File"></i> Update File Details </h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12 text-right">
                            <button @click="show_restrict_user()" type="button" class="btn btn-theme2">Restrict User</button>
                            <hr>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <input type="hidden" name="file_id" v-model="selected_file_id">
                                <label class="control-label f-bold">File Title</label>
                                <input v-model="frmdata.file_title"  required type="text" name="file_title" class="form-control" placeholder="Enter file title here">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label f-bold">Department</label>
                                <select name="department" v-model="frmdata.department" required id="" class="form-control">
                                    <option value="">Please select a department</option>
                                    <option v-for="dept in departments" :value="dept.departments">{{dept.departments}}</option>
                                    <option value="N/A">N/A</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label f-bold">Select a File</label><br>
                                <input id="upload_file2" name="file" type="file" class="form-control">
                                <label for="upload_file2"><i class="fa fa-upload"></i>  Browse a file</label>
                                <span  class="text-success hasFile" style="display:none;color: #282b29 !important; font-weight: bold; font-size: 14px;">  </span> 
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label f-bold">Remarks / Additional Information</label>
                                <textarea  v-model="frmdata.remarks" name="remarks" rows="4" class="form-control"></textarea>
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

<!-- end edit modal -->


<!-- view details modal -->
<div id="view_details_modal"  class="modal show dept_modal" tabindex="-1" role="dialog" aria-labelledby="vcenter"  aria-modal="true">
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content modal-form ">
                <div class="modal-header">
                    <h4 class="modal-title" id="vcenter"><i class="icon-File"></i> File Information </h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="row">
                       
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">File Title</label>
                                <input readonly v-model="file_details.file_title"  required type="text" name="file_title" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-6"></div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">Department</label>
                                <input type="text" class="form-control" readonly v-model="file_details.file_department">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">Added By</label>
                                <input type="text" class="form-control" readonly v-model="file_details.firstname">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">File Status</label>
                                <input type="text" class="form-control" readonly v-model="file_details.file_status">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">Date Added</label>
                                <input type="text" class="form-control" readonly v-model="file_details.date_added">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label f-bold">Remarks / Additional Information</label>
                                <textarea  v-model="file_details.remarks" readonly name="name"rows="4" class="form-control"></textarea>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <label class="control-label f-bold">File Attached</label><br>
                            <span> <a class="btn btn-theme" :href="base_url+'uploaded_files/'+file_details.file_name" download><i class="fa fa-download"></i> Download File</a></span>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                </div>
            </form>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<!-- end view details modal -->

<!-- view details modal -->
<div id="restrict_user_form" class="modal show dept_modal"  tabindex="2" role="dialog" aria-labelledby="vcenter"  aria-modal="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width:600px;">
        <div class="modal-content modal-form ">
             <form action="#" method="POST" @submit.prevent="submit_restrict_form()">
                <div class="modal-header">
                    <h4 class="modal-title" id="vcenter"><i class="icon-File"></i> Restrict Users </h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                 
                    <div class="row">
                        <div class="col-md-12">
                                <div class="dtatable_cont">
                                
                                </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-theme" type="submit"><i class="fa fa-check"></i> Submit</button>
                    <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                </div>
            </form>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<!-- end view details modal -->