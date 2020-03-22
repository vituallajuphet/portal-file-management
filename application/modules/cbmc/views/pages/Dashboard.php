<!-- ============================================================== -->
<!-- Page wrapper  -->
<!-- ============================================================== -->

<div id="myApp">
    <div class="page-wrapper">
        <div class="main_con">
                <div class="container-fluid">
                    <div class="row page-titles">
                        <div class="col-md-5 align-self-center">
                            <h3 class="text-themecolor">Dashboard</h3>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="<?=base_url()?>">Home</a></li>
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
                                <div class="row">
                                        <div class="col-lg-4 col-md-4">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="d-flex p-10 no-block">
                                                        <div class="align-slef-center">
                                                            <h2 class="m-b-0">{{dashdata.files }}</h2>
                                                            <h6 class="text-muted m-b-0">Files</h6>
                                                        </div>
                                                        <div class="align-self-center display-6 ml-auto"><i class="text-success icon-Files"></i></div>
                                                    </div>
                                                </div>
                                                <div class="progress">
                                                    <div class="progress-bar bg-success bg-theme3" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width:70%; height:3px;"> <span class="sr-only">50% Complete</span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-4">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="d-flex p-10 no-block">
                                                        <div class="align-slef-center">
                                                            <h2 class="m-b-0">{{dashdata.investor }}</h2>
                                                            <h6 class="text-muted m-b-0">Investors</h6>
                                                        </div>
                                                        <div class="align-self-center display-6 ml-auto"><i class="text-theme icon-Money-2 "></i></div>
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
                                                            <h2 class="m-b-0">{{dashdata.dept_user }}</h2>
                                                            <h6 class="text-muted m-b-0">Department Users</h6>
                                                        </div>
                                                        <div class="align-self-center display-6 ml-auto"><i class="text-theme2 icon-User"></i></div>
                                                    </div>
                                                </div>
                                                <div class="progress">
                                                    <div class="progress-bar bg-success bg-theme2" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width:70%; height:3px;"> <span class="sr-only">50% Complete</span></div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                <div class="row">
                                         <div class="col-lg-4 col-md-4">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="d-flex p-10 no-block">
                                                        <div class="align-slef-center">
                                                            <h2 class="m-b-0">{{dashdata.sub_user }}</h2>
                                                            <h6 class="text-muted m-b-0">Subsidiary Users</h6>
                                                        </div>
                                                        <div class="align-self-center display-6 ml-auto"><i class="text-success icon-Administrator "></i></div>
                                                    </div>
                                                </div>
                                                <div class="progress">
                                                    <div class="progress-bar bg-success bg-theme3" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width:70%; height:3px;"> <span class="sr-only">50% Complete</span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-4">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="d-flex p-10 no-block">
                                                        <div class="align-slef-center">
                                                            <h2 class="m-b-0">{{dashdata.company }}</h2>
                                                            <h6 class="text-muted m-b-0">Subsidiary Companies</h6>
                                                        </div>
                                                        <div class="align-self-center display-6 ml-auto"><i class="text-theme icon-Building"></i></div>
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
                                                           <h2 class="m-b-0">{{dashdata.request }}</h2>
                                                            <h6 class="text-muted m-b-0">File Requests</h6>
                                                        </div>
                                                        <div class="align-self-center display-6 ml-auto"><i class="text-theme2 icon-Notepad-2"></i></div>
                                                    </div>
                                                </div>
                                                <div class="progress">
                                                    <div class="progress-bar bg-success bg-theme2" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width:70%; height:3px;"> <span class="sr-only">50% Complete</span></div>
                                                </div>
                                            </div>
                                        </div>
                                       
                                </div>
                                <div class="row">
                                    <div class="col-md-12 mb-5">
                                        <hr>
                                    </div>
                                <div class="col-md-3">
                                        
                                         <h4 class="txt-h mb-5">Today's File Activity</h4>
                                         <!-- <div class="mt-4" id="sales-chart" style="height: 355px;"></div> -->
                                         <div id="visitor" style="height:260px; width:100%;"></div>
                                    </div>
                                    <div class="col-md-9">
                                         <h4 class="txt-h mb-5">Monthly File Activity</h4>
                                         <div class="chart_main">
                                             <div  class="chart-containers">
                                                <canvas id="canvas"></canvas>
                                            </div>
                                         </div>
                                    </div>
                                    
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

