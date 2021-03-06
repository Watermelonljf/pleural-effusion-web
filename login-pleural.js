/**
 * Created by ljianf on 2018/3/29.
 */
var $;
layui.config({
    base: './lib/layui/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'user'], function () {
    $ = layui.$
        , setter = layui.setter
        , admin = layui.admin
        , form = layui.form
        , router = layui.router()
        , search = router.search;

    form.render();
    login.getcaptcha();

    //提交
    form.on('submit(LAY-user-login-submit)', function (obj) {

        $.ajax({
            url: 'http://localhost:9094/user-platform/user/login', //实际使用请改成服务端真实接口
            data: {username:obj.field.username,password:obj.field.password,vercode:obj.field.vercode,imgToken:sessionStorage.getItem("ctoken")},
            type: 'post',
            dataType:'json',
            success: function (res) {
                if(res.type=="SUCCESS"){
                    //请求成功后，写入 access_token
                    sessionStorage.setItem("access_token",res.data.token);
                    sessionStorage.setItem("access_username",res.data.username);
                    sessionStorage.setItem("access_userId",res.data.userId);
                    //登入成功的提示与跳转
                    layer.msg('登入成功', {
                        offset: '15px'
                        , icon: 1
                        , time: 1000
                    }, function () {
                        location.href = './index.html'; //后台主页
                    });
                }else{
                    layer.msg(res.message,{
                        offset: '15px'
                        , icon: 2
                        , time: 1000
                    },function(){

                    });
                }

            }

        })
    });


    //实际使用时记得删除该代码
    /* layer.msg('为了方便演示，用户名密码可随意输入', {
     offset: '15px'
     ,icon: 1
     });*/

});

login = {
    getcaptcha: function () {
        $.ajax({
            type: "POST",
            url: "http://localhost:9094/user-platform/captcha/get",
            dataType: "json",
            success: function (result) {
                sessionStorage.setItem("ctoken", result.imgToken);
                $("#code-img").attr('src', 'data:image/png;base64,' + result.img);
            }
        });
    }
}