<!-- ============================================================== -->
<!-- Page wrapper  -->
<!-- ============================================================== -->

<div id="myApp">
<div class="page-wrapper">
   <div class="main_con">
        <div class="container-fluid">
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h3 class="text-themecolor">Dashboard
                   </h3>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="<?= base_url(); ?>">Home</a></li>
                        <li class="breadcrumb-item active">Dashboard</li>
                    </ol>
                </div>
                <div class="col-md-7 align-self-center text-right d-none d-md-block">
                  
                </div>
            </div>

            <!-- ============================================================== -->
            <!-- Start Page Content -->
            <!-- ============================================================== -->
            <div class="row">
              <div class="col-12">
                <div class="card totals-card">
                  <div class="card-body">
                    <!-- dashboard start -->
                        <div class="row mt-4">
                            <div class="col-lg-4 col-md-4">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex p-10 no-block">
                                            <div class="align-slef-center">
                                                <h2 class="m-b-0">{{total_files}}</h2>
                                                <h6 class="text-muted m-b-0">Total Files</h6>
                                            </div>
                                            <div class="align-self-center display-6 ml-auto"><i class="text-theme icon-Files"></i></div>
                                        </div>
                                    </div>
                                    <div class="progress">
                                        <div class="progress-bar bg-success bg-theme" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width:70%; height:3px;"> <span class="sr-only">50% Complete</span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-4">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex p-10 no-block">
                                            <div class="align-slef-center">
                                                <h2 class="m-b-0">{{total_request}}</h2>
                                                <h6 class="text-muted m-b-0">Total Requests</h6>
                                            </div>
                                            <div class="align-self-center display-6 ml-auto"><i class="text-theme2 icon-File-Edit"></i></div>
                                        </div>
                                    </div>
                                    <div class="progress">
                                        <div class="progress-bar bg-success bg-theme2" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width:70%; height:3px;"> <span class="sr-only">50% Complete</span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-4">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex p-10 no-block">
                                            <div class="align-slef-center">
                                                <h2 class="m-b-0">{{total_processing}}</h2>
                                                <h6 class="text-muted m-b-0">Total Processed</h6>
                                            </div>
                                            <div class="align-self-center display-6 ml-auto"><i class="text-success icon-Security-Settings "></i></div>
                                        </div>
                                    </div>
                                    <div class="progress">
                                        <div class="progress-bar bg-success bg-theme3" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width:70%; height:3px;"> <span class="sr-only">50% Complete</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <!-- dashboard end -->

                    <!-- events -->
                        <div class="row">
                            <div class="col-md-12 mb-5">
                               <hr>
                                <h3 class="mt-4 text-themecolor"><i class="icon-Calendar-3"></i> News / Events</h3>
                            </div>
                            <div class="col-md-12">
                                 <paginate_div :posts="posts" :size="size"/>
                            </div>


                        </div>
                    <!-- end events -->
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