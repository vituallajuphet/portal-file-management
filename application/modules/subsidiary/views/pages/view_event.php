<!-- ============================================================== -->
<!-- Page wrapper  -->
<!-- ============================================================== -->
<div id="myApp">
    <div class="page-wrapper">
        <div class="main_con">
                <div class="container-fluid">
                    <div class="row page-titles">
                        <div class="col-md-5 align-self-center">
                            <h3 class="text-themecolor"><?= $post_data->event_title?>
                        </h3>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="<?=base_url()?>">Home</a></li>
                                <li class="breadcrumb-item active"><a href="<?=base_url("subsidiary/dashboard")?>">Dashboard</a></li>
                                <li class="breadcrumb-item active"><?= $post_data->event_title?></li>
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
                        <div class="card">
                            <div class="card-body">
                                <div class="row mt-4">
                                    <div class="col-md-6">
                                        <figure class="fig_post_cont">
                                            <img src="<?= base_url("assets/uploads/".$post_data->event_image)?>" alt="">
                                        </figure>
                                    </div>
                                    <div class="col-md-6">
                                        <h3><?= $post_data->event_title?></h3>
                                        <div class="mb-4">
                                            <span>By: <strong><?= $post_data->firstname ." ". $post_data->lastname?></strong> <small class="date_small">(<?= $post_data->date_created ;?>)</small> </span>
                                        </div>
                                        <div>
                                          <?= $post_data->event_content;?>
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

