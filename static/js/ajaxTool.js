var $;
layui.use(['jquery'], function (){
    $ = layui.$;
})

Tool= {
    send:function (config) {
        config.data.token=sessionStorage.getItem("access_token");
        config.data.userId=sessionStorage.getItem("access_userId");
        $.ajax({
            url:config.url,
            data:config.data,
            type:config.type!=""?config.type:"post",
            success:config.success
        })
    }
}