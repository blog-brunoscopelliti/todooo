<?php

class DBManager {
	
	// connect to db
	public function open_connection() {

		$dsn = 'todooo_db';
		$user = 'root';
		$password = '';

		try {
			$dbh = new PDO($dsn, $user, $password);
			$dbh->exec("set names utf8");
			return $dbh;
		} 
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

	}

}