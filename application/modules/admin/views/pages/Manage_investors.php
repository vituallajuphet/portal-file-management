<!-- ============================================================== -->
<!-- Page wrapper  -->
<!-- ============================================================== -->
<div id="myApp">
    <div class="my_loader" v-show="is_loading">
        <div class="loader_con">
                <img src="<?=base_url("assets/images/preloader.gif")?>" alt="preloader">
        </div>
    </div>
    
  

    <div class="page-wrapper">
        <div class="main_con">
                <div class="container-fluid">
                    <div class="row page-titles">
                        <div class="col-md-5 align-self-center">
                            <h3 class="text-themecolor">Manage Investors
                        </h3>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="<?=base_url()?>">Home</a></li>
                                <li class="breadcrumb-item active">Manage Investors</li>
                            </ol>
                        </div>
                        <div class="col-md-7 align-self-center text-right d-none d-md-block">
                            <!-- <button type="button" @click="show_add_modal()" class="btn btn-theme" data-toggle="modal" data-target="#responsive-modal" ><i class='fas fa-plus' ></i> Add User</button> -->
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
                                        <th>Investor ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Active</th>
                                        <th>Status</th>
                                        <th>Email Address</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="user in users" :class="(user.approved == 1) ? 'row-approved':''"> 
                                        <td>{{user.user_id}}</td>
                                        <td>{{user.firstname}}</td>
                                        <td>{{user.lastname}}</td>
                                        <td>{{(user.user_status == 1 && user.approved == 1) ? "Active":"Inactive" }} <a @click="show_update_active(user.user_id, user.user_status)" href="javascript:;" style="color:#222"><i class="fa fa-edit"></i></a></td>
                                        <td>{{(user.approved == 1) ? "Approved":"Pending" }}</td>
                                        <td>{{user.email_address}}</td>
                                        <td class="td-manage-user">
                                            <a class="act_btn" href="javascript:;" style="color:black" @click="showInvestorDetails(user.user_id)" title="View Details"><i class="fas fa-eye"></i></a>
                                            <a class="act_btn" href="javascript:;" style="color:black" @click="showInvestorCompany(user.user_id)" title="Assign company"><i class="fas fa-edit"></i></a>
                                            <a v-if="user.approved != 1" href="javascript:;" class="show_approve_investor act_btn" :data="user.user_id" @click="showApproveInvestor(user.user_id)" style="color:green"> <i class="fa fa-check" title="approve"></i></a>
                                            <a v-else href="javascript:;" style="cursor:not-allowed;color:green"> <i class="fa fa-check" title="approve"></i></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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

