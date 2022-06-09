$(function () {
  $('#link_reg').click(function () {
    $('.login-box').hide();
    $('.reg-box').show();
  });
  $('#link_login').click(function () {
    $('.reg-box').hide();
    $('.login-box').show();
  });

  // 从 LayUI 中获取 form 对象
  const form = layui.form;

  // 通过 form.verify() 方法自定义校验规则
  form.verify({
    // 自定义一个叫 pwd 的校验规则
    password: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (val) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败,则return一个提示消息即可
      const pwd = $('.reg-box [name=password]').val();
      if (pwd !== val) return '两次密码不一致';
    },
  });

  //基本路径
  //因为使用了baseAPI.js文件，省略了基本路径
  //   const baseUrl = 'http://www.liulongbin.top:3007';
  var layer = layui.layer;
  //监听注册页面 发送注册请求
  $('#form_reg').submit((e) => {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/api/reguser',
      data: {
        username: $('.reg-box [name=username]').val(),
        password: $('.reg-box [name=password]').val(),
      },
      success: (res) => {
        //   console.log(res);
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        //模拟点击事件 跳转
        $('#link_login').click();
      },
    });
  });

  //监听登陆页面 发送登陆请求
  $('#form_login').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        //token存在本地
        localStorage.setItem('token', res.token);
        //跳转首页
        location.href = 'index.html';
      },
    });
  });
});
