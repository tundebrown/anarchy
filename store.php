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

$email = mysqli_real_escape_string($conn, $_POST['email']);
$twitter = mysqli_real_escape_string($conn, $_POST['twitter']);
$discord = mysqli_real_escape_string($conn, $_POST['discord']);
$wallet = mysqli_real_escape_string($conn, $_POST['wallet']);


if (mysqli_query($conn, "INSERT INTO user(email, twitter, discord, wallet) VALUES('" . $email . "', '" . $twitter . "', '" . $discord . "', '" . $wallet . "')")) {
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
<h1>Thanks for your submission. Our team will reach out to you shortly with instructions on free-mint.</h1>
";
   //Add recipient
   $mail2->addAddress($email);
   //Finally send email
   if ($mail2->send()) {
      echo "Email Sent..!";
   } else {
      echo "Message could not be sent. Mailer Error: ";
   }
   //Closing smtp connection
   $mail2->smtpClose();




   //Create instance of PHPMailer
   $mail = new PHPMailer();
   //Set mailer to use smtp
   $mail->isSMTP();
   //Define smtp host
   $mail->Host = "smtp.gmail.com";
   //Enable smtp authentication
   $mail->SMTPAuth = true;
   //Set smtp encryption type (ssl/tls)
   $mail->SMTPSecure = "tls";
   //Port to connect smtp
   $mail->Port = "587";
   //Set gmail username
   $mail->Username = "community@anarchy.game";
   //Set gmail password
   $mail->Password = "oinrchzdnlobpras";
   //Email subject
   $mail->Subject = "Anarchy Community";
   //Set sender email
   $mail->setFrom('community@anarchy.game', 'Anarchy Community');
   //Enable HTML
   $mail->isHTML(true);
   //Attachment
   // $mail->addAttachment('img/attachment.png');
   //Email body
   $mail->Body = "
   <h3>NEW USER REGISTRATION</h3>
   </br>
   <ul>
   <li>Email: " . $email . "</li>
   <li>Twitter: " . $twitter . "</li>
   <li>Discord: " . $discord . "</li>
   <li>Wallet: " . $wallet . "</li>
   </ul>
   ";
   //Add recipient
   $mail->addAddress('manish@adcrack.com');
   $mail->addCC('community@anarchy.game');
   //Finally send email
   if ($mail->send()) {
      echo "Email Sent..!";
   } else {
      echo "Message could not be sent. Mailer Error: ";
   }
   //Closing smtp connection
   $mail->smtpClose();
}
mysqli_close($conn);
