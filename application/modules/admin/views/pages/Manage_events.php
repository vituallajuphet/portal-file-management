<!-- ============================================================== -->
<!-- Page wrapper  -->
<!-- ============================================================== -->

<div id="myApp">
    <div class="page-wrapper">
        <div class="main_con">
                <div class="container-fluid">
                    <div class="row page-titles">
                        <div class="col-md-5 align-self-center">
                            <h3 class="text-themecolor">Manage News / Events
                        </h3>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="<?=base_url()?>">Home</a></li>
                                <li class="breadcrumb-item active">Manage News / Events</li>
                            </ol>
                        </div>
                        <div class="col-md-7 align-self-center text-right d-none d-md-block">
                            <button @click="show_add_modal()" type="button" class="btn btn-theme " data-toggle="modal" data-target="#responsive-modal" ><i class='fas fa-plus' ></i> Add Event</button>
                        </div>
                    </div>
                    <!-- ============================================================== -->
                    <!-- Start Page Content -->
                    <!-- ============================================================== -->
                    <div class="row">
                    <div class="col-12">
                        <div class="card">
                        <div class="card-body">
                            <table id="myTable" class="table   dt-responsive nowrap admin-table" style="width:100%">
                            <!-- <table id="example" class="table " style="width:100%"> -->
                                <thead>
                                    <tr>
                                        <th>Event ID</th>
                                        <th>Event Title</th>
                                        <th>Event Status</th>
                                        <th>Date Added</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="post in posts">
                                        <td>{{post.event_id}}</td>
                                        <td>{{post.event_title}}</td>
                                        <td>{{get_post_status(post.event_status)}}</td>
                                        <td>{{post.date_created}}</td>
                                        <td class="td-manage-user">
                                            <a :href="base_url+'admin/view_event/'+post.event_id" @click="show_details_modal(post.event_id)" title="View Details"><i class="fas fa-eye"></i></a>
                                          <a href="javascript:;" @click="event_edit_modal(post.event_id)" title="Edit"><i class="fas fa-edit"></i></a>
                                          <a href="javascript:;" @click="show_delete_user(post.event_id)" title="Delete"><i class="fas fa-trash"></i></a>
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
                    <?php 
                        if(!empty($has_mod)){
                            $this->load->view($has_mod);
                        }
                    ?>
                </div>
        </div>
    </div>
</div>

