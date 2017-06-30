<?php
    $img = $_POST['base64'];
    $img = str_replace('data:image/png;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
    file_put_contents('sample.jpg', $data);
?>