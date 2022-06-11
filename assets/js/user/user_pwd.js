$(function () {
  //导入 form 模块
  const form = layui.form;
  //利用 form.verify()  来定义规则
  form.verify({
    //长度必须是6到12位
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
    samePwd: (val) => {
      //不能与旧密码一致
      if (val === $('[name=oldPwd]').val()) return '新旧密码不能相同！';
    },
    rePwd: (val) => {
      //两次密码是否相同
      if (val !== $('[name=newPwd]').val()) return '两次密码不一致！';
    },
  });

  //更新密码
  $('.layui-form').submit(function(e){
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: "/my/updatepwd",
        data:$(this).serialize(),
        success: (res)=>{
            if(res.status!==0) return layer.msg(res.message)
            layer.msg(res.message)
            //强制清空token
            localStorage.removeItem('token')
            //跳转登陆界面
            window.parent.location.href='/login.html'

        }
    })
  })

});
