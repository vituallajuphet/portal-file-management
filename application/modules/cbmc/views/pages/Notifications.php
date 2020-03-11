<!-- ============================================================== -->
<!-- Page wrapper  -->
<!-- ============================================================== -->
<div id="myApp">
    <div class="page-wrapper">
        <div class="main_con">
                <div class="container-fluid">
                    <div class="row page-titles">
                        <div class="col-md-5 align-self-center">
                            <h3 class="text-themecolor">Notifications
                        </h3>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="<?=base_url()?>">Home</a></li>
                                <li class="breadcrumb-item active">Notifications</li>
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
                                        <th>Notification ID</th>
                                        <th>From</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="noti in notifications">
                                        <td>{{noti.notify_id}}</td>
                                        <td>{{noti.firstname + ' ' +noti.lastname}}</td>

                                        <td>{{(noti.is_read) == 0 ? 'unread' : 'read'}}</td>
                                        <td>{{noti.date_created}}</td>
                                        <td class="td-manage-user">
                                           <a style="color:black;" class="show_notify_details act_btn" :data="noti.notify_id" href="javascript:;" @click="show_notify_details(noti.notify_id)" title="Show"><i class="fas fa-eye"></i></a>
                                           <a v-if="(noti.is_read) == 0" style="color:green; act_btn" :href="base_url+'admin/api_update_notification/'+noti.notify_id" title="Mark as read"><i class="fas fa-check"></i></a>
                                           <a v-else style="cursor:not-allowed;color:green;" class="act_btn" href="javascript:;" title="Mark as read"><i class="fas fa-check"></i></a>
                                            <a class="text-danger act_btn show_delele_noti" :data="noti.notify_id" href="javascript:;" @click="show_delele_noti(noti.notify_id)" title="Delete"><i class="fas fa-trash"></i></a>
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
                    if(!empty($has_mod)){
                        $this->load->view($has_mod);
                    }
                ?>
            <!-- end modal -->
        </div>
    </div>
</div>

