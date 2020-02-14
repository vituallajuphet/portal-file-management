<div id="manage_user_mod" class="modal show dept_modal"  tabindex="-1" role="dialog" aria-labelledby="vcenter"  aria-modal="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form action="#" @submit.prevent="submit_form()">
                <div class="modal-header">
                    <h4 class="modal-title" id="vcenter"><i class="icon-User"></i> Add Company User</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">First Name</label>
                                <input required type="text" v-model="frmdata.first_name" name="frmdata.first_name" class="form-control" placeholder="Enter first name here">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">Last Name</label>
                                <input required type="text" v-model="frmdata.last_name" name="last_name" class="form-control" placeholder="Enter last name here">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">Email Address</label>
                                <input required type="email" v-model="frmdata.email_address" name="email" class="form-control" placeholder="Enter email here">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">Username</label>
                                <input required type="text" v-model="frmdata.username" name="username" class="form-control" placeholder="Enter username here">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">Contact Number</label>
                                <input required type="text" v-model="frmdata.contact_number" name="contact_number" class="form-control" placeholder="Enter number here">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group has-success">
                                <label class="control-label">Assigned Company</label>
                                <select v-model="selected_comp" class="form-control custom-select">
                                    <option value="">Please select company</option>
                                   <option :value="comp.company_id" v-for="comp in companies">{{comp.company_name}}</option>
                                </select>
                                <div class="comp-cont">
                                    <span class="" v-for="comp in frmdata.companies">{{comp.company_name}} <a href="javascript:;" @click="remove_comp(comp.company_id)">x</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                                <div class="note-mod">Note: The default password for this user is `<span>cbmc1234</span>`.</div>
                        </div>
                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-theme" ><i class="fa fa-check"></i> Submit</button>
                    <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                </div>
            </form>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<!-- start edit modal-->
    <div id="manage_user_edit_mod" class="modal show dept_modal"  tabindex="-1" role="dialog" aria-labelledby="vcenter"  aria-modal="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form action="#" @submit.prevent="submit_form()">
                <div class="modal-header">
                    <h4 class="modal-title" id="vcenter"><i class="icon-User"></i> Edit Company User</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">First Name</label>
                                <input required type="text" name="first_name" class="form-control" placeholder="Enter first name here">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">Last Name</label>
                                <input required type="text" name="last_name" class="form-control" placeholder="Enter last name here">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">Email Address</label>
                                <input required type="email" name="email" class="form-control" placeholder="Enter email here">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">Username</label>
                                <input required type="text" name="username" class="form-control" placeholder="Enter username here">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">Contact Number</label>
                                <input required type="text" name="contact_number" class="form-control" placeholder="Enter number here">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group has-success">
                                <label class="control-label">Assigned Company</label>
                                <select v-model="selected_comp" class="form-control custom-select">
                                    <option value="">Please select company</option>
                                   <option :value="comp.company_id" v-for="comp in companies">{{comp.company_name}}</option>
                                </select>
                                <div class="comp-cont">
                                    <span class="" v-for="comp in frmdata.companies">{{comp.company_name}} <a href="javascript:;" @click="remove_comp(comp.company_id)">x</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                               
                            
                        </div>
                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-theme" ><i class="fa fa-edit"></i> Update</button>
                    <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                </div>
            </form>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- end start -->

<!-- start view modal-->
    <div id="view_user_details_modal" class="modal show dept_modal"  tabindex="-1" role="dialog" aria-labelledby="vcenter"  aria-modal="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form action="#" @submit.prevent="submit_form()">
                <div class="modal-header">
                    <h4 class="modal-title" id="vcenter"><i class="icon-User"></i> Company User Details</h4>
                    <button type="button"  class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">First Name</label>
                                <input required type="text" v-model="selected_user.firstname" name="first_name" class="form-control" readonly>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">Last Name</label>
                                <input required type="text"  v-model="selected_user.lastname" name="last_name" class="form-control" readonly>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">Email Address</label>
                                <input required type="email"  v-model="selected_user.email_address" name="email" class="form-control" readonly>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">Username</label>
                                <input required type="text" v-model="selected_user.username" name="username" class="form-control" readonly>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">Contact Number</label>
                                <input required type="text" v-model="selected_user.contact_number" name="contact_number" class="form-control" readonly>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group has-success">
                                <label class="control-label">Assigned Company</label>
                               
                                <div class="comp-cont">
                                    <span class="" v-for="comp in selected_user.companies">{{comp.company_name}} 
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                               
                            
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
<!-- end start -->