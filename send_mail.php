<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require "PHPMailer/src/Exception.php";
    require "PHPMailer/src/PHPMailer.php";

    $mail = new PHPMailer(true); /* Создаем объект MAIL */
    $mail->CharSet = "UTF-8"; /* Задаем кодировку UTF-8 */
//  $mail->IsHTML(true); /* Разрешаем работу с HTML */

    $name = $_POST["name"]; /* Принимаем имя пользователя с формы .. */
    $email = $_POST["email"]; /* Почту */
    $phone = $_POST["phone"]; /* Телефон */
    $message = $_POST["message"]; /* Сообщение с формы */

    $body = $name.''.$email.''.$phone.''.$message.''.;
    $theme = "[Заявка з форми]";

    $mail->addAddress("agronom9913@gmail.com");

    $mail->Subject = $theme;
    $mail->Body = $body;

    /* Проверяем отправлено ли сообщение */
if (!$mail->send()) {
    $message = "Ошибка отправки";
  } else {
    $message = "Данные отправлены!";
  }
  
  /* Возвращаем ответ */	
  $response = ["message" => $message];
  
  /* Ответ в формате JSON */
  header('Content-type: application/json');
  echo json_encode($response);

  
?>