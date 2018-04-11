var $;
var element;
layui.use(['jquery','element'], function (){
     $= layui.$;
     element = layui.element;
    Tool.send({
        url:'http://127.0.0.1:9094/user-platform/resource/user/menu',
        type:'get',
        dataType:'json',
        data:{},
        async:false,
        success:function(result){
            if(result.type=='SUCCESS'){
                var html=template('menu-list',result);
                $("#nav").html(html);
            }
        }
    })
})
layui.config({
    base: './static/js/',
    version:'1022145'
}).use('admin');
var Index={
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
    },

    openTrainWacht:function(){
        for(var i = 0; i < $('.weIframe').length; i++) {
            if($('.weIframe').eq(i).attr('tab-id') == 9) {
                element.tabChange('wenav_tab', 9);
                event.stopPropagation();
                return;
            }
        };
        element.tabAdd('wenav_tab', {
            title: '训练监控',
            content: '<iframe tab-id="9" frameborder="0" src="./pages/model/train-result.html" scrolling="yes" class="weIframe"></iframe>',
            id: 8
        });
        element.tabChange('wenav_tab', 9);
    }
}