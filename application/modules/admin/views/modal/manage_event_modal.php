<div id="event_add_modal" class="modal show dept_modal" tabindex="-1" role="dialog" aria-labelledby="vcenter"  aria-modal="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width:700px;">
        <div class="modal-content">
                <form @submit.prevent="submit_add_event()" id="submit_add_form" :action="base_url+'admin/save_event'" method="post" enctype="multipart/form-data">
                    <div class="modal-header">
                        <h4 class="modal-title" id="vcenter"><i class="icon-building"></i> Add News / Event</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="control-label f-bold">Event Title</label>
                                    <input name="event_title" class="form-control" type="text" required placeholder="Enter event title">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="control-label f-bold">Event Description</label>
                                    <textarea id="event_content" class="form-control txtarea" placeholder="Enter Description"></textarea>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="control-label f-bold">Upload Image</label>
                                    <input ref="file_post" accept="image/*" @change="file_handler()" type="file" class="form-control upload-file" name="file">
                                </div>
                            </div>
                            <input type="hidden" id="event_desc" name="event_desc" >

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-theme2 waves-effect" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>
                        <button type="submit" class="btn btn-theme waves-effect"><i class="fa fa-check"></i> Submit</button>
                    </div>
                </form>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>


<div id="event_edit_modal" class="modal show dept_modal" tabindex="-1" role="dialog" aria-labelledby="vcenter"  aria-modal="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width:700px;">
        <div class="modal-content">
                <form @submit.prevent="submit_update_event()" id="submit_update_form" :action="base_url+'admin/update_event'" method="post" enctype="multipart/form-data">
                    <div class="modal-header">
                        <h4 class="modal-title" id="vcenter"><i class="icon-building"></i>Update Add News / Event</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <input type="hidden" v-model="frm.event_id" name="event_id">
                                    <input type="hidden" v-model="frm.image_name" name="image_name">
                                    <label class="control-label f-bold">Event Title</label>
                                    <input v-model="frm.event_title" name="event_title" class="form-control" type="text" required placeholder="Enter event title">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="control-label f-bold">Event Description</label>
                                    <textarea id="event_content2" class="form-control txtarea" placeholder="Enter Description"></textarea>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="control-label f-bold">Upload Image</label>
                                    <input ref="file_post" accept="image/*" @change="file_handler()" type="file" class="form-control upload-file" name="file">
                                </div>
                            </div>
                            <input type="hidden" id="event_desc2" name="event_desc" >

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-theme2 waves-effect" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>
                        <button type="submit" class="btn btn-theme waves-effect"><i class="fa fa-check"></i> Update</button>
                    </div>
                </form>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>