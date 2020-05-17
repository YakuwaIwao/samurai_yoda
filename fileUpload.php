<?php
$filename = "/var/www/html/save/" . $_FILES['upfile']['name'];
 
if (is_uploaded_file($filename)) {
	echo $filename . "をアップロードしました。";

} else {
    echo "ファイルが選択されていません。";
} 
?>