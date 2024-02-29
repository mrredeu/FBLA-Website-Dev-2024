<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = $_POST['firstName'];
    $preferredName = $_POST['preferredName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $coverletter = $_POST['coverletter'];
    $jobType = $_POST['jobType'];

    // Process job-specific questions
    $jobQuestionsAnswers = [];
    foreach ($_POST as $key => $value) {
        if (strpos($key, 'question_') === 0) { // Assuming your questions have names like 'question_1', 'question_2', etc.
            $jobQuestionsAnswers[] = $value;
        }
    }

    // Process file upload
    $resumeFilePath = "";
    if (isset($_FILES['resumeFile']) && $_FILES['resumeFile']['error'] == 0) {
        $resumeFilePath = 'uploads/' . basename($_FILES['resumeFile']['name']); // Ensure you have an 'uploads' directory with write permissions
        move_uploaded_file($_FILES['resumeFile']['tmp_name'], $resumeFilePath);
    }

    // Email content
    $emailContent = "First Name: $firstName\n";
    $emailContent .= "Preferred Name: $preferredName\n";
    $emailContent .= "Last Name: $lastName\n";
    $emailContent .= "Email: $email\n";
    $emailContent .= "Phone: $phone\n";
    $emailContent .= "Cover Letter: $coverletter\n";
    $emailContent .= "Job Type: $jobType\n";
    $emailContent .= "Job Questions and Answers:\n";
    foreach ($jobQuestionsAnswers as $answer) {
        $emailContent .= "- $answer\n";
    }

    // Send email
    $to = 'pasha.naruta@gmail.com';
    $subject = 'New Job Application Submission';
    $headers = "From:"  . 'pashatestermails@gmail.com';

    if (mail($to, $subject, $emailContent, $headers)) {
        echo "sent the application.";
        //header('Location: thank_you.html');
        exit;
    } else {
        echo "Failed to send the application.";
    }
}
?>