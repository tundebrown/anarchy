<?php
//Include required PHPMailer files
require 'includes/PHPMailer.php';
require 'includes/SMTP.php';
require 'includes/Exception.php';
//Define name spaces
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once "db.php";

$cname = mysqli_real_escape_string($conn, $_POST['cname']);
$cemail = mysqli_real_escape_string($conn, $_POST['cemail']);
$mobile_code = mysqli_real_escape_string($conn, $_POST['mobile_code']);
$cskill = mysqli_real_escape_string($conn, $_POST['cskill']);
$cexp = mysqli_real_escape_string($conn, $_POST['cexp']);

$cfile = '';
if ($_FILES['file']['name'] != '') {
   $test = explode('.', $_FILES['file']['name']);
   $extension = end($test);
   $randName = rand(10000, 99999999) . '.' . $extension;

   $cfile = 'uploads/' . $randName;
   move_uploaded_file($_FILES['file']['tmp_name'], $cfile);
}



if (mysqli_query($conn, "INSERT INTO talent_network (cname, cemail, mobile_code, cskill, cexp, cfile) VALUES('" . $cname . "', '" . $cemail . "', '" . $mobile_code . "', '" . $cskill . "', '" . $cexp . "', '" . $cfile . "')")) {
   echo '1';

   $mail2 = new PHPMailer();
   //Set mailer to use smtp
   $mail2->isSMTP();
   //Define smtp host
   $mail2->Host = "smtp.gmail.com";
   //Enable smtp authentication
   $mail2->SMTPAuth = true;
   //Set smtp encryption type (ssl/tls)
   $mail2->SMTPSecure = "tls";
   //Port to connect smtp
   $mail2->Port = "587";
   //Set gmail username
   $mail2->Username = "community@anarchy.game";
   //Set gmail password
   $mail2->Password = "oinrchzdnlobpras";
   //Email subject
   $mail2->Subject = "Anarchy Community";
   //Set sender email
   $mail2->setFrom('community@anarchy.game', 'Anarchy Community');
   //Enable HTML
   $mail2->isHTML(true);
   //Attachment
   // $mail->addAttachment('img/attachment.png');
   //Email body
   $mail2->Body = "
   <h3>NEW FEED BACK MESSAGE FROM ANARCHY</h3>
   </br>
   <ul>
   <li>Email: " . $cemail . "</li>
   <li>Name: " . $cname . "</li>
   <li>Mobile: " . $mobile_code . "</li>
   <li>Message: " . $cskill . "</li>
   </ul>
   ";
   //Add recipient
   $mail2->addAddress('manish@adcrack.com');
   $mail2->addCC('community@anarchy.game');
   //Finally send email
   if ($mail2->send()) {
      echo "Email Sent..!";
   } else {
      echo "Message could not be sent. Mailer Error: ";
   }
   //Closing smtp connection
   $mail2->smtpClose();
}
mysqli_close($conn);
