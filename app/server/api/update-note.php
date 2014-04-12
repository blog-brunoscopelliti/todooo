<?php

	require_once '..\class\Notes.php';

	$o = new Notes();
	$r = $o->update_note($_POST['id'], $_POST['isChecked']);

	echo json_encode($r);
	return;