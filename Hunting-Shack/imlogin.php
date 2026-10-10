<?php
require_once('res/x5engine.php');

$pa = imPrivateArea::getInstance();
if (isset($_POST['imUname']) && isset($_POST['imPwd'])) {
	$result = $pa->login($_POST['imUname'], $_POST['imPwd']);
	if ($result < 0) {
		header('Location: imlogin.php?loginstatus=' . $result);
		exit();
	}
	$page = $pa->getSavedPage() ? $pa->getSavedPage() : $pa->getLandingPage();
	$pa->sessionSafeRedirect($page);
}
?><!DOCTYPE html><!-- HTML5 -->
<html prefix="og: http://ogp.me/ns#" lang="en-GB" dir="ltr">
	<head>
		<title>Reserved Access - Hunting-Shack</title>
		<meta charset="utf-8" />
		<!--[if IE]><meta http-equiv="ImageToolbar" content="False" /><![endif]-->
		<meta name="generator" content="Incomedia WebSite X5 Evolution 12.0.10.32 - www.websitex5.com" />
		<meta name="viewport" content="width=1049" />
		<link rel="icon" href="favicon.png?12-0-10-32-637133462850564379" type="image/png" />
		<link rel="stylesheet" type="text/css" href="style/reset.css?12-0-10-32" media="screen,print" />
		<link rel="stylesheet" type="text/css" href="style/print.css?12-0-10-32" media="print" />
		<link rel="stylesheet" type="text/css" href="style/style.css?12-0-10-32" media="screen,print" />
		<link rel="stylesheet" type="text/css" href="style/template.css?12-0-10-32" media="screen" />
		<link rel="stylesheet" type="text/css" href="style/menu.css?12-0-10-32" media="screen" />
		<!--[if lte IE 7]><link rel="stylesheet" type="text/css" href="style/ie.css?12-0-10-32" media="screen" /><![endif]-->
		
		<script type="text/javascript" src="res/jquery.js?12-0-10-32"></script>
		<script type="text/javascript" src="res/x5engine.js?12-0-10-32" data-files-version="12-0-10-32"></script>
		
	</head>
	<body>
		<div id="imHeaderBg"></div>
		<div id="imFooterBg"></div>
		<div id="imPage">
			<div id="imHeader">
				<h1 class="imHidden">Reserved Access - Hunting-Shack</h1>
				
				<div class="imTemplateContent" onclick="x5engine.utils.location('index.html', null, false); return false;" style="position: absolute; top: 8px; left: 393px; width: 275px; height: 139px; cursor: pointer;"></div>
				<div class="imTemplateContent" onclick="x5engine.utils.location('index.html', null, false); return false;" style="position: absolute; top: 52px; left: 38px; width: 330px; height: 73px; cursor: pointer;"></div>
				<div class="imTemplateContent" onclick="x5engine.utils.location('index.html', null, false); return false;" style="position: absolute; top: 52px; left: 703px; width: 199px; height: 73px; cursor: pointer;"></div>
				<div class="imTemplateContent" onclick="x5engine.utils.location('index.html', null, false); return false;" style="position: absolute; top: 75px; left: 906px; width: 91px; height: 43px; cursor: pointer;"></div>
			</div>
			<a class="imHidden" href="#imGoToCont" title="Skip the main menu">Go to content</a>
			<a id="imGoToMenu"></a><p class="imHidden">Main menu:</p>
			<div id="imMnMnGraphics"></div>
			<div id="imMnMn" class="auto">
				<div class="hamburger-menu-background-container"><div class="hamburger-menu-background menu-mobile-hidden"><div class="hamburger-menu-close-button"><span>&times;</span></div></div></div>
				<ul class="auto menu-mobile-hidden">
					<li id="imMnMnNode9" class=" imLevel">
				<a href="index.html" onclick="return x5engine.utils.location('index.html', null, false)">		<span class="imMnMnFirstBg">
							<span class="imMnMnTxt"><span class="imMnMnImg"></span><span class="imMnMnTextLabel">Home</span></span>
						</span>
				</a><div class="auto" style="width: 136px;"><ul>
				</ul></div></li>
				<li id="imMnMnNode10" class=" imLevel">
				<a href="2018.html" onclick="return x5engine.utils.location('2018.html', null, false)">		<span class="imMnMnFirstBg">
							<span class="imMnMnTxt"><span class="imMnMnImg"></span><span class="imMnMnTextLabel">Hunting Log</span></span>
						</span>
				</a></li>
				<li id="imMnMnNode11" class=" imLevel">
				<a href="the-race.html" onclick="return x5engine.utils.location('the-race.html', null, false)">		<span class="imMnMnFirstBg">
							<span class="imMnMnTxt"><span class="imMnMnImg"></span><span class="imMnMnTextLabel">The Race</span></span>
						</span>
				</a></li>
				<li id="imMnMnNode12" class=" imLevel">
				<a href="2018-1.html" onclick="return x5engine.utils.location('2018-1.html', null, false)">		<span class="imMnMnFirstBg">
							<span class="imMnMnTxt"><span class="imMnMnImg"></span><span class="imMnMnTextLabel">Photo Gallery</span></span>
						</span>
				</a></li>
				<li id="imMnMnNode14" class=" imLevel">
				<a href="helpful-links.html" onclick="return x5engine.utils.location('helpful-links.html', null, false)">		<span class="imMnMnFirstBg">
							<span class="imMnMnTxt"><span class="imMnMnImg"></span><span class="imMnMnTextLabel">Helpful Links</span></span>
						</span>
				</a></li>
				<li id="imMnMnNode54" class=" imLevel">
				<a href="progress-page.html" onclick="return x5engine.utils.location('progress-page.html', null, false)">		<span class="imMnMnFirstBg">
							<span class="imMnMnTxt"><span class="imMnMnImg"></span><span class="imMnMnTextLabel">Cabin Update</span></span>
						</span>
				</a><div class="auto" style="width: 272px;"><ul>
				</ul></div></li>
				<li id="imMnMnNode13" class=" imLevel">
				<a href="members-only.php" onclick="return x5engine.utils.location('members-only.php', null, false)">		<span class="imMnMnFirstBg">
							<span class="imMnMnLevelImg"></span><span class="imMnMnTxt"><span class="imMnMnImg"></span><span class="imMnMnTextLabel">Members Only</span></span>
						</span>
				</a><div class="auto" style="width: 136px;"><ul>
				<li id="imMnMnNode56" class=" imPage">
						<a href="submission-form.html">
							<span class="imMnMnBorder">
								<span class="imMnMnTxt"><span class="imMnMnImg"></span><span class="imMnMnTextLabel">Submission Form</span></span>
							</span>
						</a>
					</li></ul></div></li>
				</ul>
			</div>
			<div id="imContentGraphics"></div>
			<div id="imContent">
				<a id="imGoToCont"></a>
				<h2 id="imPgTitle" class="imTitleMargin">Reserved Access</h2>
<div style="height: 15px;">&nbsp;</div>
				<div id="imLoginDescription">To access this WebSite section you have to enter your login details.</div>
				<div class="imLogin">
					<?php
						if (isset($_GET['loginstatus']) && $pa->messageFromStatusCode($_GET['loginstatus']) != '') {
							echo '<div class="alert alert-' . ($_GET['loginstatus'] >= 0 ? 'green' : 'red') . '">' . $pa->messageFromStatusCode($_GET['loginstatus']) . '</div>';
						}
					?>
					<form method="post" action="imlogin.php" id="imLoginForm">
						<div class="imLoginBlock">
							<label for="imUname"><span>Username:</span></label><br />
							<input type="text" name="imUname" id="imUname" class="mandatory"><br />
						</div>
						<div class="imLoginBlock">
							<label for="imPwd"><span>Password:</span></label><br />
							<input type="password" name="imPwd" id="imPwd" class="mandatory"><br />
						</div>
						<div class="imLoginBlock" style="text-align: right;">
							<input type="submit" value="Log in" class="imLoginSubmit">
						</div>
					</form>
					<script type="text/javascript">x5engine.boot.push(function() { x5engine.imForm.initForm('#imLoginForm', false, { showAll: true, offlineMessage: 'When you test your WebSite you will not be asked for the Username and Password, that will only happen once you have uploaded your WebSite.' }); });</script>
				</div>
				<script>$(function () { $("#imUname").focus(); });</script>
				<div class="imClear"></div>
			</div>
			<div id="imFooter">
				
			</div>
		</div>
		<span class="imHidden"><a href="#imGoToCont" title="Read this page again">Back to content</a> | <a href="#imGoToMenu" title="Remain on this page">Back to main menu</a></span>
		
		<noscript class="imNoScript"><div class="alert alert-red">To use this website you must enable JavaScript.</div></noscript>
	</body>
</html>
