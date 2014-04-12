<?php

	require_once '..\class\Notes.php';

	$o = new Notes();
	$r = $o->delete_note($_POST['id']);

	echo json_encode($r);
	return;