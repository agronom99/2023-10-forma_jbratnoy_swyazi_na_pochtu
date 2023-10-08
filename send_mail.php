<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require "PHPMailer/src/PHPMailer.php";
    require "PHPMailer/src/Exception.php";

    $mail = new PHPMailer(true);
    $mail->CharSet = "UTF-8";

    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $message = $_POST["message"];

    $body = $name.''.$email.''.$phone.''.$message.''.;
    $theme = "[Заявка з форми]";

    $mail->addAddress("agronom9913@gmail.com");

    $mail->Subject = $Theme;
    $mail->Body = $body;

    $mail->send();

