<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- Favicon icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="<?php echo base_url(); ?>assets/images/favicon.png">
    <title><?= $title?></title>
    <!-- Bootstrap Core CSS -->
    <link href="<?php echo base_url(); ?>assets/css/module/bootstrap.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="<?php echo base_url(); ?>assets/css/custom_style.css" rel="stylesheet">
    <!-- You can change the theme colors from here -->
    <link href="<?php echo base_url(); ?>assets/css/color/default.css" id="theme" rel="stylesheet">
    <link href="<?php echo base_url(); ?>assets/css/my_style.css" id="theme" rel="stylesheet">
    <link href="<?php echo base_url(); ?>assets/css/my_media.css" id="theme" rel="stylesheet">
    <link href="<?php echo base_url(); ?>assets/css/croppie.css" id="theme" rel="stylesheet">
    <link href="<?php echo base_url(); ?>assets/css/admin_style.css" id="theme" rel="stylesheet">
        <link href="<?php echo base_url(); ?>assets/css/tab-style.css" id="theme" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/module/bootstrap2.css">
    <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/module/datatable-bootstrap.css">
    <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/module/datatable-responsive.css">
    

<style>
	thead {
		background-color: #c5a36f;
		/* border-radius: 6px; */
	}

	.table thead th {
		border: 0px;
	}
	th.sorting {}

	thead tr:first-child th:first-child {
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
	}

	thead tr:first-child th:last-child {
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
		/* overflow: hidden; */
	}
	/* tr:first-child td:first-child { border-top-left-radius: 10px; }
	tr:first-child td:last-child { border-top-right-radius: 10px; } */
</style>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->

 
</head>

<body class="fix-header card-no-border fix-sidebar">
    <!-- ============================================================== -->
    <!-- Preloader - style you can find in spinners.css -->
    <!-- ============================================================== -->
    <div class="preloader">
        <div class="loader">
            <div class="loader__figure"></div>
            <p class="loader__label">CBMC</p>
        </div>
    </div>
    <!-- ============================================================== -->
    <!-- Main wrapper - style you can find in pages.scss -->
    <!-- ============================================================== -->
    <div id="main-wrapper">
        <!-- ============================================================== -->
        <!-- Topbar header - style you can find in pages.scss -->
        <!-- ============================================================== -->
        <header class="topbar">
            <nav class="navbar top-navbar navbar-expand-md navbar-light">
                <!-- ============================================================== -->
                <!-- Logo -->
                <!-- ============================================================== -->
                <div class="navbar-header">
                    <a class="" href="<?=base_url()?>">
                        <!-- Logo icon --><b>
                            <!--You can put here icon as well // <i class="wi wi-sunset"></i> //-->
                            <!-- Dark Logo icon -->
                            <img src="<?php echo base_url(); ?>assets/images/logo-icon.png" alt="homepage" class="logo-icon" class="dark-logo" />

                        </b>
                        <!--End Logo icon -->
                        <!-- Logo text --><span>
                            <!-- dark Logo text -->
                            <img  src="<?php echo base_url(); ?>assets/images/main_logo.png" alt="homepage" class="dark-logo" />
                            <!-- Light Logo text -->
                        </span>

                </div>
                <!-- ============================================================== -->
                <!-- End Logo -->
                <!-- ============================================================== -->
                <div class="navbar-collapse">
                    <!-- ============================================================== -->
                    <!-- toggle and nav items -->
                    <!-- ============================================================== -->
                    <ul class="navbar-nav mr-auto">
                        <!-- This is  -->
                        <li class="nav-item"> <a class="nav-link nav-toggler hidden-md-up waves-effect waves-dark" href="javascript:void(0)"><i class="sl-icon-menu"></i></a> </li>
                        <li class="nav-item"> <a class="nav-link sidebartoggler hidden-sm-down waves-effect waves-dark" href="javascript:void(0)"><i class="sl-icon-menu"></i></a> </li>
                        <!-- ============================================================== -->
                        <!-- Search -->
                        <!-- ============================================================== -->
                        <li class="nav-item hidden-xs-down search-box"> <a class="nav-link hidden-sm-down waves-effect waves-dark" href="javascript:void(0)"><i class="icon-Magnifi-Glass2"></i></a>
                            <form class="app-search">
                                <input type="text" class="form-control" placeholder="Search & enter"> <a class="srh-btn"><i class="ti-close"></i></a> </form>
                        </li>
                    </ul>
                    <!-- ============================================================== -->
                    <!-- User profile and search -->
                    <!-- ============================================================== -->
                    <ul class="navbar-nav my-lg-0">
                          <?php 
                            $notifications = get_my_notifications(true);
                            $noti_count = 0;
                            if(!empty($notifications)){
                                
                                foreach ($notifications as $noti) {
                                   if($noti->is_read == 0){
                                       $noti_count ++;
                                   }
                                }
                            }
                            
                        ?>
                        <!-- ============================================================== -->
                        <!-- Comment -->
                        <!-- ============================================================== -->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle waves-effect waves-dark" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="icon-Bell"></i>
                                <?php 
                                    if($noti_count != 0){
                                        ?>
                                        <div class="notify"> <span class="heartbit"></span> <span class="point"></span> </div>
                                        <?php
                                    }
                                ?>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right mailbox animated bounceInDown">
                                 <ul>
                                    <li>
                                        <div class="drop-title" style="font-weight:bold;">Notifications</div>
                                    </li>
                                    <li>
                                        <div class="message-center">
                                             <?php 
                                                $notifications = get_my_notifications(true);

                                                if(empty($notifications)){
                                                    ?>
                                                     <span class="empty_notification">You have no new notifications</span>
                                                    <?php
                                                }
                                                else{ 

                                                    foreach ($notifications as $notify) {
                                                        $readClass = ($notify->is_read == 0 ? "unread" : "");

                                                        $user_heading = ($notify->user_type == "admin") ? "Administrator" : ucfirst($notify->user_type);
                                                        $date = strtotime($notify->date_created);

                                                        ?>
                                                            <a href="<?= base_url("subsidiary/notifications/view/".$notify->notify_id)?>" class="noti-cont <?=$readClass?>">
                                                                <div class="mail-contnet">
                                                                    <h5><?= $user_heading;?></h5> 
                                                                    <small style="color:#222"><?= $notify->firstname. " ". $notify->lastname ;?></small>
                                                                    <span class="mail-desc"><?= $notify->message?></span> <span class="time"> <?= $notify->date_created;?>
                                                                    </span>
                                                                </div>
                                                                <span class="read-icon <?=$readClass?>"></span>
                                                            </a>
                                                        <?php
                                                    }

                                                 }
                                            ?>
                                        </div>
                                    </li>
                                    <li>
                                        <a class="nav-link text-center" href="<?= base_url("subsidiary/notifications");?>"> <strong>Check all notifications</strong> <i class="fa fa-angle-right"></i> </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <!-- ============================================================== -->
                        <!-- End Comment -->
                        <!-- ============================================================== -->
                        <!-- ============================================================== -->
                        <!-- Messages -->
                        <!-- ============================================================== -->

                        <!-- ============================================================== -->
                        <!-- End mega menu -->
                        <!-- ============================================================== -->
                        <!-- ============================================================== -->
                        <!-- Language -->
                        <!-- ============================================================== -->

                        <!-- ============================================================== -->
                        <!-- Profile -->
                        <!-- ============================================================== -->

                        <?php 
                            $profic = "dummyprofile.png";
                            if($this->session->userdata("profile_picture") != ""){
                                $profic = $this->session->userdata("profile_picture");
                            }
                        ?>
                        <li class="nav-item dropdown u-pro">
                            <a class="nav-link dropdown-toggle waves-effect waves-dark profile-pic" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="<?php echo base_url(); ?>assets/images/profiles/<?=$profic;?>" alt="user" class="" /> <span class="hidden-md-down"><?= $this->session->userdata("firstname") ." ". $this->session->userdata("lastname"); ?> &nbsp;<i class="fa fa-angle-down"></i></span> </a>
                            <div class="dropdown-menu dropdown-menu-right animated flipInY">
                                <ul class="dropdown-user">
                                    <li>
                                        <div class="dw-user-box">
                                            <div class="u-text">
                                                <a href="<?=base_url("subsidiary/profile")?>" class="nav-profile">
                                                    <h4>My Profile</h4>
                                                    <p><?= my_profile("email_address")?></p>
                                                </a>
                                           </div>
                                    </li>
                                    <li><a href="<?=base_url("logout");?>"><i class="fa fa-power-off"></i> Logout</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <!-- ============================================================== -->
        <!-- End Topbar header -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- Left Sidebar - style you can find in sidebar.scss  -->
        <!-- ============================================================== -->
        <?php $this->load->view("includes/subsidiary/sidebar"); ?>
        <!-- ============================================================== -->
        <!-- End Left Sidebar - style you can find in sidebar.scss  -->
        <!-- ============================================================== -->


