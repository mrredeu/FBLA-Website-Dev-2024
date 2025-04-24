<?php
$firstName = $_POST['firstName'];
$preferredName = $_POST['preferredName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$coverletter = $_POST['coverletter'];
$educationLevel = $_POST['educationLevel'];
$fieldOfStudy = $_POST['fieldOfStudy'];
$employmentType = $_POST['employmentType'];
$salaryExpectations = $_POST['salaryExpectations'];
$relocateTravel = $_POST['relocateTravel'];
$startWorking = $_POST['startWorking'];
$legalRightWork = $_POST['legalRightWork'];
$ageCertificate = $_POST['ageCertificate'];
$felonyConviction = $_POST['felonyConviction'];
$softwareExperience = $_POST['softwareExperience'];
$certificatesAwards = $_POST['certificatesAwards'];
$workSamples = $_POST['workSamples'];

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
$mail->Username = //Your Email
$mail->Password = //Your App Password
$mail->SMTPDebug = 0;

$mail->setFrom(//Your Email, 'NexaPulse Career');
$mail->addAddress(//Your Email, 'NexaPulse HR');

$mail->Subject = "Application Form: " . $firstName . " " . $lastName;

// Construct email body
$mailBody = "First Name: $firstName\n";
if (!empty($preferredName)) $mailBody .= "Preferred Name: $preferredName\n";
$mailBody .= "Last Name: $lastName\n";
$mailBody .= "Email: $email\n";
$mailBody .= "Phone: $phone\n";
if (!empty($coverletter)) $mailBody .= "Cover Letter: $coverletter\n";
$mailBody .= "Education Level: $educationLevel\n";
$mailBody .= "Field of Study: $fieldOfStudy\n";
$mailBody .= "Employment Type: $employmentType\n";
$mailBody .= "Salary Expectations: $salaryExpectations\n";
$mailBody .= "Willing to Relocate/Travel: $relocateTravel\n";
$mailBody .= "Start Working: $startWorking\n";
$mailBody .= "If hired, would you be able to present proof of your legal right to work in the U.S. or evidence of your U.S. citizenship?: $legalRightWork\n";
$mailBody .= "Are you below the age of 18, and do you have an age employment certificate?: $ageCertificate\n";
$mailBody .= "Have you pleaded no contest to or been convicted of a felony within the last five years?: $felonyConviction\n";
if (!empty($softwareExperience)) $mailBody .= "Software Experience: $softwareExperience\n";
if (!empty($certificatesAwards)) $mailBody .= "Certificates and Awards: $certificatesAwards\n";
if (!empty($workSamples)) $mailBody .= "Work Samples: $workSamples\n";

for ($i = 0; $i < 5; $i++) {
    if (isset($_POST["question$i"])) {
        $questionLabel = $_POST["questionLabel$i"];
        $answer = $_POST["question$i"];
        $mailBody .= "$questionLabel: $answer\n";
    }
}

$mail->addAttachment($_FILES['resumeFile']['tmp_name'], $_FILES['resumeFile']['name']);

$mail->Body = $mailBody;

if (!$mail->send()) {
    // Redirect back to the application form if the email was not sent
    header('Location: apply.html?error=email');
} else {
    // Redirect to a thank you page if the email was sent
    header('Location: thankyou.html');
}
?>
