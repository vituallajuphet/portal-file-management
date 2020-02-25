<!-- ============================================================== -->
<!-- Page wrapper  -->
<!-- ============================================================== -->
<div id="myApp">
    <div class="page-wrapper">
        <div class="main_con">
                <div class="container-fluid">
                    <div class="row page-titles">
                        <div class="col-md-5 align-self-center">
                            <h3 class="text-themecolor">{{!archieved_table_shown ? 'Manage Files':'Archived Files'}} </h3>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="<?=base_url()?>">Home</a></li>
                                <li class="breadcrumb-item active nav-active"  @click="archieved_table_shown = false">Manage Files</li>
                                <li class="breadcrumb-item active" v-show="archieved_table_shown">Archived Files</li>
                            </ol>
                        </div>
                        <div class="col-md-7 align-self-center text-right d-none d-md-block">
                            <button type="button" @click="show_archieved()" class="btn btn-theme2 mr-2"><i :class="!archieved_table_shown ? 'fa fa-trash' : 'fa fa-file'"></i> {{!archieved_table_shown ? 'Archived Files' : 'Published Files'}}</button>
                            <button type="button"  @click="show_add_modal()" class="btn btn-theme" data-toggle="modal" data-target="#responsive-modal" ><i class='fas fa-plus' ></i> Add File</button>
                        </div>
                    </div>
                    <!-- ============================================================== -->
                    <!-- Start Page Content -->
                    <!-- ============================================================== -->
                    <div class="row">
                    <div class="col-12">
                        <div class="card">
                        <div class="card-body">
                            <div v-show="!archieved_table_shown">
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
                            </div>
                            
                            <!-- archived files table -->
                            <div v-show="archieved_table_shown">
                                <!-- table a"rhieved -->
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
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <!-- ============================================================== -->
                    <!-- End PAge Content -->
                    <!-- ============================================================== -->
                </div>
                <!-- modal -->
                <?php 
                    if(!empty($has_mod)){
                        $this->load->view($has_mod);
                    }
                ?>
            <!-- end modal -->
        </div>
    </div>
</div>

