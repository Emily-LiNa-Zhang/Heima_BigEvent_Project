// jQuery入口函数
$(function () {

    var layer = layui.layer
    var form = layui.form

    // 调用函数
    initArtCateList()

    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res)
                var htmlStr = template('tpl-table', res)  //调用template函数，提供一个模板的id，渲染的数据对象
                $('tbody').html(htmlStr)   //将字符串交给tbody进行渲染即可
            }
        })
    }


    // 为添加类别按钮绑定点击事件
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        // 在开启弹出层时，拿到索引
        indexAdd = layer.open({
            type: 1,  //页面层
            area: ['500px', '250px'],
            title: '添加文章分类'
            , content: $('#dialog-add').html()
            // 拿到html结构，赋值到content里面
        })
    })


    // 因为form-add是动态创建在html中的，所以只能通过代理的形式，为form-add表单绑定submit事件，
    // 将事件绑定到body上面，代理到id为form-add上面
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        // console.log('ok')
        // 发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            // 快速获取表单里面的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArtCateList()
                layer.msg('新增分类成功！')
                // 根据索引关闭对应的弹出层
                layer.close(indexAdd)
            }
        })
    })


    // 通过代理的形式，为btn-edit编辑按钮绑定点击事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        console.log('ok')
        // 弹出一个修改文章分类信息的层
        // 在开启弹出层时，拿到索引
        indexEdit = layer.open({
            type: 1,  //页面层
            area: ['500px', '250px'],
            title: '修改文章分类'
            , content: $('#dialog-edit').html()
            // 拿到html结构，赋值到content里面
        })

        // 通过attr的方法拿到data-id的值
        var id = $(this).attr('data-id')
        console.log(id)
        // 发起请求根据id获取对应的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                console.log(res)
                // form.val方法给form表单填充数据
                form.val('form-edit', res.data)
            }
        })
    })


    // 通过代理的形式，为修改的分类的表单绑定submit事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })


    // 通过代理的形式，为删除按钮绑定删除事件
    $('tbody').on('click', '.btn-delete', function () {
        console.log('ok')
        // 拿到id的值
        var id = $(this).attr('data-id')
        console.log(id)
        // 提示用户是否要删除
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                suceess: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })
        })
    })

})