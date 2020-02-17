<!-- ============================================================== -->
<!-- Page wrapper  -->
<!-- ============================================================== -->
<div id="myApp">
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
                            <button type="button" class="btn btn-theme" data-toggle="modal" data-target="#responsive-modal" ><i class='fas fa-plus' ></i> Add File</button>
                        </div>
                    </div>
                    <!-- ============================================================== -->
                    <!-- Start Page Content -->
                    <!-- ============================================================== -->
                    <div class="row">
                    <div class="col-12">
                        <div class="card">
                        <div class="card-body">
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
                                    <tr>
                                        <td>1</td>
                                        <td>asd</td>
                                        <td>asdsasd</td>
                                        <td>Rechard</td>
                                        <td>02-17-2020</td>
                                        <td class="td-manage-user">
                                            <a href="javascript:;" ><i class="fas fa-eye"></i></a>
                                            <a href="javascript:;" ><i class="fas fa-edit"></i></a>
                                            <a href="javascript:;" ><i class="fas fa-trash"></i></a>
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
                <!-- modal -->
                <?php 
                    // if(!empty($has_mod)){
                    //     $this->load->view($has_mod);
                    // }
                ?>
            <!-- end modal -->
        </div>
    </div>
</div>

