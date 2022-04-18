$(function () {

    var form = layui.form

    // 设置验证函数
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    })

    // 给表单绑定submit事件，发送ajax请求
    $('.layui-form').on('submit', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            // 快速获取表单内容
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msh('更新密码失败！')
                }
                layui.layer.msg('更新密码成功！')
                //重置表单(通过jQuery方式拿到表单元素的jQuery对象，然后通过[0]的方式将一个jQuery对象转换成一个DOM对象，在调用form表单的reset方法重置表单)
                $('.layui-form')[0].reset()
            }
        })
    })

})