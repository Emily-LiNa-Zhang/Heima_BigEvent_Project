// jquery入口函数
$(function () {
    //调用getUserInfo函数，获取用户的基本信息
    getUserInfo()

    var layer = layui.layer

    // 点击按钮实现推出的功能(调用layui的询问框功能)
    $('#btnLogout').on('click', function () {
        console.log('ok')
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            console.log('ok')
            // 1.清空本地存储中的token
            localStorage.removeItem('token')
            // 2.重新跳转到登录页面
            location.href = '/前后端交互/大事件项目课程资料/self/login.html'
            // 关闭confirm询问框
            layer.close(index);
        });
    })
})

//获取用户的基本信息
function getUserInfo() {
    // 发送请求
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // (为什么要写请求头?)以 /my 开头的请求路径，需要在请求头中携带 Authorization 身份认证字段，才能正常访问成功
        //headers就是请求头配置对象(将请求头写到baseAPI.js中，这样就不用每一次发送请求时就写一次headers)
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res)
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 获取用户信息成功后,调用renderAvatar函数，渲染用户的头像
            renderAvatar(res.data)
        },

        // 限制用户的访问权限
        // 发现一个问题:回到登录注册页面后在地址栏输入index.html还是能够回到后台首页,所以需要再一次强制轨道登录注册页面(没有登录,获取用户信息失败,接下来执行complete函数)
        // 不论成功还是失败,最终都会调用complete回调函数
        // complete: function (res) {
        //     console.log('执行了complete回调')
        //     console.log(res)
        //     // 在complete回调函数中,可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         console.log('失败')
        //         // 1.强制清空token
        //         localStorage.removeItem('token')
        //         // 2.强制跳转到登录页面
        //         location.href = '/前后端交互/大事件项目课程资料/self/login.html'
        //     }
        // }
    })
}

//渲染用户的头像
function renderAvatar(user) {
    // console.log(user)
    // 1、获取用户的名称(有昵称以昵称为准,没有的话就以用户名为准)
    var name = user.nickname || user.username
    // 2、设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3.按需渲染用户头像
    if (user.user_pic !== null) {
        //如果图片图像不为空，渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()   //将图片头像显示出来
        $('.text-avatar').hide()  //将文字头像隐藏
    } else {
        //否则，渲染文字头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}
