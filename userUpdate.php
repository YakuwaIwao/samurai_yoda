<?php

require 'dbAccess.php';

//json受け取る
$json_string = file_get_contents('php://input');//まず文字列で受け取る　ヘッダーのコンテンツの中身を全部読み込む　リクエストのbodyの中身
$contents = json_decode($json_string);//オブジェクト(json)に変換
$sql = 'UPDATE tbl_users SET password =:password, first_name=:first_name, last_name=:last_name, address=:address, tel=:tel, gender=:gender, birthday=:birthday, sys_date=now() WHERE user_id = :user_id' ;//sql文作る、:user,:password リクエストできた情報を動的にセット、この時点ではただの文字列
$prepare = $pdo->prepare($sql);//prepareのオブジェクトとして取得
$prepare->bindValue(':user_id', $contents->user_id, PDO::PARAM_STR);//キー（セットする場所）、バリュー（置換する値）、型(mysqlのカラム)
$prepare->bindValue(':password', $contents->password, PDO::PARAM_STR);
$prepare->bindValue(':first_name', $contents->first_name, PDO::PARAM_STR);
$prepare->bindValue(':last_name', $contents->last_name, PDO::PARAM_STR);
$prepare->bindValue(':address', $contents->address, PDO::PARAM_STR);
$prepare->bindValue(':tel', $contents->tel, PDO::PARAM_STR);
$prepare->bindValue(':gender', $contents->gender, PDO::PARAM_STR);
$prepare->bindValue(':birthday', $contents->birthday, PDO::PARAM_STR);
//自動的に''で値を埋め込んでくれる
$prepare->execute();//実行

// $result = 0;

// $result = $prepare->fetch(PDO::FETCH_ASSOC);

// 結果を出力
//var_dump($result);
http_response_code(200);//HTTPレスポンスコード(200正常終了)
header('Content-Type: application/json; charset=UTF-8');
header("X-Content-Type-Options: nosniff");
#JSONデータの雛形（連想配列）　連想配列：配列のキー([0], [1], [2]...)に名前を付けた配列
$json = array(
  'status' => 'success',
  'resultData' => $prepare
);
echo json_encode($json, JSON_UNESCAPED_UNICODE);//エンコードして(値をJSON形式にして)送信 ＊＊JSON_UNESCAPED_UNICODE:マルチバイト Unicode 文字をそのままの形式で扱う
exit();

?>