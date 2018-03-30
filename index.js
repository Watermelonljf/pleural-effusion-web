var $;
layui.use(['jquery','laytpl'], function (){
     $= layui.$;
    Tool.send({
        url:'http://127.0.0.1:9094/user-platform/resource/user/menu',
        type:'get',
        dataType:'json',
        data:{},
        success:function(result){
            if(result.type=='SUCCESS'){
                var html=template('menu-list',result);
                 $("#nav").html(html);
            }
            console.log(result);
        }
    })
})

Index={
    logout:function(){
        Tool.send({
            url:'http://127.0.0.1:9094/user-platform/user/logout',
            type:'post',
            dataType:'json',
            data:{username:sessionStorage.getItem("access_username")},
            success:function(result){
                sessionStorage.clear();
                    layer.msg('登出成功', {
                        offset: '15px'
                        , icon: 1
                        , time: 1000
                    }, function () {
                        location.href = './login-pleural.html'; //后台主页
                    });
                console.log(result);
            }
        })
    }
}