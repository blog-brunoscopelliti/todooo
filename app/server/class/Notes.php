<?php

require_once 'DBManager.php';

class Notes {
	
	// private $log; 

	public function __construct() {
		
	}


	public function get_notes() {

		$db = new DBmanager();
		$dbh = $db->open_connection();

		$sth = $dbh->prepare('SELECT * FROM notes ORDER BY id ASC');
		$s = $sth->execute();		

		$res = array();
		if ($s && $sth->rowCount()) {
			while ($row = $sth->fetch(PDO::FETCH_ASSOC)) {
				array_push($res, $row);
			}
		}

		return $res;

	}


	public function create_new_note($memo) {

		$db = new DBmanager();
		$dbh = $db->open_connection();

		$sth = $dbh->prepare('INSERT INTO notes (note, isChecked, signedDate, completedDate) VALUES (?, ?, ?, ?)');
		$s = $sth->execute(array($memo, 0, date("Ymd"), null));

		if ($s) {
			$results = array('status'=>true, 'id'=>$dbh->lastInsertId());
		}
		else {
			$results = array('status'=>false);
		}

		unset($db);
		$dbh = null;

		return $results;

	}


	public function update_note($noteId, $isChecked) {

		$dateCompleted = ($isChecked) ? date('Ymd') : null;

		$db = new DBmanager();
		$dbh = $db->open_connection();

		$sth = $dbh->prepare('UPDATE notes SET isChecked = ?, completedDate = ? WHERE id = ? ');
		$s = $sth->execute(array($isChecked, $dateCompleted, $noteId));		

		unset($db);
		$dbh = null;

		return array("status"=>$s);

	}


	public function delete_note($noteId) {

		$db = new DBmanager();
		$dbh = $db->open_connection();

		$sth = $dbh->prepare('DELETE FROM notes WHERE id = ? ');
		$s = $sth->execute(array($noteId));		

		unset($db);
		$dbh = null;

		return array("status"=>$s);

	}

}