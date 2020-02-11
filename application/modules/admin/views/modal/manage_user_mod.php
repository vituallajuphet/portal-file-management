<div id="manage_user_mod" class="modal show" tabindex="-1" role="dialog" aria-labelledby="vcenter"  aria-modal="true">
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
                                    <span class="" v-for="comp in frmdata.companies">{{comp.company_name}} <a href="javascript:;" @click="remove_comp(comp.company_id)">x</small></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            Note: The default password for this user is `cbmc1234`.
                        </div>
                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-themes btn-theme" >Submit</button>
                    <button type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Close</button>
                </div>
            </form>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>