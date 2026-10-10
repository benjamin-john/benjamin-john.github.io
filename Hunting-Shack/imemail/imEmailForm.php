<?php
if(substr(basename($_SERVER['PHP_SELF']), 0, 11) == "imEmailForm") {
	include '../res/x5engine.php';
	$form = new ImForm();
	$form->setField('Name', $_POST['imObjectForm_2_1'], '', false);
	$form->setField('Email Address', $_POST['imObjectForm_2_2'], '', false);
	$form->setField('Story/Information', $_POST['imObjectForm_2_3'], '', false);
	$fileResult = $form->setFile('Picture', $_FILES['imObjectForm_2_4'], $imSettings['general']['public_folder'], '', '');
	if ($fileResult == -1) { die(imPrintError('Cannot send file: Picture')); }
	if ($fileResult < -1) { die(imPrintError('"Picture" is in the wrong format.')); }
	$fileResult = $form->setFile('Picture', $_FILES['imObjectForm_2_5'], $imSettings['general']['public_folder'], '', '');
	if ($fileResult == -1) { die(imPrintError('Cannot send file: Picture')); }
	if ($fileResult < -1) { die(imPrintError('"Picture" is in the wrong format.')); }

	if(@$_POST['action'] != 'check_answer') {
		if(!isset($_POST['imJsCheck']) || $_POST['imJsCheck'] != 'jsactive' || (isset($_POST['imSpProt']) && $_POST['imSpProt'] != ""))
			die(imPrintJsError());
		$form->mailToOwner($_POST['imObjectForm_2_2'] != "" ? $_POST['imObjectForm_2_2'] : 'larrydjohn63@gmail.com', 'larrydjohn63@gmail.com', 'Hunting Shack - Submission Form', '', false);
		$form->mailToCustomer('larrydjohn63@gmail.com', $_POST['imObjectForm_2_2'], 'Hunting Shack - Information Received', 'Thank you for sending your information.  We will update the site as quickly as possible.

Regards,

Webmaster', false);
		@header('Location: ../index.html');
		exit();
	} else {
		echo $form->checkAnswer(@$_POST['id'], @$_POST['answer']) ? 1 : 0;
	}
}

// End of file