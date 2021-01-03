// ************************************切换
//去注册，绑定一个点击事件
$("#goto-register").on("click", function () {
    $("#login").hide();
    $("#register").show();
});
//去登录
$("#goto-login").on("click", function () {
    $("#login").show();
    $("#register").hide();
});

// ** ** ** ** ** ** ** ** ** ** ** ** * 注册
var form = layui.form;
form.verify({
    changdu: [/^\S{6,12}$/, "输入的密码不符合要求"],
    same: function (val) {
        if ($("#password").val() != val) {
            return "两次输入的密码不一致"
        }
    }
});
// $("register form").on("submit", function (e) {
//     //1.阻止默认行为
//     e.preventDefault();
//     //2.收集数据
//     var params = $(this).serialize();
//     //3.提交数据，去接口文档看
//     $.ajax({
//         url: "http://ajax.frontend.itheima.net/api/reguser",
//         type: "post",
//         data: params,
//         success: function (res) {
//             //不管是否成功，都弹窗提醒
//             layer.msg(res.message);
//             //做判断，如果注册成功，显示登录盒子，注册不成功则清空用户名栏
//             if (res.status == 0) {
//                 $("#login").show();
//                 $("#register").hide();
//             } else {
//                 $("#username").val("");
//             }
//         }
//     })
// })
// -------------------------------------------注册
$("#register form").on("submit", function (e) {
    // 1.阻止默认
    e.preventDefault();

    // 2.收集数据
    var params = $(this).serialize();

    // 3.提交数据：去哪看？接口文档！
    $.ajax({
        url: "http://ajax.frontend.itheima.net/api/reguser",
        type: "post",
        data: params,
        success: function (res) {
            // 不管成功失败，都进行弹窗！
            layer.msg(res.message);

            // 业务：提醒注册成功；把登录盒子显示、注册盒子隐藏！
            if (res.status == 0) {

                $("#login").show();
                $("#register").hide();
            }
            // 不成功的时候
            else {
                // 用户名id
                $("#username").val("");
            }

        }
    })
});
//**********************登录
$("#login form").on("submit", function (e) {
    // 1.阻止默认
    e.preventDefault();

    // 2.收集数据
    var params = $(this).serialize();

    // 3.提交数据：去哪看？接口文档！
    $.ajax({
        url: "http://ajax.frontend.itheima.net/api/login",
        type: "post",
        data: params,
        success: function (res) {
            // 不管成功失败，都进行弹窗！
            layer.msg(res.message);

            // 业务：提醒注册成功；把登录盒子显示、注册盒子隐藏！
            if (res.status == 0) {

                location.href = "../index.html";
                localStorage.setItem("token", res.token);
            }
            // 不成功的时候
            else {
                // 用户名id
                $("#username").val("");
            }

        }
    })
});