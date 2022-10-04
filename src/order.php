<?php
if (isset($_POST['phone'])) {
    $phone = $_POST['phone'];
}

$message;

if ($phone) {
    $message .= "Телефон: $phone";
}

$to = "e5ash.bro@gmail.com, hfasy@yandex.ru";

$headers = "Content-type: text/plain; charset = UTF-8";
$subject = "Заявка с сайта КурсМастер";
$send = mail($to, $subject, $message, $headers);

if ($send) {
    echo 1;
}
