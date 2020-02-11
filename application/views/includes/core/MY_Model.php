<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Model extends CI_Model {

	public function auth_username($data){
		$this->db->select('username,user_id,user_type,password');
		$this->db->where('username',$data['username']);
		$this->db->from('users_tbl');
		$query = $this->db->get();
		return $query->row();
	}

	public function getUserData($id){
		$this->db->where('user_id',$id);
		$this->db->from('users_tbl');
		$query = $this->db->get();
		return $query->row();
	}

	public function get_datatables($table, $column_order, $select = "*", $where = "", $join = array(), $limit, $offset, $search, $order,$group = '')
	{
	  	$this->db->from($table);
	  	$columns = $this->db->list_fields($table);
	  	if($select){
	  		$this->db->select($select);
	  	}
	  	if($where){
	  		$this->db->where($where);
	  	}
	  	if($join){
	  		foreach ($join as $key => $value) {
				$this->db->join($key,$value,'left');
	  		}
	  	}
	  	if($search){
	  		$this->db->group_start();
	  		foreach ($column_order as $item)
	  		{
	  			$this->db->or_like($item, $search['value']);
	  		}
	  		$this->db->group_end();
	  	}
	  	if($group)
	  		$this->db->group_by($group);

	  	if($order)
	  		$this->db->order_by($column_order[$order['0']['column']], $order['0']['dir']);

	    	$temp = clone $this->db;
	    	$data['count'] = $temp->count_all_results();

	  	if($limit != -1)
	  		$this->db->limit($limit, $offset);

	  	$query = $this->db->get();
	  	$data['data'] = $query->result();

	  	$this->db->from($table);
	  	$data['count_all'] = $this->db->count_all_results();
	  	return $data;
	}

	public function getRows($table,$select,$where = array(),$join = array(),$result = 'array'){

		if(!empty($select)){
			$this->db->select($select);
		}

		if(!empty($where)){
			foreach($where as $where_key => $where_value){
				$this->db->where($where_key,$where_value);
			}
		}

		if(!empty($join)){
			foreach($join as $key_join => $value_join){
				$this->db->join($key_join,$value_join);
			}
		}

		$this->db->from($table);
		$query = $this->db->get();

		if($result == 'row'){
			return $query->row();
		}elseif($result == 'array'){
			return $query->result_array();
		}elseif($result == 'obj'){
			return $query->result();
		}elseif($result == 'count'){
			return $query->num_rows();
		}
	}

	public function QuerySearch($table,$select,$where = array(),$join = array(),$result = "array"){

		if(!empty($select)){
			$this->db->select($select);
		}else{

		}

		if(!empty($where)){
			foreach($where as $where_key => $where_value){
				$this->db->like($where_key,$where_value);
			}
		}

		if(!empty($join)){
			foreach($join as $key_join => $value_join){
				$this->db->join($key_join,$value_join);
			}
		}

		$this->db->from($table);
		$query = $this->db->get();

		if($result == 'row'){
			return $query->row();
		}elseif($result == 'array'){
			return $query->result_array();
		}elseif($result == 'obj'){
			return $query->result();
		}
	}

	public function customizeQuery($query,$res = 'array'){
		$query = $this->db->query($query);
		switch ($res) {
			case 'array':
				return $query->result_array();
				break;
			case 'obj':
				return $query->result();
				break;
			case 'row':
				return $query->row();
				break;
			default:
				return $query->result_array();
				break;
		}
	}

	public function insert($table,$data){
		$this->db->insert($table,$data);
		return $this->db->insert_id();
	}

	public function insertBatch($table,$data){
		$this->db->insert_batch($table,$data);
		return $this->db->insert_id();
	}

	public function update($table,$set,$where){
		$this->db->where($where);
		return $this->db->update($table,$set);
	}

	public function delete($table,$where){
		$this->db->where($where);
		$this->db->delete($table);
		return true;
	}

}
