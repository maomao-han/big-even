//如果有人修改地址栏过来的，那么要看是否有token
if (localStorage.getItem("token") == null) {
    location.href = "../login.html";
}



// ***********************获取用户信息
//查接口文档
$.ajax({
    url: 'http://ajax.frontend.itheima.net/my/userinfo',
    headers: {
        Authorization: localStorage.getItem("token")
    },
    success: function (res) {
        //如果有昵称及显示昵称，没昵称及显示用户名
        var name = res.data.nickname || res.data.username;
        $(".username").html(name);
        //有头像就显示图像，没有就显示名字第一个字符，大写显示
        if (res.data.user_pic) {
            $(".layui-nav-img").show().attr("src", res.data.user_pic);
            $(".avatar").hide();
        } else {
            var first = name.substr(0, 1);
            first = first.toUpperCase();
            $(".layui-nav-img").hide();
            $(".avatar").show().html(first).css("display", "inline-block");
        }
    },
    complete: function (xhr) {
        // xhr.responseJSON  就是返回的数据

        if (xhr.responseJSON && xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {

            // 删除 过期 token
            localStorage.removeItem('token');
            // 跳转到登录页面
            location.href = '/login.html';
        }
    },

});

// ***************************退出
var layer = layui.layer;
$("#logout").on("click", function () {
    // confirm有两个参数，第一个是询问的话，第二个是点击确认的时候要执行的函数
    layer.confirm("确定要退出吗", function (index) {
        //index数值用于关闭当前弹窗
        //退出要清除本地的token
        localStorage.removeItem("token");
        location.href = "../login.html";
        layer.close(index);
    })
})