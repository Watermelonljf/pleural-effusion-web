var $={
    ajax:function(config){
        config.data.token="";
        $.ajax({
            url:config.url,
            type:config.type,
            data:config.data,
            success:config.success
        })
    }
}