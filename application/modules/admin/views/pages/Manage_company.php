<!-- ============================================================== -->
<!-- Page wrapper  -->
<!-- ============================================================== -->

<div id="myApp">
    <div class="page-wrapper">
        <div class="main_con">
                <div class="container-fluid">
                    <div class="row page-titles">
                        <div class="col-md-5 align-self-center">
                            <h3 class="text-themecolor">Manage Companies
                        </h3>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="<?=base_url()?>">Home</a></li>
                                <li class="breadcrumb-item active">Manage Companies</li>
                            </ol>
                        </div>
                        <div class="col-md-7 align-self-center text-right d-none d-md-block">
                            <button @click="show_add_modal()" type="button" class="btn btn-theme " data-toggle="modal" data-target="#responsive-modal" ><i class='fas fa-plus' ></i> Add New Company</button>
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
                                        <th>Company ID</th>
                                        <th>Company Name</th>
                                        <th>Email Address</th>
                                        <th>Contact Number</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="comp in activeCompanies">
                                        <td>{{comp.company_id}}</td>
                                        <td>{{comp.company_name}}</td>
                                        <td>{{comp.company_email}}</td>
                                        <td>{{comp.company_contact}}</td>

                                        <td class="td-manage-user">
                                            <a href="javascript:;" @click="show_details_modal(comp.company_id)" title="View Details"><i class="fas fa-eye"></i></a>
                                          <a href="javascript:;" @click="show_edit_modal(comp.company_id)" title="Edit"><i class="fas fa-edit"></i></a>
                                          <a href="javascript:;" @click="show_delete_company(comp.company_id)" title="Delete"><i class="fas fa-trash"></i></a>
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

