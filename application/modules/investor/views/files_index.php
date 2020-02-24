<!-- ============================================================== -->
<!-- Page wrapper  -->
<!-- ============================================================== -->

<div id="myApp">
<div class="page-wrapper">
   <div class="main_con">
        <div class="container-fluid">
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h3 class="text-themecolor">Files
                   </h3>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="<?= base_url(); ?>">Home</a></li>
                        <li class="breadcrumb-item active">files</li>
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
                                <th>File Name</th>
                                <th>Department</th>
                                <th>Company</th>
                                <th>No. of Files</th>
                                <th>Date Added</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(file, index) in getFiles">
                              <td>{{file.file_title}}</td>
                              <td>{{file.department}}</td>
                              <td>{{file.company_name}}</td>
                              <td>{{file.file_data.length != 0 ? file.file_data.length + ' File(s)' : 'Deleted'}} </td>
                              <td>
                                  {{file.file_data.length == 0 ? 'N/A' : file.file_data[0].date_added}}
                             </td>
                              <td class="last-td-file" v-if="file.file_data.length == 1">
                                  <a :href="base_url+'uploaded_files/'+file.file_data[0].file_name" target="_blank" title="view details" style="color:black"><i class="fa fa-eye"></i></a>
                                  <a :href="base_url+'uploaded_files/'+file.file_data[0].file_name" title="download file" download style="color:black" ><i class="fa fa-download"></i></a>
                              </td>
                              <td class="last-td-file" v-else-if="file.file_data.length > 1">
                                  <a href="javascript:;" @click="showFile(file.request_id)" title="view details" style="color:black"><i class="fa fa-eye"></i></a>
                              </td>
                              <td class="last-td-file" v-else>
                                <span class="text-danger">No action</span>    
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

 <?php 
        if(!empty($has_modal)){
            $this->load->view($has_modal);
        }  
    ?>
</div>