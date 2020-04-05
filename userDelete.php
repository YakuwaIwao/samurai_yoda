<?php

// 先ほど作成したPDOインスタンス作成をそのまま使用します
require 'dbAccess.php';

$json_string = file_get_contents('php://input');
$contents = json_decode($json_string);

// SQL文を準備します。「:id」「:name」がプレースホルダーです。
$sql = 'delete from tbl_users where';
$sql .= ' user_id in("'.implode('","', $contents->userIds).'")';
// $sql = 'DELETE FROM tbl_users WHERE user_id IN(:user_id)';

$prepare = $pdo->prepare($sql);
// $prepare->bindValue(':user', $contents->user_id, PDO::PARAM_STR);
//$prepare->bindValue(':user', $contents->user_id, PDO::PARAM_STR);
$prepare->execute();

http_response_code(200);    //HTTPレスポンスコード(200正常終了)
header('Content-Type: application/json; charset=UTF-8');
header("X-Content-Type-Options: nosniff");
#JSONデータの雛形（連想配列）
$json = array(
  'status' => 'success',
  'resultData' => array()
);

echo json_encode($json, JSON_UNESCAPED_UNICODE);    //エンコードして送信

exit();

?>

