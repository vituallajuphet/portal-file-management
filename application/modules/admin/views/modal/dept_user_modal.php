<div id="dept_user_modal" class="modal show dept_modal" tabindex="-1" role="dialog" aria-labelledby="vcenter"  aria-modal="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form action="#" @submit.prevent="submit_add_form()">
                <div class="modal-header">
                    <h4 class="modal-title" id="vcenter"><i class="icon-User"></i> Add Department User</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">First Name</label>
                                <input v-model="frmdata.first_name" required type="text" name="first_name" class="form-control" placeholder="Enter first name here">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">Last Name</label>
                                <input v-model="frmdata.last_name" required type="text" name="last_name" class="form-control" placeholder="Enter last name here">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">Email Address</label>
                                <input v-model="frmdata.email_address"  required type="email" name="email" class="form-control" placeholder="Enter email address here">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">Username</label>
                                <input v-model="frmdata.username" required type="text" name="username" class="form-control" placeholder="Enter username here">
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">Contact Number</label>
                                <input v-model="frmdata.contact_number" required type="text" name="contact_number" class="form-control" placeholder="Enter number here">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group has-success">
                                <label class="control-label f-bold">Departments</label>
                                <select  class="form-control custom-select" v-model="selected_dept">
                                    <option value="">Please select department</option>
                                    <option v-for="dep in department" :value="dep.dept_name">{{dep.dept_name}}</option>
                                  
                                </select>
                                 <div class="comp-cont">
                                    <span v-for="depts in frmdata.departments" class="">{{depts.dept_name}} <a @click="remove_dept(depts.dept_id)" href="javascript:;">x</a></span>
                                </div>
                            </div>
                           
                        </div>
                        <div class="col-md-12">
                        
                            <div class="note-mod">Note: The default password for this user is `<span>cbmc1234</span>`.</div>
                        </div>
                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-themes btn-theme" ><i class="fa fa-check"></i> Save</button>
                    <button type="button" class="btn btn-default waves-effect" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>
                </div>
            </form>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<!-- edit modal -->

<div id="dept_edit_modal" class="modal show dept_modal" tabindex="-1" role="dialog" aria-labelledby="vcenter"  aria-modal="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form action="#" @submit.prevent="submit_edit_form()">
                <div class="modal-header">
                    <h4 class="modal-title" id="vcenter"><i class="icon-User"></i> Edit Department User</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">First Name</label>
                                <input required v-model="frmdata.first_name" type="text" name="first_name" class="form-control" placeholder="Enter first name here">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">Last Name</label>
                                <input required type="text" v-model="frmdata.last_name" name="last_name" class="form-control" placeholder="Enter last name here">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">Email Address</label>
                                <input required type="email"  v-model="frmdata.email_address" name="email" class="form-control" placeholder="Enter email address here">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">Username</label>
                                <input required type="text" v-model="frmdata.username" name="username" class="form-control" placeholder="Enter username here">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">Contact Number</label>
                                <input required type="text"  v-model="frmdata.contact_number" name="contact_number" class="form-control" placeholder="Enter number here">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group has-success">
                                <label class="control-label f-bold">Departments</label>
                                <select  v-model="selected_dept" class="form-control custom-select">
                                    <option value="">Please select department</option>
                                    <option v-for="dep in department" :value="dep.dept_name">{{dep.dept_name}}</option>
                                  
                                </select>
                                <div class="comp-cont">
                                    <span v-for="depts in frmdata.departments" class="">{{depts.dept_name}} <a @click="remove_dept(depts.dept_id)" href="javascript:;">x</a></span>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-themes btn-theme" ><i class="fa fa-check"></i> Update</button>
                    <button type="button" class="btn btn-default waves-effect" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>
                </div>
            </form>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<!-- start details modal -->
    
<div id="dept_details_modal" class="modal show dept_modal" tabindex="-1" role="dialog" aria-labelledby="vcenter"  aria-modal="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form action="#" @submit.prevent="submit_form()">
                <div class="modal-header">
                    <h4 class="modal-title" id="vcenter"><i class="icon-User"></i> Department User Details</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">First Name</label>
                                <input required type="text" v-model="selected_user.firstname" readonly name="first_name" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">Last Name</label>
                                <input required type="text" v-model="selected_user.lastname" readonly name="last_name" class="form-control" >
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">Email Address</label>
                                <input required type="email" v-model="selected_user.email_address" readonly name="email" class="form-control" >
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">Username</label>
                                <input required type="text" v-model="selected_user.username" readonly name="username" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label f-bold">Contact Number</label>
                                <input required type="text"  v-model="selected_user.contact_number" readonly name="contact_number" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group has-success">
                                <label class="control-label f-bold">Departments</label>
                                 <div class="comp-cont user-details">
                                    <span v-for="dept in selected_user.departments" class="">{{dept.departments}} </span>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-theme waves-effect" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>
                </div>
            </form>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- end details modal -->