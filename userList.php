<?php

require 'dbAccess.php';

$sql = 'select id, user_id ,password, first_name, last_name, address, tel, gender, birthday, sys_date from tbl_users order by sys_date desc';
$stmt = $pdo->query($sql);//SQL ステートメントを実行し、結果セットを PDOStatement オブジェクトとして返す
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);//全ての結果行を含む配列を返す **fetch:特定の場所からデータなどを読み出す動作 **PDO::FETCH_ASSOC列名を記述し配列で取り出す設定をしている、fetch:取り出し、Assoc:Associationで、連想する
// 結果を出力
//var_dump($result);
http_response_code(200);//HTTPレスポンスコード(200正常終了)
header("Access-Control-Allow-Origin: *");//★★★重要
header('Content-Type: application/json; charset=UTF-8');
header("X-Content-Type-Options: nosniff");
#JSONデータの雛形（連想配列）　連想配列：配列のキー([0], [1], [2]...)に名前を付けた配列
$json = array(
  'status' => 'success',
  'resultData' => $result
);
echo json_encode($json, JSON_UNESCAPED_UNICODE);//エンコードして(値をJSON形式にして)送信 ＊＊JSON_UNESCAPED_UNICODE:マルチバイト Unicode 文字をそのままの形式で扱う
exit();

?>