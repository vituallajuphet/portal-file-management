    </div>
    <!-- ============================================================== -->
    <!-- End Wrapper -->
    <!-- ============================================================== -->
    <!-- ============================================================== -->
    <!-- All Jquery -->
    <!-- ============================================================== -->
    <script src="<?php echo base_url(); ?>assets/js/vue.js"></script>
  <script src="<?php echo base_url(); ?>assets/js/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
    <script src="<?php echo base_url(); ?>assets/js/module/jquery.min.js"></script>
    <!-- Bootstrap tether Core JavaScript -->
    <script src="<?php echo base_url(); ?>assets/js/module/popper.min.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/module/bootstrap.min.js"></script>
    <!-- slimscrollbar scrollbar JavaScript -->
    <script src="<?php echo base_url(); ?>assets/js/module/perfect-scrollbar.jquery.min.js"></script>
    <!--Wave Effects -->
    <script src="<?php echo base_url(); ?>assets/js/waves.js"></script>
    <!--Menu sidebar -->
    <script src="<?php echo base_url(); ?>assets/js/sidebarmenu.js"></script>
    <!--stickey kit -->
    <script src="<?php echo base_url(); ?>assets/js/module/sticky-kit.min.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/module/sparkline.min.js"></script>
    <!--Custom JavaScript -->
    <script src="<?php echo base_url(); ?>assets/js/custom.min.js"></script>
    <!-- ============================================================== -->
    <!-- Style switcher -->
    <!-- ============================================================== -->
    <script src="<?php echo base_url(); ?>assets/js/module/switcher.min.js"></script>

    <script>
       $(function () {
            $(".preloader").fadeOut();
        });
    </script>

    <?php
      if(isset($has_footer)){
  			$this->load->view($has_footer);
      }
    ?>
        <?php
            $msg = $this->session->flashdata("flash_data");
            if(isset($msg)){
              $this->load->view("modules/swal", $msg);
            }
        ?>
</body>
</html>