<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (!isset($_POST['name'], $_POST['email'], $_POST['subject'], $_POST['message'])) {
        echo "error: Missing fields";
        exit;
    }

    $name = htmlspecialchars($_POST['name']);  
    $mail = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
        echo "error: Invalid email format";
        exit;
    }

    $to = "Mahmud.isaacs03@gmail.com";
    $headers = "From: $name <$mail>\r\nReply-To: $mail\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo "success";
    } else {
        echo "error: Email failed to send";
    }
} else {
    echo "error: Invalid request method";
}
?>