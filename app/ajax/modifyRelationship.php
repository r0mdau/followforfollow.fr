<?php

require_once(__DIR__.'/instagram.php');

$instagram = new Instagram(array(
    'apiKey'      => '419658066049438eb0bbd3cd7d726b9a',
    'apiSecret'   => '512935a8f350480f84416a185a2b40f6',
    'apiCallback' => 'http://followforfollow.dev/token.html'
));

$token = $_POST['token'];

$instagram->setAccessToken($token);

$result = $instagram->modifyRelationship($_POST['action'], (int)$_POST['id']);
echo json_encode(array(
    'code' => $result->meta->code,
    'action' => $_POST['action']
));