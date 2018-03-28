
layui.use(['jquery','laytpl'], function (){
    var $ = layui.$;
    $.ajax({
        url:'http://127.0.0.1:9094/user-platform/resource/user/menu',
        type:'get',
        dataType:'json',
        data:{userId:10},
        success:function(result){
            if(result.type=='SUCCESS'){
                var html=template('menu-list',result.data);
                 $("#nav").html(html);
            }
            console.log(result);
        }
    })
})