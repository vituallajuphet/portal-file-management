<!-- ============================================================== -->
<!-- Page wrapper  -->
<!-- ============================================================== -->

<div id="myApp">
    <div class="page-wrapper">
        <div class="main_con">
                <div class="container-fluid">
                    <div class="row page-titles">
                        <div class="col-md-5 align-self-center">
                            <h3 class="text-themecolor">Manage Request
                        </h3>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="<?=base_url()?>">Home</a></li>
                                <li class="breadcrumb-item active">Manage Request</li>
                            </ol>
                        </div>
                        <div class="col-md-7 align-self-center text-right d-none d-md-block">
                            <button type="button" class="btn btn-theme " data-toggle="modal" data-target="#responsive-modal" ><i class='fas fa-envelope' ></i> Contact Department</button>
                            <button type="button" class="btn btn-theme " data-toggle="modal" data-target="#request-file-modal" ><i class='fas fa-file' ></i> Request a File</button>
                        </div>
                    </div>
                    <!-- ============================================================== -->
                    <!-- Start Page Content -->
                    <!-- ============================================================== -->
                    <div class="row">
                    <div class="col-12">
                        <div class="card">
                        <div class="card-body">
                            <table id="myTable" class="table   dt-responsive nowrap " style="width:100%">
                            <!-- <table id="example" class="table " style="width:100%"> -->
                                <thead>
                                    <tr>
                                        <th>Request ID</th>
                                        <th>Title</th>
                                        <th>Status</th>
                                        <th>Company</th>
                                        <th>Department</th>
                                        <th>Requested Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(req) in file_requests" :key="req.request_id" :class="(req.request_status == 'Completed' ? 'row-completed' : '')">
                                        <td>{{req.request_id}}</td>
                                        <td>{{req.file_title }}</td>
                                        <td>{{req.request_status}}</td>
                                        <td>{{req.company_name}}</td>
                                        <td>{{req.department}}</td>
                                        <td>{{req.requested_date}}</td>
                                        <td class="action_td">
                                          <a href="javascript:;" @click="viewDetails(req.request_id)" title="View Details"><i class="fas fa-eye"></i></a>
                                          <!-- <a v-if="req.request_status == 'Completed'" href="javascript:;" @click="downloadFile(req.request_id)" title="Download"><i class="fas fa-download"></i></a> -->
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                    </div>
                    <!-- ============================================================== -->
                    <!-- End PAge Content -->
                    <!-- ============================================================== -->
                </div>
        </div>
    </div>
    <!-- modal here -->
         <div id="verticalcenter" class="modal" tabindex="-1" role="dialog" aria-labelledby="vcenter" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="vcenter">Requested File Details</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    </div>
                    <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="Title">Title</label>
                                        <input v-model="modaldata.file_title" type="text" readonly class="form-control" id="Title">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="status">Status</label>
                                        <input v-model="modaldata.file_status" type="text" readonly class="form-control" id="status">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="company">Company</label>
                                        <input v-model="modaldata.company" type="text" readonly class="form-control" id="company" >
                                    </div>
                                </div>
                                 <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="department">Department</label>
                                        <input v-model="modaldata.department" type="text" readonly class="form-control" id="department" >
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="requested_date">Requested Date</label>
                                        <input v-model="modaldata.requested_date" type="text" readonly class="form-control" id="requested_date" >
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="company">Additional Information/Comment</label>
                                        <textarea v-model="modaldata.comment" readonly class="form-control" rows="5" spellcheck="false"></textarea>
                                    </div>
                                </div>
                                <div class="col-md-12" v-if="modaldata.attachment_files != undefined && modaldata.attachment_files !='' ">
                                    <div class="form-group">
                                        <label for="company">Attached File(s):</label>
                                        <div class="attached-file">
                                          <a v-for="files in modaldata.attachment_files" title="Download File" :href="base_url+'uploaded_files/'+files.file_name" download>{{files.file_name}} <i class="fa fa-download"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger btn-theme waves-effect" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
<!-- end modal -->

<!-- add modal -->
    <?php 
        if(!empty($has_modal)){
            $this->load->view($has_modal);
        }  
    ?>
<!-- end modal -->

</div>

