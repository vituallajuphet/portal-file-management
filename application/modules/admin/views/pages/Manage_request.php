<!-- ============================================================== -->
<!-- Page wrapper  -->
<!-- ============================================================== -->

<div id="myApp">
    <div class="page-wrapper">
        <div class="main_con">
                <div class="container-fluid">
                    <div class="row page-titles">
                        <div class="col-md-5 align-self-center">
                            <h3 class="text-themecolor">{{is_manage_request ? 'Manage Requests' : 'Completed Request'}}
                        </h3>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="<?=base_url()?>">Home</a></li>
                                <li class="breadcrumb-item active">Manage Requests</li>
                                <li v-if="!is_manage_request" class="breadcrumb-item active">Completed Request</li>
                            </ol>
                        </div>
                        <div class="col-md-7 align-self-center text-right d-none d-md-block">
                            <button class="btn btn-theme" @click="is_manage_request = !is_manage_request"> <i class="fa fa-check"></i> {{is_manage_request ? 'Completed Request' : 'Manage Requests'}}</button>
                        </div>
                    </div>
                    <!-- ============================================================== -->
                    <!-- Start Page Content -->
                    <!-- ============================================================== -->
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                    <div v-show="is_manage_request">
                                        <div class="date_cont mt-4">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <div class="formgroup">
                                                        <label class="control-label">Date From:</label>
                                                        <input class="form-control" type="date" id="date_from" >
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="formgroup">
                                                        <label class="control-label">Date To:</label>
                                                        <input class="form-control" type="date" id="date_to">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <table id="myTable" class="table   dt-responsive nowrap admin-table" style="width:100%">
                                        <!-- <table id="example" class="table " style="width:100%"> -->
                                            <thead>
                                                <tr>
                                                    <th>Request ID</th>
                                                    <th>Request File Title</th>
                                                    <th>Status</th>
                                                    <th>Department</th>
                                                    <th>Requested By</th>
                                                    <th>Request Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="req in request_files" :class="get_status_class(req.request_status)" v-if="req.request_status != 'Restricted'">
                                                    <td>{{req.request_id}}</td>
                                                    <td>{{req.file_title}}</td>
                                                    <td>{{req.request_status}} <a class="show_update_status" :data="req.request_id" @click="show_update_status(req.request_id)" style="color:black;" href="javascript:;"><i class="fa fa-edit"></i> </a>
                                                </td>
                                                    <td>{{req.department}}</td>
                                                    <td>{{req.firstname + ' '+  req.lastname}}</td>
                                                    <td>{{req.requested_date}}</td>
                                                    <td class="td-manage-file">
                                                       <a class="view_request_details act_btn" :data="req.request_id" href="javascript:;" @click="view_request_details(req.request_id)" title="View Details" ><i class="fa fa-eye"></i></a>
                                                        <a class="show_approve_request_frm act_btn" :data="req.request_id" @click="show_approve_request_frm(req.request_id)" v-if="req.request_status != 'Pending'" href="javascript:;" title="Upload file to approve"><i class="fas fa-upload"></i></a>
                                                        <a class="act_btn" style="cursor:not-allowed" v-else-if="req.request_status == 'Pending'" href="javascript:;" title="Upload file to approve"><i class="fas fa-upload"></i></a>
                                                        <a :data="req.request_id"  class="text-danger show_delete_request act_btn" title ="Delete Request" href="javascript:;" :data="req.request_id" @click="show_delete_request(req.request_id)" ><i class="fas fa-trash"></i></a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <!-- complted -->
                                    <div v-show="!is_manage_request">
                                        <div class="date_cont mt-4">
                                                    <div class="row">
                                                        <div class="col-md-3">
                                                            <div class="formgroup">
                                                                <label class="control-label">Date From:</label>
                                                                <input class="form-control" type="date" id="date_from2" >
                                                            </div>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <div class="formgroup">
                                                                <label class="control-label">Date To:</label>
                                                                <input class="form-control" type="date" id="date_to2">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        <table id="myTable2" class="table   dt-responsive nowrap admin-table" style="width:100%">
                                        <!-- <table id="example" class="table " style="width:100%"> -->
                                            <thead>
                                                <tr>
                                                    <th>Request ID</th>
                                                    <th>Request File Title</th>
                                                    <th>Status</th>
                                                    <th>Department</th>
                                                    <th>Requested By</th>
                                                    <th>Request Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="req in completed_files" :class="get_status_class(req.request_status)" >
                                                    <td>{{req.request_id}}</td>
                                                    <td>{{req.file_title}}</td>
                                                    <td>{{req.request_status}}
                                                </td>
                                                    <td>{{req.department}}</td>
                                                    <td>{{req.firstname + ' ' + req.lastname}}</td>
                                                    <td>{{req.requested_date}}</td>
                                                    <td class="td-manage-file">
                                                        <a class="act_btn show_completed_details" :data="req.request_id"  href="javascript:;" @click="show_completed_details(req.request_id)" title="View Details" ><i class="fas fa-eye"></i></a>
                                                        <a class="act_btn"  href="javascript:;" title="Edit"><i class="fas fa-edit"></i></a>
                                                        <a class="text-danger show_delete_request act_btn" :data="req.request_id" @click="show_delete_request(req.request_id)" title ="Delete Request" href="javascript:;" ><i class="fas fa-trash"></i></a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- ============================================================== -->
                    <!-- End PAge Content -->
                    <!-- ============================================================== -->
                    <?php 
                        if(!empty($has_mod)){
                            $this->load->view($has_mod);
                        }
                    ?>
                </div>
        </div>
    </div>
</div>

