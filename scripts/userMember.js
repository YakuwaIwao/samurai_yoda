let getUserStorage = function () {
  let userList = [];
  //通信するためのJSON
  $.ajax({
    url: 'userList.php', //基本的にhtmlファイルと同じ階層 ,相対パスにする、絶対パス(http~にしない)毎回
    type: 'get',
    dataType: 'json',
    async: false //同期処理にして★★★重要
    //javascriptは非同期処理(script言語はだいたいそう、バッチファイル、シェル)、サーバーからデータが帰ってくるまで待たずに次の処理へ
    //sessionstorageは同期処理、処理が同期か非同期かは意識。自分のPC以外とのやりとり⇨同期
  }).done(function (res) { //resの中にjsonが入ってる status=success⇨正常なデータ
    if (res.status == 'success') {
      userList = res.resultData;
      //console.log(res.resultData);
    }
  }).fail(function () {
    alert('ng');
  });

  //console.log('ssssssss');

  // let storageVal = sessionStorage.getItem('userList');
  // //セッションストレージにあるデータをuserListとして取得(オブジェクト)

  // let userList = [];
  // if (storageVal != null) {
  //   userList = JSON.parse(storageVal);
  //   //取得した値をパースしてuserListに格納
  // }

  return userList;
};

let refleshList = function (data) {

  $('#register').empty();

  $('#register').append(
    $('<ul />').addClass('nav')
    .append(
      $('<li />').text('選択')
    ).append(
      $('<li />').text('アカウントID')
    ).append(
      $('<li />').text('氏名')
    ).append(
      $('<li />').text('性別')
    ).append(
      $('<li />').text('更新日時')
    )
  );

  // ここに一覧を表示する処理を追加
  let userList = getUserStorage();

  if (data == null) {
    $.each(userList, function () {
      let user = this;

      //三項演算子
      let fullName =
        (user.first_name != null ? user.first_name : "未設定") +
        " " +
        (user.last_name != null ? user.last_name : "未設定");

      //  let tmpName = "";
      //  if(user.first_name != null) {
      //    tmpName = user.first_name;
      //  } else {
      //    tmpName = "";
      //  }

      if (user.gender == "m") {
        user.gender = "男";
      } else if (user.gender == "f") {
        user.gender = "女";
      } else {
        user.gender = "男";
      };

      // <input type="checkbox" >
      $('#register').append(
        $('<ul />').addClass('nav').append(
          $('<li />').append(
            $('<input />').attr('type', 'checkbox').val(user.user_id)
          )
        ).append(
          $('<li />').text(user.user_id)
        ).append(
          $('<li />').text(fullName)
        ).append(
          $('<li />').text(user.gender)
        ).append(
          $('<li />').text(user.sys_date)
        )
      );
    })
  } else {
    $.each(data, function () {
      let user = this;
      // <input type="checkbox" >
      $('#register').append(
        $('<ul />').addClass('nav').append(
          $('<li />').append(
            $('<input />').attr('type', 'checkbox').val(user.user_id)
          )
        ).append(
          $('<li />').text(user.user_id)
        ).append(
          $('<li />').text(user.first_name + " " + user.last_name)
        ).append(
          $('<li />').text(user.gender)
        ).append(
          $('<li />').text(user.sys_date)
        )
      );
    })
  }
};

let inputFunc = function (str) {
  $('.user-message label').text('');

  // 入力画面のOKボタン
  let user_id = $('#user_id').val();
  let password = $('#password').val();
  let first_name = $('#first_name').val();
  let last_name = $('#last_name').val();
  let address = $('#address').val();
  const tel = $('.tel_box').map(function () {
    return $(this).val();
  }).get().join('-');
  let gender = $('input[name="radio_gender"]:checked').val();
  let birth_year = $('#birth_year').val();
  let birth_month = $('#birth_month').val();
  let birth_day = $('#birth_day').val();
  let birthday = birth_year + "/" + birth_month + "/" + birth_day;

  let errorFlg = false;
  if (str.match(/^[0-9]*$/)) {
    errorFlg = false;
  } else {
    $('.user-message.user-tel label').text('半角数字で入力して下さい');
    errorFlg = true;
  }

  if (user_id == '') {
    $('.user-message.user-user_id label').text('未入力です');
    errorFlg = true;
  }
  if (password === '') {
    $('.user-message.user-password label').text('未入力です');
    errorFlg = true;
  }
  if (first_name === '') {
    $('.user-message.user-first_name label').text('未入力です');
    errorFlg = true;
  }
  if (last_name === '') {
    $('.user-message.user-last_name label').text('未入力です');
    errorFlg = true;
  }
  if (address === '') {
    $('.user-message.user-address label').text('未入力です');
    errorFlg = true;
  }
  if (tel === '') {
    $('.user-message.user-tel label').text('未入力です');
    errorFlg = true;
  }
  if (gender === '') {
    $('.user-message.user-gender label').text('未入力です');
    errorFlg = true;
  }
  if (birthday === '') {
    $('.user-message.user-birthday label').text('未入力です');
    errorFlg = true;
  }

  if (errorFlg == false) {
    $('label.user-user_id-confirm').text(user_id);
    $('label.user-password-confirm').text(password);
    $('label.user-first_name-confirm').text(first_name);
    $('label.user-last_name-confirm').text(last_name);
    $('label.user-address-confirm').text(address);
    $('label.user-tel-confirm').text(tel);
    $('label.user-gender-confirm').text(gender);
    $('label.user-birthday-confirm').text(birthday);

    $('#input').hide();
    $('#confirm').show();
    $('#finish').hide();

  }
};

let confirmFunc = function () {

  // 確認画面のOKボタン
  let user_id = $('#user_id').val();
  let password = $('#password').val();
  let first_name = $('#first_name').val();
  let last_name = $('#last_name').val();
  let address = $('#address').val();
  //let tel = $('.tel_box').val();
  const tel = $('.tel_box').map(function () {
    return $(this).val();
  }).get().join('-');
  let gender = $('input[name="radio_gender"]:checked').val();
  let birth_year = $('#birth_year').val();
  let birth_month = $('#birth_month').val();
  let birth_day = $('#birth_day').val();
  let birthday = birth_year + "/" + birth_month + "/" + birth_day;

  //let userList = getUserStorage();

  if (gender == "男") {
    gender = "m";
  } else if (gender == "女") {
    gender = "f";
  } else {
    gender = "m";
  }

  //jsonデータ  新規に追加したい
  let user = {
    'user_id': user_id,
    'password': password,
    'first_name': first_name,
    'last_name': last_name,
    'address': address,
    'tel': tel,
    'gender': gender,
    'birthday': birthday
  };
  //userList.push(user);
  //sessionStorage.setItem('userList', JSON.stringify(userList));
  // storageデータ(jsonデータ)を文字列に変換してuserListにセット

  let postData = JSON.stringify(user);

  // ajax送信
  $.ajax({
    url: 'userAdd.php',
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',
    data: postData,
    async: false //処理が帰ってきて失敗したらエラー画面出したい
  }).done(function (data) {
    if (data.status == 'success') {
      $('#input').hide();
      $('#confirm').hide();
      $('#finish').show();

    }
  }).fail(function () {
    alert('error');
  });
};

let fixConfirmFunc = function (fixIndex) {
  // 確認画面のOKボタン
  let user_id = $('#user_id').val();
  let password = $('#password').val(); //passwordのみ修正可
  let first_name = $('#first_name').val();
  let last_name = $('#last_name').val();
  let address = $('#address').val();
  const tel = $('.tel_box').map(function () {
    return $(this).val();
  }).get().join('-');
  let gender = $('input[name="radio_gender"]:checked').val();
  let birth_year = $('#birth_year').val();
  let birth_month = $('#birth_month').val();
  let birth_day = $('#birth_day').val();
  let birthday = birth_year + "/" + birth_month + "/" + birth_day;

  let user = {
    'user_id': user_id,
    'password': password,
    'first_name': first_name,
    'last_name': last_name,
    'address': address,
    'tel': tel,
    'gender': gender,
    'birthday': birthday,
  };

  //let userList = getUserStorage();
  let postData = JSON.stringify(user);
  //sessionStorage.setItem('userList', JSON.stringify(userList));
  //storageデータ(jsonデータ)を文字列に変換してuserListにセット

  $.ajax({
    url: 'userUpdate.php',
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',
    data: postData,
    async: false //処理が帰ってきて失敗したらエラー画面出したい
  }).done(function (data) {
    if (data.status == 'success') {
      $('#input').hide();
      $('#confirm').hide();
      $('#finish').show();
    }
  }).fail(function () {
    alert('error');
  });

};

let finishFunc = function () {
  // 完了画面のOKボタン
  // 一覧再表示
  refleshList();
};

let searchFunc = function () {
  const user_id = $("#keyword").val();
  let user = {
    'user_id': user_id
  };

  let postData = JSON.stringify(user);

  $.ajax({
    url: 'search_userList.php',
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',
    data: postData,
    async: false //処理が帰ってきて失敗したらエラー画面出したい
  }).done(function (data) {
    if (data.status == 'success') {
      refleshList(data.resultData);
    }
  });
};