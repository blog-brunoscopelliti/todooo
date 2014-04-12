<?php

	require_once '..\class\Notes.php';

	$o = new Notes();
	$r = $o->get_notes();

	echo json_encode($r);
	return;