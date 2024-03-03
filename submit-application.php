<?php
$firstName = $_POST['firstName'];
if (!empty($preferredName)) {$mailBody .= "Preferred Name: $preferredName\n";}
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$phone = $_POST['phone'];
if (!empty($coverletter)) {$mailBody .= "Cover Letter: $coverletter\n";}
$jobType = $_POST['jobType'];
$educationLevel = $_POST['educationLevel'];
$fieldOfStudy = $_POST['fieldOfStudy'];
$workAuthorization = $_POST['workAuthorization'];
if (!empty($certificatesAwards)) {$mailBody .= "Certificates and Awards: $certificatesAwards\n";}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

require "vendor/autoload.php";

$mail = new PHPMailer();
$mail->isSMTP();
$mail->SMTPDebug = SMTP::DEBUG_SERVER;
$mail->Host = "smtp.gmail.com";
$mail->Port = 465;
$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
$mail->SMTPAuth = true;
$mail->Username = "pashatestermails@gmail.com";
$mail->Password = "zyvnuncmydpegrhf";

$mail->setFrom('pashatestermails@gmail.com', 'NexaPulse Career');
$mail->addAddress('pashatestermails@gmail.com', 'NexaPulse HR');

$mail->Subject = "Application Form: " . $firstName . " " . $lastName;

// Construct email body
$mailBody = "First Name: $firstName\n";
$mailBody .= "Preferred Name: $preferredName\n";
$mailBody .= "Last Name: $lastName\n";
$mailBody .= "Email: $email\n";
$mailBody .= "Phone: $phone\n";
$mailBody .= "Cover Letter: $coverletter\n";
$mailBody .= "Job Type: $jobType\n";
$mailBody .= "Education Level: $educationLevel\n";
$mailBody .= "Field of Study: $fieldOfStudy\n";
$mailBody .= "Work Authorization: $workAuthorization\n";
$mailBody .= "Certificates and Awards: $certificatesAwards\n";

$mail->Body = $mailBody;

if (!$mail->send()) {
    // Redirect back to the application form if the email was not sent
    header('Location: apply.html?error=email');
} else {
    // Redirect to a thank you page if the email was sent
    header('Location: thankyou.html');
}
?>