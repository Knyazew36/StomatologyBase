

<?php
// Получаем данные из тела HTTP-запроса
$postData = file_get_contents("php://input");
$data = json_decode($postData, true);

// Если данные не пустые, обрабатываем их
if (!empty($data)) {
    $name = $data['name'];
    $phone = $data['phone'];
    $city = $data['city'];


// Токен вашего бота
$token = '6957342998:AAHnnN_QoMcGtS8H1iwOafa0c6c40kefltA';
// ID чата, куда отправлять сообщения
$chat_id = '-672673172';
// Адрес API Telegram для отправки сообщений
$api_url = "https://api.telegram.org/bot$token/sendMessage";


    $message = "<b>Заявка с сайта стоматологии</b>\n <b>Имя отправителя:</b> $name\n <b>Телефон:</b> $phone\n <b>Город:</b> $city";

    $response = file_get_contents($api_url . "?chat_id=$chat_id&parse_mode=html&text=" . urlencode($message));

    if ($response) {
        echo "Ваша заявка направлена, ожидайте звонка!";
    } else {
        echo "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.";
    }
} else {
    echo "Данные не были получены";
}
?>
