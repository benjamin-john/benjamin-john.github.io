<?php
include("../res/x5engine.php");
$nameList = array("rm2","l8s","a8d","y88","2e8","tje","68t","csw","5yu","j3k");
$charList = array("Z","L","Y","N","5","G","J","J","S","7");
$cpt = new X5Captcha($nameList, $charList);
//Check Captcha
if ($_GET["action"] == "check")
	echo $cpt->check($_GET["code"], $_GET["ans"]);
//Show Captcha chars
else if ($_GET["action"] == "show")
	echo $cpt->show($_GET['code']);
// End of file x5captcha.php
