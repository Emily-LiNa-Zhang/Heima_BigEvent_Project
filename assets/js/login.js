$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer



    //通过form.verify函数自定义校验规则
    form.verify({
        //自定义一个叫做pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的密码，还需要拿到密码框中的内容。如果失败则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }

        }
    })

    //监听注册表单的提交事件
    $('#form-reg').on('submit', function (e) {
        e.preventDefault()   //1、阻止默认提交行为
        //2、发起ajax的post请求（请求的url地址，请求的参数对象，指定的function回调）
        var data = { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=password]').val() }
        $.post('api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            //注册成功后，需要自动跳转到登陆界面
            //模拟人的点击行为
            $('#link_login').click()
        })
    })

    //监听登陆表单的提交事件
    $('#form-login').submit(function (e) {
        //阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: 'api/login',   //这里填写完整的url路径太长，可以在API.js文件中事先进行与根路径的拼接
            method: 'POST',
            //快速获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败！')
                }
                layer.msg('登陆成功！')
                // 将登陆成功得到的token字符串保存早localStorage中
                localStorage.setItem('token', res.token)
                // console.log(res.token)
                //跳转到后台主页
                location.href = '/前后端交互/大事件项目课程资料/self/index.html'
            }
        })
    })
})