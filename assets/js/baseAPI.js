// 注意：每次调用$.get()或$.post()或$.ajax()的时候，会先调用ajaxPrefilter这个函数，在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的Ajax请求前，统一进行请求的根路径拼接
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url)

    //统一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 在全局统一挂载complete回调函数(限制用户的访问权限,必须先登录才能进入后台首页)
    options.complete = function (res) {
        //     console.log('执行了complete回调')
        //     console.log(res)
        // 在complete回调函数中,可以使用res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            console.log('失败')
            // 1.强制清空token
            localStorage.removeItem('token')
            // 2.强制跳转到登录页面
            location.href = '/前后端交互/大事件项目课程资料/self/login.html'
        }
    }

})