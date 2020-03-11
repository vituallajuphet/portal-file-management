<!-- ============================================================== -->
<!-- Page wrapper  -->
<!-- ============================================================== -->

<div id="myApp">
    <div class="my_loader" v-show="is_loading">
        <div class="loader_con">
                <img src="http://localhost/portal/assets/images/preloader.gif" alt="preloader">
        </div>
    </div>
    <div class="page-wrapper">
        <div class="main_con">
                <div class="container-fluid">
                    <div class="row page-titles">
                        <div class="col-md-5 align-self-center">
                            <h3 class="text-themecolor">Manage Files 
                        </h3>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="<?=base_url()?>">Home</a></li>
                                <li class="breadcrumb-item active">Manage Files</li>
                            </ol>
                        </div>
                        <div class="col-md-7 align-self-center text-right d-none d-md-block">
                              <button type="button"  @click="show_add_modal()" class="btn btn-theme" data-toggle="modal" data-target="#responsive-modal" ><i class='fas fa-plus' ></i> Add File</button>
                        </div>
                    </div>
                    <!-- ============================================================== -->
                    <!-- Start Page Content -->
                    <!-- ============================================================== -->

                    <!-- start tab -->
                     <div class="row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-body">
                                    <ul class="nav nav-tabs" role="tablist">
                                    <li class="nav-item"> <a class="nav-link active" data-toggle="tab" href="#home" role="tab"><span class="hidden-sm-up"><i class="ti-file"></i></span> <span class="hidden-xs-down">Published</span></a> </li>
                                    <li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#profile" role="tab"><span class="hidden-sm-up"><i class="ti-trash"></i></span> <span class="hidden-xs-down">Archived</span></a> </li>
                                </ul>
                                <!-- Tab panes -->
                                <div class="tab-content tabcontent-border">
                                    <div class="tab-pane active" id="home" role="tabpanel">
                                        <div class="p-20">
                                            <!-- start -->
                                               <h4 class="card-title">Published File List</h4>

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

                                                <table id="myTable" class="table dt-responsive nowrap admin-table" style="width:100%">
                                                    <thead>
                                                        <tr>
                                                            <th>File ID</th>
                                                            <th>File Title</th>
                                                            <th>Department</th>
                                                            <th>Added By</th>
                                                            <th>Date Added</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(file, index) in files">
                                                            <td>{{file.files_id}}</td>
                                                            <td>{{file.file_title}}</td>
                                                            <td>{{file.file_department}}</td>
                                                            <td>{{file.firstname +' '+ file.lastname}}</td>
                                                            <td>{{file.date_added}}</td>
                                                            <td class="td-manage-file">
                                                                <!-- <a onClick="show_file_details(myapp.file.files_id)" href="javascript:;" ><i class="fas fa-eye"></i></a> -->
                                                                <a class="show_file_details act_btn" :data="file.files_id" @click="show_file_details(file.files_id)" href="javascript:;" ><i class="fas fa-eye"></i></a>
                                                                <a class="show_edit_modal act_btn" :data="file.files_id" href="javascript:;" @click="show_edit_modal(file.files_id)" ><i class="fas fa-edit"></i></a>
                                                                <a class="act_btn" :href="base_url+'uploaded_files/'+file.file_name" download ><i class="fas fa-download"></i></a>
                                                                <a class="text-danger show_delete_file act_btn"  :data="file.files_id" @click="show_delete_file(file.files_id)" href="javascript:;" ><i class="fas fa-trash"></i></a>
                                                            </td>
                                                        
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            <!-- end -->
                                        </div>
                                    </div>
                                    <!-- completed -->
                                    <div class="tab-pane  p-20" id="profile" role="tabpanel">
                                        <!-- start -->
                                             <!-- complted -->
                                             <h4 class="card-title">Archived File List</h4>

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

                                                <table  id="myTable2" class="table dt-responsive nowrap admin-table" style="width:100%">
                                                    <thead>
                                                       
                                                        <tr>
                                                            <th>File ID</th>
                                                            <th>File Title</th>
                                                            <th>Department</th>
                                                            <th>Deleted Date</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="file in archieved_files">
                                                            <td>{{file.files_id}}</td>
                                                            <td>{{file.file_title}}</td>
                                                            <td>{{file.file_department}}</td>
                                                            <td>{{file.date_updated}}</td>
                                                            <td class="td-manage-file" style="max-width:300px;">
                                                                <a class="act_btn show_restore_file" :data="file.files_id" @click="show_restore_file(file.files_id)" title="restore file" href="javascript:;"><i class="fa fa-recycle"></i></a>
                                                                <a class="show_delete_archieve" :data="file.files_id" title="delete file" @click="show_delete_archieve(file.files_id)" class="text-danger" href="javascript:;"><i class="fa fa-trash"></i></a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                        <!-- end -->
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                     </div>
                    <!-- end tab -->
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

