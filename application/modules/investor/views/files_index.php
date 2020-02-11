<!-- ============================================================== -->
<!-- Page wrapper  -->
<!-- ============================================================== -->


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

                    <table id="example" class="table   dt-responsive nowrap " style="width:100%">
                    <!-- <table id="example" class="table " style="width:100%"> -->
                        <thead>
                            <tr>
                                <th>File Name</th>
                                <th>Department</th>
                                <th>Company</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            <?php

                            foreach ($files_rows as $key => $value) {
                              echo "<tr>";
                              echo "<td>$value->file_name</td>";
                              echo "<td>$value->file_department</td>";
                              echo "<td>$value->company_name</td>";
                              if (in_array(explode(".",$value->file_name)[1] , $viewable_files)) {
                                echo "<td class='action_td'><a class='btn' target='_blank' href='".base_url()."uploaded_files/$value->file_name'><i class='fas fa-eye'></i> </a><a class='btn' href='".base_url()."uploaded_files/$value->file_name' download><i class='fas fa-download' ></i> </a></td>";
                              }else{
                                echo "<td class='action_td'><a class='btn' href='".base_url()."uploaded_files/$value->file_name' download><i class='fas fa-download' ></i> </a></td>";
                              }
                              echo "</tr>";
                            }
                             ?>
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
