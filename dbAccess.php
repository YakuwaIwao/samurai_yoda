<?php

try {
 
    // PHP Data Objects データベースに接続,PHP とデータベースサーバーの間の接続
    $pdo = new PDO( 
        'mysql:dbname=myapp;host=127.0.0.1;charset=utf8;port=3306;',
        'root',//user　　パスワード権限低ければ 'root' でOK???
        ''//password　　パスワード権限低ければ 'root' でOK
    );
    //echo "success connecting DB";
  
  } catch (PDOException $e) {
  
    /* エラー時は、とりあえず、エラーメッセージを表示 */
    header('Content-Type: text/plain; charset=UTF-8', true, 500);//UTF-8の文字コードで書かれたテキスト文書を送信???する時のヘッダー
    exit($e->getMessage());
  }

?>