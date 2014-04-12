<?php

	require_once '..\class\Notes.php';

	$o = new Notes();
	$r = $o->create_new_note($_POST['note']);

	echo json_encode($r);
	return;