<?php

require 'dbAccess.php';

// DBからデータを取得
$sql = 'SELECT user_id, password, first_name, last_name, address, tel, gender, birthday, sys_date FROM tbl_users ORDER BY sys_date DESC';

//sql取得してデータ取得
$stmt = $pdo->query($sql);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

//csv作ってる部分
//ファイルオブジェクト
//ファイルをオープン
//'php://output' あるところに自動的に一時的にファイルを作る（ダウンロードはファイルの作成場所は気にしない）　w：書き込み
$fp = fopen('php://output', 'w');
$columns = array();

//1レコード単位の繰り返し処理（行）
foreach ($result as $fields) {
    //データベースのカラム名の書き込み、1回しか呼ばれない→$columns = array();空で定義、2回名からは空じゃないから入らない
    if (empty($columns)) {
        //$fieldsに返ってきた値（$stmt->fetchAll(PDO::FETCH_ASSOC);）のカラム名のキー（user_id , passなど）の部分だけ取得
        $columns = array_keys($fields);
        //自動的日カンマ区切りの1行を作ってくれる
        fputcsv($fp, $columns);
    }

    $contents = array();
    //カラム数分だけ繰り返し（列）
    foreach($columns as $column) {
        //issedデータが入ってるか確認、入っていたらfields[$column]、入ってなかったら$fields[$column] : ""
        //キーを渡して値だけをを取得
        $contents[] = isset($fields[$column]) ? $fields[$column] : "";
    }
    //1行書き込み
    fputcsv($fp, $contents);
}
//ファイルクローズ　メモリがどんどん使われてサーバーが落ちる可能性あるので必ずクローズ
fclose($fp);

// 出力情報の設定　クライアントにcsv送る
//octet-stream 実行ファイル　
//header("Content-Type: application/octet-stream"); インストーラーダウンロードして実行させるとき　
header("Content-Type: application/csv");
//userList.csv ダウンロードした時のファイル名
header("Content-Disposition: attachment; filename=userList.csv");
//Content-Transfer-Encoding 日本語を変換させる　変換させない時はbinary（基本これ）
header("Content-Transfer-Encoding: binary");


