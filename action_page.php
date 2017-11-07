User-Agent: benjamin-john
<?PHP
$email = $_POST["emailaddress"];
$fname = $_POST["fname"];
$lname = $_POST["lname"];
$message = $_POST["message"];
$to = "benjamin-john@bethel.edu";
$subject = "Contact Form Submission";
$headers = "From: $email\n";
$message = "A visitor to your site has submitted the contact form:\n
Email Address: $email\n
Name: $fname $lname\n
Message: $message";
mail($to,$subject,$message,$headers);
?>
